import { useQuery } from '@tanstack/react-query';
import { fetchChat } from '@/lib/api/fetchChat';

export function useChat(receipient_id: number) {
    return useQuery({
        queryKey: ['chat', receipient_id],
        queryFn: () => fetchChat(receipient_id),
        enabled: !!receipient_id,
        staleTime: 5 * 60 * 1000,
    })
}