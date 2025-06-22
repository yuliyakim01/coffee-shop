import { useEffect, useMemo, useState } from 'react';
import { productService } from './ProductService';
import type { ProductInteface } from '@/data/interfaces';
import { subscriptionManager } from '@/api/product/SubscriptionManager';

export function useProducts() {
  const [products, setProducts] = useState<ProductInteface[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const totalCount = productService.getTotalCount();
    setTotal(totalCount);

    const handleProductUpdate = () => {
      setProducts(productService.getProducts());
      setLoading(false);
    };

    subscriptionManager.subscribe(handleProductUpdate);

    if (total === 0) {
      setLoading(true);
      productService.loadProducts();
    } else {
      handleProductUpdate();
    }

    return () => subscriptionManager.unsubscribe(handleProductUpdate);
  }, []);

  const setSearchTerm = useMemo(() => productService.setSearchTerm.bind(productService), []);
  const setFilter = useMemo(() => productService.setFilter.bind(productService), []);
  const setSort = useMemo(() => productService.setSort.bind(productService), []);
  const setPagination = useMemo(() => productService.setPagination.bind(productService), []);

  return {
    products,
    total,
    loading,
    setSearchTerm,
    setFilter,
    setSort,
    setPagination,
  };
}
