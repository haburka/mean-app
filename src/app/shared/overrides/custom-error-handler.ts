import {ErrorHandler, NgModule, Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {ErrorService} from "../../error.service";

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    private headers = new Headers();
    constructor(private http: Http,
                private error: ErrorService){
        this.headers.append("application", "x-www-form-urlencoded");
        this.headers.append("content-type", "application/json")
    }
    handleError(error) {
        this.error.error.next(true);
        this.http.post("/api/error",
            JSON.stringify({error: error.message, stack: error.stack}),
            {headers: this.headers})
            .subscribe((val) => {/**/},
                (err) => console.error(err));
    }
}
@NgModule({
    providers: [{provide: ErrorHandler, useClass: CustomErrorHandler}]
})
export class CustomErrorModule {}
