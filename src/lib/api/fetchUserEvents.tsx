export async function fetchUserEvents(uid: number | null) {
  if (!uid || isNaN(uid)) throw new Error('Invalid uid');
  
  const res = await fetch(`/api/user/${uid}/events`);

  if (!res.ok) {
      const errorBody = await res.json()
      const error = new Error(errorBody.message || 'Error occurred') as any
      error.status = res.status
      throw error
  }

  return res.json();
}
