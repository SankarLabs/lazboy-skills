import { useSearchParams } from 'react-router-dom';
import { useSkills } from '../hooks/useSkills';
import SkillGrid from '../components/skills/SkillGrid';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || '1');
  const category = searchParams.get('category') || undefined;
  const sort = searchParams.get('sort') || 'newest';

  const { data, isLoading, error } = useSkills({ page, category, sort });

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Browse Skills</h1>
        {data && (
          <span className="text-sm text-gray-500">{data.total} skills</span>
        )}
      </div>

      {isLoading && <LoadingSpinner />}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-500">Failed to load skills. Please try again.</p>
        </div>
      )}

      {data && (
        <>
          <SkillGrid skills={data.data} />
          <Pagination page={data.page} totalPages={data.total_pages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
