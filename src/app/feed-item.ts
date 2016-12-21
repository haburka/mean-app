export interface FeedItem {
    message: string;
    full_picture: string;
    id: string;
    likes: {
        data: Array<{
            id: string,
            name: string,
        }>,
        paging: {
            cursors: {
                before: string,
                after: string,
            }
        },
        next: string
    }
}
