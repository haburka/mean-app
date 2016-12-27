import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {TitleService} from "./shared/services/title-service.service";
import {ErrorService} from "./error.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app works!';
    sidenavActive = "none";

    constructor(private titleService: TitleService,
                private router: Router,
                private error: ErrorService) {

    }

    ngOnInit() {
        this.titleService.title.subscribe((val) => this.title = val);
        this.router.events.subscribe((val) => {
            this.sidenavActive = "none";
        });
    }
    toggleSidenav(){
        this.sidenavActive = this.sidenavActive === "none" ? "block" : "none";
    }
}
