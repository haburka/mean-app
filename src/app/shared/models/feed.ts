import {FeedItem} from "./feed-item";
export class Feed {
    data: Array<FeedItem>;
    paging: {
        previous: string,
        next: string,
    };
    constructor(){
        this.data = [];
        this.paging = {
            previous: "",
            next: "",
        };
    }
}