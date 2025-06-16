import type {
  Cart,
  CartDraft,
  MyCartUpdate,
  MyCartUpdateAction,
  ProductProjection,
  MyCartRemoveLineItemAction,
} from '@commercetools/platform-sdk';
import type { CartProduct, SessionUser } from '@/data/interfaces';
import { type ProductInteface } from '@/data/interfaces';
import { getLoggedInUserFromSessionStorage } from '@/utils/customerUtils';
import { anonymousId, createCart } from '@/api/cart/cart';
import {
  buildLineItemActionAdd,
  buildLineItemActionRemove,
  convertToCartProduct,
  createCartDraft,
  createEmptyCartDraft,
  findLineItem,
  getCartQuery,
  getOrCreateAnonymousId,
} from '@/utils/cartUtils';
import { checkExistingCart, updateCart } from '@/api/cart/cartAdmin';

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
    let sessionUserCustomerId = this.user?.customerId;
    let queryParam: string = getCartQuery(this.user, anonymousId);

    const cartExists = await checkExistingCart(queryParam);
    this.setCartIfExists(cartExists);

    if (!cartExists) {
      const draft = createEmptyCartDraft(sessionUserCustomerId, id);
      try {
        const newCart: Cart = await createCart(draft);
        this.setCartIfExists(newCart);
      } catch (error) {
        console.error('Error creating cart:', error);
        throw error;
      } finally {
        this.initializing = false;
      }
    }
  }

  public async addToCart(product: ProductProjection | ProductInteface) {
    if (!this.cart) {
      const cartDraft = createCartDraft(product, this.user);
      try {
        await this.createNewCart(cartDraft);
      } catch (error) {
        console.error('Error creating cart:', error);
        throw error;
      }
    }
    try {
      await this.manageLineItem(convertToCartProduct(product));
      return this.cart;
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
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
    const lineItem = findLineItem(product.id, this.cart);
    const action: MyCartUpdateAction = buildLineItemActionAdd(product, lineItem);

    const cartUpdate: MyCartUpdate = {
      version: this.cart.version,
      actions: [action],
    };
    try {
      const updatedCart = await updateCart(this.cart, cartUpdate);
      if (updatedCart) this.cart = updatedCart;
    } catch (error) {
      console.error('Error in manageLineItem:', error);
      throw error;
    }
  }

  public isInCart(productId: string): boolean {
    if (!this.cart) return false;
    return this.cart.lineItems.some((item) => item.productId === productId);
  }

  public async changeLineItemQuantity(lineItemId: string, quantity: number): Promise<Cart | null> {
    if (!this.cart) {
      console.error('Cart is not initialized');
      return null;
    }

    const action: MyCartUpdateAction = {
      action: 'changeLineItemQuantity',
      lineItemId,
      quantity,
    };

    const cartUpdate: MyCartUpdate = {
      version: this.cart.version,
      actions: [action],
    };

    try {
      const updatedCart = await updateCart(this.cart, cartUpdate);
      this.cart = updatedCart;
      return updatedCart;
    } catch (error) {
      console.error('Failed to change item quantity:', error);
      throw error;
    }
  }

  public async increaseQuantity(lineItemId: string): Promise<Cart | null> {
    if (!this.cart) return null;

    const lineItem = this.cart.lineItems.find((item) => item.id === lineItemId);
    if (!lineItem) return null;

    const newQuantity = lineItem.quantity + 1;
    return this.changeLineItemQuantity(lineItemId, newQuantity);
  }

  public async decreaseQuantity(lineItemId: string): Promise<Cart | null> {
    if (!this.cart) return null;

    const lineItem = this.cart.lineItems.find((item) => item.id === lineItemId);
    if (!lineItem) return null;

    const newQuantity = lineItem.quantity - 1;
    if (newQuantity <= 0) {
      return this.removeFromCart(lineItem.productId);
    }
    return this.changeLineItemQuantity(lineItemId, newQuantity);
  }
  public async removeFromCart(productId: string): Promise<Cart | null> {
    if (!this.cart) throw new Error('Cart is not initialized');

    const lineItem = findLineItem(productId, this.cart);
    if (!lineItem) return null;

    const action: MyCartUpdateAction = buildLineItemActionRemove(lineItem.id);

    const cartUpdate: MyCartUpdate = {
      version: this.cart.version,
      actions: [action],
    };
    try {
      const updatedCart = await updateCart(this.cart, cartUpdate);
      if (updatedCart) this.cart = updatedCart;
      return this.cart;
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      return null;
    }
  }

  public setCartIfExists(newCart: Cart | undefined) {
    if (newCart) this.cart = newCart;
  }

  public setCartToNull(): void {
    this.cart = null;
  }
  public async applyPromoCode(code: string): Promise<Cart | null> {
    if (!this.cart) throw new Error('Cart not initialized');

    const cartUpdate: MyCartUpdate = {
      version: this.cart.version,
      actions: [
        {
          action: 'addDiscountCode',
          code: code.trim(),
        },
      ],
    };

    try {
      const updatedCart = await updateCart(this.cart, cartUpdate);
      if (updatedCart) this.cart = updatedCart;
      return this.cart;
    } catch (error) {
      console.error('Failed to apply promo code:', error);
      throw error;
    }
  }

  public async removePromoCode(code: string): Promise<Cart | null> {
    if (!this.cart) throw new Error('Cart not initialized');

    // Find the discount code *ID* by matching the string to a cached/applied value
    const appliedCode = this.cart.discountCodes?.find(
      (d) => d.state === 'MatchesCart' // Optional filter: active codes
    );

    if (!appliedCode) return null;

    const cartUpdate: MyCartUpdate = {
      version: this.cart.version,
      actions: [
        {
          action: 'removeDiscountCode',
          discountCode: {
            typeId: 'discount-code',
            id: appliedCode.discountCode.id,
          },
        },
      ],
    };

    try {
      const updatedCart = await updateCart(this.cart, cartUpdate);
      if (updatedCart) this.cart = updatedCart;
      return this.cart;
    } catch (error) {
      console.error('Failed to remove promo code:', error);
      throw error;
    }
  }

  public async clearCart(): Promise<Cart | null> {
    if (!this.cart || this.cart.lineItems.length === 0) return this.cart;

    const actions: MyCartRemoveLineItemAction[] = this.cart.lineItems.map((item) => ({
      action: 'removeLineItem',
      lineItemId: item.id,
    }));

    const cartUpdate: MyCartUpdate = {
      version: this.cart.version,
      actions,
    };

    try {
      const updatedCart = await updateCart(this.cart, cartUpdate);
      this.cart = updatedCart;
      return updatedCart;
    } catch (error) {
      console.error('Failed to clear cart:', error);
      return null;
    }
  }
}
