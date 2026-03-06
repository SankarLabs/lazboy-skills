import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import type { PaginatedResponse, SkillListItem } from '../types';

interface UseSearchParams {
  query: string;
  category?: string;
  page?: number;
  perPage?: number;
}

export function useSearch({ query, category, page = 1, perPage = 20 }: UseSearchParams) {
  return useQuery({
    queryKey: ['search', { query, category, page, perPage }],
    queryFn: async () => {
      const params: Record<string, string | number> = { q: query, page, per_page: perPage };
      if (category) params.category = category;
      const { data } = await api.get<PaginatedResponse<SkillListItem>>('/search', { params });
      return data;
    },
    enabled: query.length > 0,
  });
}
