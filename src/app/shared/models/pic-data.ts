export interface PicData {
    first_name: string;
    last_name: string;
    picture: {
        data: {
            is_silhouette: boolean;
            url: string;
        }
    }
    id: string;
}
