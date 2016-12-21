import {Injectable} from '@angular/core';
import {FacebookService, FacebookLoginResponse, FacebookInitParams} from 'ng2-facebook-sdk';
import {Feed} from "./feed";
import {Http} from "@angular/http";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class FbGraphService {
    public token: string;
    public response: any;
    public error$ = new BehaviorSubject<string>("");
    private apiLoaded: boolean = false;
    private limit: number = 3;
    private numPages: number = 0;
    public loggedIn$ = new BehaviorSubject<boolean>(false);
    constructor(
        private fb: FacebookService,
        private http: Http) {
    }

    fbInit() {
        let fbParams: FacebookInitParams = {
            appId: '234460410311790',
            xfbml: true,
            version: 'v2.8'
        };
    }

    fbLogin(){
        window['FB'].login((response) => {
            console.log(response);
            if (response.status === 'connected') {
                this.token = response.accessToken;
                this.loggedIn$.next(true);
                // Logged into your app and Facebook.
            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
            }
        }, {scope: 'user_posts'});
    }

    fbCheckLogin(){
        let attempts = 0;
        return new Promise((resolve,reject)=>{
            if(this.apiLoaded){
                this.fbRawCheck(resolve)
            } else {
                let int = setInterval(()=>{
                    if(!window['FB'] || !window['FB'].api){
                        attempts++;
                        if(attempts > 20) {
                            reject();
                        }
                    } else{
                        this.apiLoaded = true;
                        //noinspection TypeScriptUnresolvedFunction
                        clearInterval(int);
                        this.fbRawCheck(resolve);
                    }
                },50);
            }
        });
    }

    fbRawCheck(resolve: any){
        window['FB'].getLoginStatus((response) => {
            if(response.status === "connected"){
                this.loggedIn$.next(true);
                this.token = response.authResponse.accessToken;
            }
            console.log(response);
            resolve(response);
        });
    }

    fbGetAllPages(path,action,fields,limit){
        this.limit = limit;
        this.numPages = 0;
        return new Promise((resolve,reject) => {
            var totalResp = new Feed();
            this.fbRun(path,action,fields).then((resp: Feed)=>{
                if(resp['error']){
                    console.log(resp['error']);
                    this.error$.next(JSON.stringify(resp['error']));
                    reject(totalResp);
                } else {
                    totalResp.data = resp.data;
                    if(resp.paging && resp.paging.next && this.limit > this.numPages++) {
                        this.getNextPage(resp, totalResp, reject, resolve);
                    } else {
                        resolve(totalResp);
                    }
                }
            });
        });
    }

    getNextPage(prevResp: Feed, totalResp, reject,resolve){
        this.http.get(prevResp.paging.next)
            .map(res => res.json())
            .subscribe((newResp) => {
                if(newResp['error']){
                    console.log(newResp['error']);
                    this.error$.next(JSON.stringify(newResp['error']));
                    reject(totalResp);
                } else {
                    totalResp.data = totalResp.data.concat(newResp.data);
                    console.log(totalResp,newResp);
                    if(newResp.paging && newResp.paging.next && this.limit > this.numPages++){
                        this.getNextPage(newResp,totalResp,reject,resolve);
                    } else {
                        resolve(totalResp);
                    }
                }
            });
    }

    fbRun(path,action,fields){
        let attempts = 0;
        return new Promise((resolve,reject)=>{
            if(this.apiLoaded){
                this.fbRaw(path,action,fields,resolve);
            } else {
                let int = setInterval(()=>{
                    if(!window['FB'] || !window['FB'].api){
                        attempts++;
                        if(attempts > 20) {
                            reject();
                        }
                    } else{
                        this.apiLoaded = true;
                        //noinspection TypeScriptUnresolvedFunction
                        clearInterval(int);
                        this.fbRaw(path,action,fields,resolve);
                    }
                },50);
            }
        });
    }

    private fbRaw(path,action,fields,resolve){
        window['FB'].api(
            path,
            action,
            {"access_token":this.token,"fields": fields},
            (response: any) => {
                this.response = response;
                resolve(response);
            }
        );
    }
}
