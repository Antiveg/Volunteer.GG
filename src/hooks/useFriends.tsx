import { fetchFriends } from '@/lib/api/fetchFriends';
import { useQuery } from '@tanstack/react-query';

export function useFriends() {
    console.log("friends")
  return useQuery({
    queryKey: ['friends'],
    queryFn: fetchFriends,
    staleTime: 1000 * 60 * 5, // 5 mins
  });
}