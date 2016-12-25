import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {BehaviorSubject} from "rxjs";
import {Feed} from "../models/feed";

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
        private http: Http) {
    }

    fbLogin(){
        return this.fbCheckApi((resolve) => this.fbRawLogin(resolve));
    }

    fbRawLogin(resolve: any){
        window['FB'].login((response) => {
            if (response.status === 'connected') {
                this.token = response.accessToken;
                this.loggedIn$.next(true);
                resolve(true);
            } else if (response.status === 'not_authorized') {
                this.loggedIn$.next(false);
                resolve(false);
            } else {
                this.loggedIn$.next(false);
                resolve(false);
            }
        }, {scope: "user_posts"});
    }

    fbCheckLogin(){
        return this.fbCheckApi((resolve) => this.fbRawCheck(resolve));
    }

    fbRawCheck(resolve: any){
        window['FB'].getLoginStatus((response) => {
            if(response.status === "connected"){
                this.loggedIn$.next(true);
                this.token = response.authResponse.accessToken;
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

    fbGetAllPages(path,action,fields,limit){
        this.limit = limit;
        this.numPages = 0;
        return new Promise((resolve,reject) => {
            var totalResp = new Feed();
            this.fbRun(path,action,fields).then((resp: Feed)=>{
                this.handleNextPage(resp,totalResp,resolve,reject);
            });
        });
    }

    getNextPage(prevResp: Feed, totalResp, reject,resolve){
        this.http.get(prevResp.paging.next)
            .map(res => res.json())
            .subscribe((newResp) => {
                this.handleNextPage(newResp,totalResp,resolve,reject);
            });
    }

    private handleNextPage(resp,totalResp,resolve,reject){
        if(resp['error']){
            console.log(resp['error']);
            this.error$.next(JSON.stringify(resp['error']));
            reject(totalResp);
        } else {
            totalResp.data = totalResp.data.concat(resp.data);
            console.log(totalResp,resp);
            if(resp.paging && resp.paging.next && this.limit > this.numPages++){
                this.getNextPage(resp,totalResp,reject,resolve);
            } else {
                resolve(totalResp);
            }
        }
    }

    private fbCheckApi(func: any){
        let attempts = 0;
        return new Promise((resolve,reject)=>{
            if(this.apiLoaded){
                func(resolve);
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
                        func(resolve);
                    }
                },50);
            }
        });
    }

    fbRun(path,action,fields){
        return this.fbCheckApi((resolve) => this.fbRaw(path,action,fields,resolve));
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
