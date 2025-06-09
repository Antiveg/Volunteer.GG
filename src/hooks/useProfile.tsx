import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '@/lib/api/fetchProfile'

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5,
  })
}