import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../shared/services/user-data.service";
import {TitleService} from "../shared/services/title-service.service";

@Component({
  selector: 'app-mood-classification',
  templateUrl: './mood-classification.component.html',
  styleUrls: ['./mood-classification.component.scss']
})
export class MoodClassificationComponent implements OnInit {
    readyToParse: boolean = false;

    constructor(
        private userData: UserDataService,
        private title: TitleService) {
    }

    ngOnInit() {
        this.userData.messages$.subscribe((val) => {
            this.readyToParse = true;
        });
        this.title.next("Mood Classification");
    }
}
