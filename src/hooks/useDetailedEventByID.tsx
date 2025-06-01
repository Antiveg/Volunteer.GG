import { useQuery } from '@tanstack/react-query';
import { fetchEventById } from '@/lib/api/fetchDetailedEventByID';

export function useDetailedEventByID(id: string | undefined) {
    return useQuery({
        queryKey: ['event', id],
        queryFn: () => fetchEventById(id!),
        enabled: !!id, // only fetch when id is defined
        staleTime: 5 * 60 * 1000,
    });
}