import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/lib/api/fetchCategories';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60, // 1 minute
    // cacheTime: 1000 * 60 * 5, // 5 minutes
  })
}