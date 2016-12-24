export class Post {
    url: string;
    whoLikes: Array<any>;
    message: string;

    constructor(){
        this.url = "";
        this.whoLikes = [];
        this.message = "";
    }
}
