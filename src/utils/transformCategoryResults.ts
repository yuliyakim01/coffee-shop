import type { SimpleCategory } from '@/data/interfaces';
import type { Category } from '@commercetools/platform-sdk';

export function transformCategoryResults(results: Category[]): SimpleCategory[] {
  return results
    .map((cat) => {
      const key = cat.key || cat.slug?.['en-US'];
      const nameObject = cat.name;
      const label = nameObject && typeof nameObject === 'object' ? Object.values(nameObject)[0] : '';

      if (!key || !label) {
        console.warn('⚠️ Skipping category due to missing key or name', cat);
        return null;
      }

      return {
        key,
        label: label || key || 'Unnamed Category',
      };
    })
    .filter((cat): cat is SimpleCategory => !!cat?.key && !!cat?.label);
}
