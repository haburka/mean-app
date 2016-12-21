import {PicData} from "./pic-data";
export interface PicResponse {
    friends: {
        data: Array<PicData>
        paging: {
            cursors: {
                before: string;
                after: string;
            },
            next: string;
        },
        summary: {
            total_count: number;
        }
    },
    id: string;
}