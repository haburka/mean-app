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
    constructor(private fb: FbGraphService) {
    }

    ngOnInit() {
        this.fb.loggedIn$.subscribe((val) => {
            this.loggedIn = val;
            this.error = undefined;
        });
    }


    fbLogin() {
        this.fb.fbLogin();
        setTimeout(() => {
            if(this.fb.loggedIn$.getValue() === false){
                this.error = "I couldn't login to facebook... Sorry." +
                    " You can still classify text that you cut and paste into the app though!";
            }
        }, 50000);
    }
}
