import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertChat } from '@/lib/api/insertChat';

export const useSendMessage = (recipientId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newMessageData: any) => insertChat(newMessageData),
    onSuccess: (newMessage : any) => {
      // Update the cache after successful mutation
      queryClient.setQueryData(['chatMessages', { recipientId }], (oldMessages: any = []) => {
        return [...oldMessages, newMessage];
      });
    },
    onError: (error : any) => {
      console.error('Error sending message:', error);
    },
  });

  return mutation;
};
