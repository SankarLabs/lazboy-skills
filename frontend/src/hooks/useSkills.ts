import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import type { PaginatedResponse, SkillListItem } from '../types';

interface UseSkillsParams {
  page?: number;
  perPage?: number;
  category?: string;
  tag?: string;
  sort?: string;
}

export function useSkills({ page = 1, perPage = 20, category, tag, sort = 'newest' }: UseSkillsParams = {}) {
  return useQuery({
    queryKey: ['skills', { page, perPage, category, tag, sort }],
    queryFn: async () => {
      const params: Record<string, string | number> = { page, per_page: perPage, sort };
      if (category) params.category = category;
      if (tag) params.tag = tag;
      const { data } = await api.get<PaginatedResponse<SkillListItem>>('/skills', { params });
      return data;
    },
  });
}
