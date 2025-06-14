import type { Cart, CartDraft, MyCartUpdate, MyCartUpdateAction, ProductProjection } from '@commercetools/platform-sdk';
import type { CartProduct, SessionUser } from '@/data/interfaces';
import { type ProductInteface } from '@/data/interfaces';
import { getLoggedInUserFromSessionStorage } from '@/utils/customerUtils';
import { anonymousId, createCart } from '@/api/cart/cart';
import {
  buildLineItemActionAdd,
  convertToCartProduct,
  createCartDraft,
  createEmptyCartDraft,
  findLineItem,
  getOrCreateAnonymousId,
} from '@/utils/cartUtils';
import { checkExistingCart, updateCart } from '@/api/cart/cartAdmin';
import { CartUpdateActions } from '@/data/constants';

export default class CartManager {
  private cart: Cart | null = null;
  private user: SessionUser | null = getLoggedInUserFromSessionStorage();
  private initializing = false;

  public async getCart(): Promise<Cart | null> {
    return this.cart;
  }

  public async initialize() {
    if (this.cart !== null || this.initializing) return;
    this.initializing = true;

    const id: string = anonymousId ?? getOrCreateAnonymousId();
    let sessionUserCustomerId = null;
    let queryParam: string;

    if (this.user !== null) {
      queryParam = `customerId="${this.user.customerId}"`;
      sessionUserCustomerId = this.user.customerId;
    } else {
      queryParam = `anonymousId="${id}"`;
    }

    const cartExists = await checkExistingCart(queryParam);
    if (cartExists) {
      this.cart = cartExists;
    } else {
      const draft = createEmptyCartDraft(sessionUserCustomerId ?? id);
      try {
        const newCart = await createCart(draft);
        if (newCart) {
          this.cart = newCart;
        } else {
          console.error('Failed to create cart');
        }
      } catch (error) {
        console.error('Error creating cart:', error);
      } finally {
        this.initializing = false;
      }
    }
  }

  public async addToCart(product: ProductProjection | ProductInteface) {
    if (!this.cart) {
      const cartDraft = createCartDraft(product, this.user);
      await this.createNewCart(cartDraft);
    }
    await this.manageLineItem(convertToCartProduct(product));
    return this.cart;
  }

  private async createNewCart(cartDraft: CartDraft) {
    if (this.cart == null) return;
    try {
      const newCart: Cart = await createCart(cartDraft);
      this.cart = newCart;
      return newCart;
    } catch (error) {
      console.error('Failed to create new cart:', error);
    }
  }

  private async manageLineItem(product: CartProduct): Promise<void> {
    if (this.cart == null) throw new Error('Please create a cart first!');
    const { id: productId, variantId } = product;
    const lineItem = findLineItem(product.id, this.cart);
    const action: MyCartUpdateAction = buildLineItemActionAdd(product, lineItem);

    const cartUpdate: MyCartUpdate = {
      version: this.cart.version,
      actions: [action],
    };

    try {
      this.cart = await updateCart(this.cart, cartUpdate);
    } catch (error) {
      console.error('Error in manageLineItem:', error);
      throw error;
    }
  }

  public isInCart(productId: string): boolean {
    if (!this.cart) return false;
    return this.cart.lineItems.some((item) => item.productId === productId);
  }

  public async removeFromCart(productId: string): Promise<Cart | void> {
    if (!this.cart) throw new Error('Cart is not initialized');

    const lineItem = findLineItem(productId, this.cart);
    if (!lineItem) return;

    const action: MyCartUpdateAction = {
      action: CartUpdateActions.removeLineItem,
      lineItemId: lineItem.id,
    };

    const cartUpdate: MyCartUpdate = {
      version: this.cart.version,
      actions: [action],
    };
    try {
      this.cart = await updateCart(this.cart, cartUpdate);
      return this.cart;
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  }
}
