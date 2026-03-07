import { useCategories } from '../../hooks/useCategories';

interface Props {
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
}

export default function FilterPanel({ selectedCategory, onCategoryChange }: Props) {
  const { data: categories } = useCategories();

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-[#1B3A6B]">Categories</h3>
      <div className="space-y-1">
        <button
          onClick={() => onCategoryChange('')}
          className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
            !selectedCategory
              ? 'bg-[#1B3A6B]/10 text-[#1B3A6B] font-medium'
              : 'text-[#2C2C2C]/60 hover:bg-[#1B3A6B]/5'
          }`}
        >
          All Categories
        </button>
        {categories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.slug)}
            className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedCategory === cat.slug
                ? 'bg-[#1B3A6B]/10 text-[#1B3A6B] font-medium'
                : 'text-[#2C2C2C]/60 hover:bg-[#1B3A6B]/5'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
