"use client";
import { ErrorBox, LoadingBox } from '@/components';
import { FriendCard } from '@/components/FriendList';
import { useChat } from '@/hooks/useChat';
import { useFriends } from '@/hooks/useFriends';
import { useSendMessage } from '@/hooks/useSendMessages';
import { useSessionRedirect } from '@/hooks/useSessionRedirect';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, FormEvent, useRef, useEffect } from 'react';

export default function Chat() {

  const params = useParams();
  const router = useRouter();
  const { session, status } = useSessionRedirect();
  const { data: friends = [] } = useFriends();

  const initialFriendId = params.id ? Number(params.id) : (friends[0]?.id || null);
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(initialFriendId);
  const { data: messages = [], isLoading, isError, error } = useChat(Number(selectedFriendId));

  const senderId = session?.user?.id
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleFriendCardClick = (friendId: number) => {
    setSelectedFriendId(friendId);

    router.push(`/chat/${friendId}`);
  };


  const { mutate: sendMessage } = useSendMessage(selectedFriendId!);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputText.trim()) return;

    const content = inputText.trim();

    sendMessage({
      sender_id: Number(senderId),
      receiver_id: selectedFriendId!,
      content,
    });

    setInputText('');
  };

  if (status === "unauthenticated") return <LoadingBox message='Redirecting to signin...'/>
  if (isLoading) return <LoadingBox message='Loading chat...'/>
  if (isError) return <ErrorBox error={error as any}/>

  return (
    <div className="flex flex-1 flex-row gap-2 p-4 h-full">
      <div className="flex flex-col flex-1 gap-2 overflow-y-scroll bg-white-100 px-2 border-r">
        <p>FriendList</p>
        {!friends ? "No friends yet..." : 
        friends.map((friend : any, i : number) => 
        <FriendCard key={i} user={friend} onClick={() => handleFriendCardClick(friend.id)}/>)}
      </div>
      <div className="flex flex-col gap-2 overflow-y-scroll w-3/4 min-w-96 h-full bg-white rounded-lg">
        <div className="flex flex-1 overflow-y-auto h-auto p-4 flex flex-col gap-3 bg-white">
          {messages.map((msg : any) => (
            <div
              key={msg.id}
              className={`${
                msg.sender_id === senderId ? 'self-end bg-blue-600 text-white' : 'self-start bg-gray-200 text-gray-800'
              } p-3 rounded-xl max-w-[75%] break-words shadow-sm`}
            >
              <p className="m-0 text-sm leading-6">{msg.chat}</p>
              <p
                className={`${
                  msg.sender_id === senderId ? 'text-right text-white' : 'text-left'
                } mt-1 text-xs text-opacity-60 text-gray-500`}
              >
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex p-4 border-t border-gray-200 bg-gray-100">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-3 border border-gray-300 rounded-full mr-3 text-sm"
          />
          <button
            type="submit"
            className="p-3 rounded-full bg-blue-600 text-white font-semibold text-sm"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
