export interface Likes {
    id: string,
    likes: {
        data: Array<{
            id: string,
            name: string,
        }>
        summary: {
            total_count: number
        }
    }
}

