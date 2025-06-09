export const insertChat = async (newMessageData : any) => {
  const response = await fetch('/api/chat/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMessageData),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  const result = await response.json();
  return result;
};
