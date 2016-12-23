import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FbGraphService} from "../fb-graph.service";
import {PicResponse} from "../pic-response";
import {PicData} from "../pic-data";
import {Feed} from "../feed";
import {Post} from "../post";
import {FeedItem} from "../feed-item";
import {FeedLikes} from "../feed-likes";
import {Likes} from "../likes";
import {UClassifyAPIService} from "../u-classify-api.service";
import {FeedMessages} from "../feed-messages";
import {UcReply} from "../uc-reply";
import {TitleService} from "../title-service.service";

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
    public loadingClassifications = false;
    public messages: Array<string>;
    public classifications: Array<UcReply>;
    public displayClassifications: Array<{message: string, classification: UcReply}>;
    public action: string;

    constructor(
      private fb: FbGraphService,
      private uClassify: UClassifyAPIService,
      private titleService: TitleService) {
    }

    ngOnInit() {
        this.fb.loggedIn$.subscribe((val)=>this.isLoggedIn = val);
        this.fb.error$.subscribe((val)=>this.error = val);
        this.fbCheckLogin();
        this.isLoggedIn = true;
        this.titleService.title.next("Analyze your Facebook Posts");
    }


    fbLogin(){
        this.fb.fbLogin();
    }

    fbCheckLogin(){
        this.fb.fbCheckLogin().then((res: any) => this.isLoggedIn = res);
    }

    getClassifications(){
        this.loadingClassifications = true;
        if(!this.messages) {
            this.fb.fbGetAllPages("/me/posts", "GET", "message",1).then((resp: FeedMessages)=> {
                this.parseFeedMessages(resp);
            });
        }
    }

    parseFeedMessages(feed: FeedMessages){
        this.messages = feed.data
            .map((val: {message:string})=> val.message)
            .filter((val) => typeof val !== "undefined");
        this.uClassify.ucPost("Sentiment", "uClassify", this.messages,this.action)
            .subscribe(
                (val: Array<UcReply>) => {
                    console.log(val);
                    this.classifications = val;
                    this.loadingClassifications = false;
                    this.displayClassifications = this.messages.map((message: string, index: number) => {
                        return {message: message,classification: this.classifications[index]};
                    });
                },
                (err) => {
                    this.error = err;
                }
            );
        this.loadingClassifications = false;
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
