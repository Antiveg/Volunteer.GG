import { useQuery } from '@tanstack/react-query';
import { fetchDetailedOrganizationByID } from '@/lib/api/fetchDetailedOrganizationByID';

export function useOrganization(id: string) {
  return useQuery({
    queryKey: ['organization', id],
    queryFn: () => fetchDetailedOrganizationByID(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 mins
  });
}