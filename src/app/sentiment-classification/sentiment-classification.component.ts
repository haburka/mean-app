import {Component, OnInit} from '@angular/core';
import {UserDataService} from "../shared/services/user-data.service";
import {TitleService} from "../shared/services/title-service.service";

@Component({
    selector: 'app-sentiment-classification',
    templateUrl: './sentiment-classification.component.html',
    styleUrls: ['./sentiment-classification.component.scss']
})
export class SentimentClassificationComponent implements OnInit {
    readyToParse: boolean = false;

    constructor(
        private userData: UserDataService,
        private title: TitleService) {
    }

    ngOnInit() {
        this.userData.messages$.subscribe((val) => {
            this.readyToParse = true;
        });
        this.title.next("Sentiment Classification");
    }
}
