import { useQuery } from '@tanstack/react-query';
import { fetchEventProgress } from '@/lib/api/fetchEventProgress';

export function useEventProgress(id : number) {
  return useQuery({
    queryKey: ['event-progress', id],
    queryFn: () => fetchEventProgress(Number(id)),
    staleTime: 1000 * 60, // 1 minute
  })
}