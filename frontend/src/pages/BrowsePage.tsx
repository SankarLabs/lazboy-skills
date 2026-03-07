import { useSearchParams } from 'react-router-dom';
import { useSkills } from '../hooks/useSkills';
import { useSearch } from '../hooks/useSearch';
import SkillGrid from '../components/skills/SkillGrid';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SearchBar from '../components/search/SearchBar';
import FilterPanel from '../components/search/FilterPanel';
import SortDropdown from '../components/search/SortDropdown';

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || '1');
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'newest';
  const query = searchParams.get('q') || '';

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    for (const [key, val] of Object.entries(updates)) {
      if (val) params.set(key, val);
      else params.delete(key);
    }
    // Reset page when filters change
    if (!('page' in updates)) params.set('page', '1');
    setSearchParams(params);
  };

  const skillsQuery = useSkills({
    page,
    category: category || undefined,
    sort,
  });

  const searchQuery = useSearch({
    query,
    category: category || undefined,
    page,
  });

  const isSearching = query.length > 0;
  const activeQuery = isSearching ? searchQuery : skillsQuery;
  const { data, isLoading, error } = activeQuery;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1B3A6B]">Browse Skills</h1>
        {data && (
          <span className="text-sm text-gray-500">{data.total} skills</span>
        )}
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <FilterPanel
            selectedCategory={category}
            onCategoryChange={(slug) => updateParams({ category: slug })}
          />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1">
              <SearchBar
                value={query}
                onChange={(q) => updateParams({ q })}
              />
            </div>
            {!isSearching && (
              <SortDropdown
                value={sort}
                onChange={(s) => updateParams({ sort: s })}
              />
            )}
          </div>

          {/* Mobile category filter */}
          <div className="lg:hidden mb-4">
            <select
              value={category}
              onChange={(e) => updateParams({ category: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
            >
              <option value="">All Categories</option>
              {/* Categories loaded in FilterPanel, simplified here */}
            </select>
          </div>

          {isLoading && <LoadingSpinner />}

          {error && (
            <div className="text-center py-12">
              <p className="text-[#C0392B]">Failed to load skills. Please try again.</p>
            </div>
          )}

          {data && (
            <>
              <SkillGrid skills={data.data} />
              <Pagination
                page={data.page}
                totalPages={data.total_pages}
                onPageChange={(p) => updateParams({ page: String(p) })}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
