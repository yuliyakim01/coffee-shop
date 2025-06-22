import type { ForwardRefRenderFunction } from 'react';
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import type { PaginationHandle, PaginationProps } from '@/data/interfaces';

const PaginationComponent: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  className,
  style,
}) => {
  const [inputPageValue, setInputPageValue] = useState(currentPage.toString());
  const [inputSizeValue, setInputSizeValue] = useState(pageSize.toString());
  const [pageError, setPageError] = useState('');
  const [sizeError, setSizeError] = useState('');

  useEffect(() => {
    setInputPageValue(currentPage.toString());
    setPageError('');
  }, [currentPage]);

  useEffect(() => {
    setInputSizeValue(pageSize.toString());
    setSizeError('');
  }, [pageSize]);

  const handleChangePage = (page: number) => {
    if (page < 1 || page > totalPages) {
      setPageError(`Page must be between 1 and ${totalPages}`);
      return;
    }
    onPageChange?.(page);
  };

  const handleInputBlur = () => {
    const page = parseInt(inputPageValue, 10);
    if (!page || page < 1 || page > totalPages) {
      setPageError(`Page must be between 1 and ${totalPages}`);
      setInputPageValue(currentPage.toString());
    } else {
      handleChangePage(page);
    }
  };

  const handleSizeBlur = () => {
    const size = parseInt(inputSizeValue, 10);
    if (!size || size < 1) {
      setSizeError('Size must be ≥ 1');
      setInputSizeValue(pageSize.toString());
    } else {
      onPageSizeChange?.(size);
    }
  };

  return (
    <div
      className={`mt-4 px-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-black ${className ?? ''}`}
      style={style}
    >
      <span className="text-lg font-medium">
        Page: {currentPage} / {totalPages}
      </span>

      <div className="flex items-center gap-2">
        <button disabled={currentPage === 1} onClick={() => handleChangePage(currentPage - 1)}>
          Prev
        </button>
        <button disabled={currentPage === totalPages} onClick={() => handleChangePage(currentPage + 1)}>
          Next
        </button>
      </div>

      <div className="flex items-center gap-1">
        <label className="text-sm">Go to:</label>
        <input
          value={inputPageValue}
          onChange={(e) => setInputPageValue(e.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleInputBlur()}
          className={`w-16 px-2 py-1 border rounded-md text-center ${pageError ? 'border-red-500' : 'border-coffeeBrown'}`}
        />
      </div>
      {pageError && <div className="text-red-500 text-xs">{pageError}</div>}

      <div className="flex items-center gap-1">
        <label className="text-sm">Items per page:</label>
        <input
          value={inputSizeValue}
          onChange={(e) => setInputSizeValue(e.target.value)}
          onBlur={handleSizeBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleSizeBlur()}
          className={`w-16 px-2 py-1 border rounded-md text-center ${sizeError ? 'border-red-500' : 'border-coffeeBrown'}`}
        />
      </div>
      {sizeError && <div className="text-red-500 text-xs">{sizeError}</div>}
    </div>
  );
};

export default PaginationComponent;
