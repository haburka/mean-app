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
import {UcKeyword} from "../uc-keyword";
import {ThemeService} from "../theme.service";

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
    public displayTiles: Array<{color: string, text: string, colspan?: number, rowspan?: number, textColor?: string}> = [];
    public action: string;
    public pink: Array<string>;
    public blueGrey: Array<string>;
    public customText: string;
    constructor(
      private fb: FbGraphService,
      private uClassify: UClassifyAPIService,
      private titleService: TitleService,
      private theme: ThemeService) {
    }

    ngOnInit() {
        this.fb.loggedIn$.subscribe((val)=>this.isLoggedIn = val);
        this.fb.error$.subscribe((val)=>this.error = val);
        this.fbCheckLogin();
        this.titleService.title.next("Analyze your Facebook Posts");
        this.pink = (<any>Object).values(this.theme.pink);
        this.blueGrey = (<any>Object).values(this.theme.blueGrey);
    }


    fbLogin(){
        this.fb.fbLogin();
    }

    fbCheckLogin(){
        this.fb.fbCheckLogin().then((res: any) => this.isLoggedIn = res);
    }

    getClassifications(){
        this.loadingClassifications = true;
        let func;
        if(this.action === "keyword"){
            func = (val) => this.parseKeywords(val);
        } else if (this.action === "classify"){
            func = (val) => this.parseClassifications(val);
        }
        // this.messages = this.uClassify.exampleMessages();
        // this.parseKeywords(this.uClassify.exampleKeyword());
        // return;
        if(this.customText){
            this.parseCustomText(this.customText,func);
        }
        if(!this.messages) {
            this.fb.fbGetAllPages("/me/posts", "GET", "message",1).then((resp: FeedMessages)=> {
                this.parseFeedMessages(resp,func);
            });
        } else {
            func(this.messages);
        }
    }

    parseFeedMessages(feed: FeedMessages, func: any){
        this.messages = feed.data
            .map((val: {message:string})=> val.message)
            .filter((val) => typeof val !== "undefined");
        this.uClassify.ucPost("Sentiment", "uClassify", this.messages,this.action)
            .subscribe(
                (val: Array<UcReply>) => func(val),
                (err) => {
                    this.error = err;
                }
            );
        this.loadingClassifications = false;
    }

    parseCustomText(text: string, func: any){
        this.messages = [text];
        this.uClassify.ucPost("Sentiment", "uClassify", this.messages,this.action)
            .subscribe(
                (val: Array<UcReply>) => func(val),
                (err) => {
                    this.error = err;
                }
            );
        this.loadingClassifications = false;
    }

    parseKeywords(val: Array<Array<UcKeyword>>){
        this.loadingClassifications = false;
        this.displayTiles = [];
        this.messages.forEach((message: string, index: number) => {
            let keywords = val[index];
            if(keywords.length === 0){
                this.displayTiles.push({ color: "white", text: message, colspan: 2, rowspan: 2});
                this.displayTiles.push({ color: "white", text: "No keywords were found for this message", colspan: 1, rowspan: 2});
            } else if (keywords.length === 1){
                let keyword = keywords[0];
                this.displayTiles.push({ color: "white", text: message, colspan: 2, rowspan: 2});
                this.displayTiles.push({ color: this.getSentimentColor(keyword), text: this.getKeyWordText(keyword), colspan: 1, rowspan: 2, textColor:'white'});
            } else {
                this.displayTiles.push({ color: "white", text: message, colspan: 2, rowspan: keywords.length });
                keywords.forEach((keyword: UcKeyword) => {
                    this.displayTiles.push({ color: this.getSentimentColor(keyword), text: this.getKeyWordText(keyword), colspan: 1, rowspan: 1, textColor:'white'});
                });
            }
        });
    }

    private getSentimentColor(val: {p: number, className: string, keyword?: string}){
        let color = "white";
        if(val.className === "negative"){
            color = this.theme.mdColor("accent",val.p * 100 * 10);
        } else if(val.className === "positive"){
            color = this.theme.mdColor("primary",val.p * 100 * 10);
        }
        return color;
    }

    private getKeyWordText(val: UcKeyword){
        return val.keyword;
    }

    parseClassifications(val: Array<UcReply>){
        this.classifications = val;
        this.loadingClassifications = false;
        this.displayTiles = [];
        this.messages.forEach((message: string, index: number) => {
            this.displayTiles.push({ color: "white", text: message});
            this.classifications[index].classification.forEach((val: {className: string, p: number, keyword: string,}) => {
                this.displayTiles.push({ color: this.getSentimentColor(val), text: Math.round(val.p * 1000) / 10 + "%"});
            });
        });
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
