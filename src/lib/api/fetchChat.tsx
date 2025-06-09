export async function fetchChat(receipient_id: number){
    console.log("fetchChat")
    const res = await fetch(`/api/chat/${receipient_id}`);

    if (!res.ok) {
        const errorBody = await res.json()
        const error = new Error(errorBody.message || 'Error occurred') as any
        error.status = res.status
        throw error
    }

    return res.json();
}