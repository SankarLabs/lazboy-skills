import { useCategories } from '../../hooks/useCategories';

interface Props {
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
}

export default function FilterPanel({ selectedCategory, onCategoryChange }: Props) {
  const { data: categories } = useCategories();

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700">Categories</h3>
      <div className="space-y-1">
        <button
          onClick={() => onCategoryChange('')}
          className={`block w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
            !selectedCategory
              ? 'bg-indigo-50 text-indigo-700 font-medium'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All Categories
        </button>
        {categories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.slug)}
            className={`block w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
              selectedCategory === cat.slug
                ? 'bg-indigo-50 text-indigo-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
