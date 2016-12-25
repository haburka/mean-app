import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FbGraphService} from "../shared/services/fb-graph.service";
import {TitleService} from "../shared/services/title-service.service";
import {Likes} from "../shared/models/likes";
import {Feed} from "../shared/models/feed";
import {FeedItem} from "../shared/models/feed-item";
import {Post} from "../shared/models/post";
import {PicResponse} from "../shared/models/pic-response";
import {PicData} from "../shared/models/pic-data";
import {FeedLikes} from "../shared/models/feed-likes";

@Component({
    selector: 'app-fb-play',
    templateUrl: './fb-play.component.html',
    styleUrls: ['./fb-play.component.scss']
})
export class FbPlayComponent implements OnInit {

    public response: any;

    public path: string;
    public fields: string;
    public pics: Array<any>;
    public posts: Array<any>;
    public totalLikes: number;
    public whoLikes: Array<{name:string,num:number}>;
    public isLoggedIn: boolean;
    public error: string;
    public loading = false;

    constructor(
      private fb: FbGraphService,
      private titleService: TitleService,
      ) {
    }

    ngOnInit() {
        this.fb.loggedIn$.subscribe((val)=>this.isLoggedIn = val);
        this.fb.error$.subscribe((val)=>this.error = val);
        this.fbCheckLogin();
        this.titleService.title.next("Analyze your Facebook Posts");
    }

    fbLogin(){
        this.fb.fbLogin().then((res: any) => {});
    }

    fbCheckLogin(){
        this.fb.fbCheckLogin().then((res: any) => {});
    }

    parseResponse(val){
        this.response = JSON.stringify(val);
    }

    parseFeedLikes(val: any){
        this.totalLikes = val.data.reduce((a: number, b: Likes)=>{
            if(b && b.likes){
                return a + b.likes.summary.total_count;
            } else {
                return 0;
            }
        },0);
        let names = val.data.reduce((a: Array<string>, b: Likes) => {
            if(b && b.likes) {
                return a.concat(b.likes.data.map((val)=>val.name));
            } else{
                return [];
            }
        },[]);
        var counts = {};
        names.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
        console.log(counts);
        this.whoLikes = Object.keys(counts).map((key: string)=>{
            return {name: key, num: counts[key]};
        });
        this.whoLikes.sort((a: {name: string, num: number}, b: {name: string, num: number}) => {
            return b.num - a.num;
        });
    }

    parseFeedItems(val: Feed){
        this.posts = val.data.map((item: FeedItem) => {
            let post = new Post();
            if(item.likes){
                post.whoLikes = item.likes.data.map((val: any) => val.name);
            }
            if(item.full_picture){
                post.url = item.full_picture;
            }
            if(item.message){
                post.message = item.message;
            }
            return post;
        });
    }

    parsePicsResponse(val: PicResponse){
        this.pics = val.friends.data.map((val: PicData) => {
            return {
                url: val.picture.data.url,
                width: "200px",
                height: "200px"
            };
        });
    }

    getFeedLikes(){
        this.loading = true;
        this.fb.fbGetAllPages("/me/posts", "GET", "likes.summary(true)",10).then((resp: FeedLikes)=> {
            this.parseFeedLikes(resp);
            this.loading = false;
        })
    }

    getFeedItems(){
        this.fb.fbGetAllPages("/me/posts", "GET", "message,full_picture,likes",3).then((resp: Feed)=> {
            this.parseFeedItems(resp);
        })
    }


    getPicsOfFriends(){
        //me?fields=friends.limit(10){first_name,last_name,picture.type(large)}
        this.fb.fbRun("/me", "GET", "friends.limit(10){first_name,last_name,picture.type(large)}").then((resp: PicResponse)=> {
            this.parsePicsResponse(resp);
        })
    }

    getFB() {
        this.fb.fbRun(this.path, "GET", this.fields).then((resp)=> {
            console.log(resp);
            this.parseResponse(this.fb.response);
        })
    }

}
