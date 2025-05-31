import { useQuery } from '@tanstack/react-query';
import { fetchAllItems } from '@/lib/api/fetchItems';

export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: fetchAllItems,
    staleTime: 1000 * 60 * 5, // 5 mins
  });
}