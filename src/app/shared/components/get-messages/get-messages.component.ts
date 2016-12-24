import {Component, OnInit} from '@angular/core';
import {FbGraphService} from "../../services/fb-graph.service";
import {FeedMessages} from "../../models/feed-messages";
import {BehaviorSubject} from "rxjs";
import {UserDataService} from "../../services/user-data.service";

@Component({
    selector: 'app-get-messages',
    templateUrl: './get-messages.component.html',
    styleUrls: ['./get-messages.component.scss']
})
export class GetMessagesComponent implements OnInit {

    isLoggedIn: boolean;
    customText: string;
    messages: Array<string>;


    constructor(
        private fb: FbGraphService,
        private userData: UserDataService) {
    }

    ngOnInit() {
        this.fb.loggedIn$.subscribe((val) => this.isLoggedIn = val);
        this.userData.messages$.subscribe((val) => this.messages = val);
    }

    getFeedPosts(){
        this.fb.fbGetAllPages("/me/posts", "GET", "message",1).then((resp: FeedMessages)=> {
            this.userData.messages$.next(resp.data
                .map((val: {message: string}) => val.message)
                .filter((val) => typeof val !== "undefined"));
        });
    }

    setCustomText(){
        this.userData.messages$.next([this.customText]);
    }

}
