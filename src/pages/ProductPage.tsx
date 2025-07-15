import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { useProducts } from '@/api/product/useProduct';
import ProductComponent from '@/components/Product-components/ProductComponent';
import SortingComponent from '@/components/Product-components/SortingComponent';
import Breadcrumb from '@/components/Product-components/Breadcrumb';
import { ProductFilter, ProductInteface, SearchComponentHandle, SortField, SortOrder } from '@/data/interfaces';
import SearchComponent from '@/components/Product-components/SearchComponent';
import PaginationComponent from '@/components/Product-components/PaginationComponent';
import FilterComponent from '@/components/Product-components/FilterComponent';

const ProductPage: React.FC = () => {
  const { products, total, loading, setSearchTerm, setFilter, setPagination, setSort } = useProducts();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages: number = Math.ceil(total / pageSize);

  const searchRef = useRef<SearchComponentHandle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
      setCurrentPage(1);
      setPagination(0, pageSize);
      setPagination(0, pageSize);
    },
    [setSearchTerm, setPagination, pageSize]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      setPagination((newPage - 1) * pageSize, pageSize);
    },
    [pageSize, setPagination]
  );

  const handlePageSizeChange = useCallback(
    (size: number) => {
      setPageSize(size);
      setCurrentPage(1);
      setPagination(0, size);
    },
    [setPagination]
  );

  const handleSortChange = useCallback(
    (field: SortField | null, order: SortOrder | null) => {
      if (field && order) {
        setSort(field, order);
      } else {
        setSort(null, null);
      }

      setCurrentPage(1);
      setPagination(0, pageSize);
    },
    [setSort, setPagination, pageSize]
  );

  const handleFilterChange = useCallback(
    (filters: ProductFilter) => {
      setFilter(filters);
      setCurrentPage(1);
      setPagination(0, pageSize);
      if (filters.category) {
        setSelectedCategory(filters.category);
      } else {
        setSelectedCategory('');
      }
    },
    [setFilter, setPagination, pageSize]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-lightCream">
        <BeatLoader color="#6F4E37" size={20} />
      </div>
    );
  }

  return (
    <div className="w-full bg-lightCream py-[100px]">
      <div className="px-4 mb-4">
        <Breadcrumb
          currentCategoryKey={selectedCategory}
          onNavigate={(key) => {
            const safeKey = key || '';
            setSelectedCategory(safeKey);
            setFilter({ category: safeKey });
            setPagination(0, pageSize);
          }}
        />
      </div>
      <div className="w-full flex justify-between items-baseline gap-4 mb-8 px-4 max-[1180px]:flex-col max-[1130px]:items-center">
        <SearchComponent ref={searchRef} placeholder="Search by name..." onSearchChange={handleSearchChange} />
        <div className="flex gap-4 items-center max-[800px]:flex-col max-[800px]:items-center">
          <SortingComponent onSortChange={handleSortChange} />
          <FilterComponent onFilterChange={handleFilterChange} />
        </div>
      </div>

      <div className="w-full flex flex-wrap gap-4 justify-center">
        {products.length === 0 ? (
          <p className="text-coffeeBrown text-lg">No products match your search.</p>
        ) : (
          products.map((product: ProductInteface) => <ProductComponent key={product.id} product={product} />)
        )}
      </div>

      {!loading && totalPages > 1 && (
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
};

export default ProductPage;
