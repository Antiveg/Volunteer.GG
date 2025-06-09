export async function fetchProfile(){
    const res = await fetch('/api/profile')
    if (!res.ok) {
        const errorBody = await res.json()
        const error = new Error(errorBody.message || 'Error occurred') as any
        error.status = res.status
        throw error
    }
    // console.log(res.json())
    return res.json();
}