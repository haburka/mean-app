export class FeedMessages {
    data: Array<{
        message: string;
    }>;
    paging: any;

    constructor(){
        this.data = [];
    }
}
