import React, { useEffect, useState } from 'react';
import { categoryService } from '@/api/category/CategoryService';
import type { Category } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  currentCategoryKey?: string;
  productName?: string;
  onNavigate?: (key?: string) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentCategoryKey, productName, onNavigate }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const results = await categoryService.getCategories();
      setCategories(results);
    };
    fetchCategories();
  }, []);

  const categoryMap: Record<string, Category> = categories.reduce(
    (acc, cat) => {
      acc[cat.key as string] = cat;
      return acc;
    },
    {} as Record<string, Category>
  );

  const buildHierarchyPath = (key?: string): Category[] => {
    if (!key || !categoryMap[key]) return [];

    return Array.from({ length: categories.length }) // max depth bound
      .reduce<Category[]>((path) => {
        const current = key && categoryMap[key];
        if (!current) return path;

        path.unshift(current);
        key = current.parent?.id;
        return path;
      }, []);
  };

  const hierarchy = buildHierarchyPath(currentCategoryKey);

  return (
    <nav className="text-coffeeBrown text-lg font-medium flex items-center gap-1">
      <Link to="/" className="hover:underline">
        Home
      </Link>
      <span>{'>'}</span>
      <Link to="/products" className="hover:underline">
        Products
      </Link>

      {hierarchy.map((category) => (
        <React.Fragment key={category.key}>
          <span>{'>'}</span>
          {onNavigate ? (
            <button onClick={() => onNavigate(category.key)} className="hover:underline">
              {category.name?.['en-US'] || Object.values(category.name)[0] || category.key}
            </button>
          ) : (
            <span>{category.name?.['en-US'] || Object.values(category.name)[0] || category.key}</span>
          )}
        </React.Fragment>
      ))}

      {productName && (
        <>
          <span>{'>'}</span>
          <span className="text-coffeeBrown">{productName}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;
