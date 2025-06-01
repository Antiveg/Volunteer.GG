import { useQuery } from '@tanstack/react-query';
import { fetchOrganizations } from '@/lib/api/fetchOrganizations';

export function useOrganizations() {
  return useQuery({
    queryKey: ['organizations'],
    queryFn: fetchOrganizations,
    staleTime: 1000 * 60 * 5, // 5 mins
  });
}
