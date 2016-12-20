import {Injectable} from '@angular/core';
import {FacebookService, FacebookLoginResponse, FacebookInitParams} from 'ng2-facebook-sdk';

@Injectable()
export class FbGraphService {
    public token: string = "EAACEdEose0cBAAaE4eJdolMgonRuDy8Sqnn6KAvbCW5JKYihOEtIr5Vk8yo7UCckv1ShC0y0uZAQhRvpedIJ2FJc3ADBtJw4C6Fzhpe1aX6EMqgwQV48E5DJLKLS6DbbSK1ZCXAuRAYLC4OWrDgCqNlg9C3qFb7a7xDST9MQZDZD";
    public response: any;

    constructor(private fb: FacebookService) {
    }

    fbInit() {
        let fbParams: FacebookInitParams = {
            appId: '234460410311790',
            xfbml: true,
            version: 'v2.8'
        };
    }

    fbSample() {
        let int = setInterval(()=>{
            if(!window['FB'].api){
                console.log("Fb not loaded");
            } else {
                clearInterval(int);
                this.fbRun();
            }
        },250);
    }

    fbRun(){
        window['FB'].api(
            '/me',
            'GET',
            {"access_token":this.token,"fields": "friends{first_name}"},
            (response) => {
                this.response = response;
                console.log(response);
            }
        );
    }
}
