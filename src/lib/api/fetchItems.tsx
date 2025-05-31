import { ItemAttributes } from '@/types';

export async function fetchAllItems(): Promise<ItemAttributes[]> {
    const res = await fetch('/api/items')
    if (!res.ok) {
        const errorBody = await res.json()
        const error = new Error(errorBody.message || 'Error occurred') as any
        error.status = res.status
        throw error
    }
    return res.json();
}