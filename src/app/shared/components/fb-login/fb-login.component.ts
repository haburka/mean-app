import {Component, OnInit} from '@angular/core';
import {FbGraphService} from "../../services/fb-graph.service";

@Component({
    selector: 'app-fb-login',
    templateUrl: './fb-login.component.html',
    styleUrls: ['./fb-login.component.scss']
})
export class FbLoginComponent implements OnInit {

    loggedIn: boolean;
    error: string;
    fbError: string;
    errorString = "I couldn't login to facebook... Sorry." +
        " You can still classify text that you cut and paste into the app though!";
    constructor(private fb: FbGraphService) {
    }

    ngOnInit() {
        this.fb.fbCheckLogin().then((res: any) => {});
        this.fb.loggedIn$.subscribe((val) => {
            if(val === false){
                this.loggedIn = false;
            } else {
                this.loggedIn = true;
                this.error = undefined;
            }
        });
        this.fb.error$.subscribe((val)=>this.fbError = val);
    }

    fbLogin() {
        this.fb.fbLogin().then((res: any) => res === false ? this.error = this.errorString: this.error = undefined);
    }
}
