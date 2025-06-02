import { useQuery } from '@tanstack/react-query';
import { fetchUserEvents } from '@/lib/api/fetchUserEvents';

export function useUserEvents(uid: number | null) {
  return useQuery({
      queryKey: ['events', uid],
      queryFn: () => fetchUserEvents(uid),
      enabled: !!uid, // Only fetch if userId is valid (not null)
      retry: 3, // Retry up to 3 times on failure
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  })
}
