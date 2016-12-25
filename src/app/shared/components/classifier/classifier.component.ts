import {Component, OnInit, Input} from '@angular/core';
import {UcReply} from "../../models/uc-reply";
import {Tile} from "../../models/tile";
import {UClassifyAPIService} from "../../services/u-classify-api.service";
import {ThemeService} from "../../services/theme.service";
import {UcKeyword} from "../../models/uc-keyword";
import {UserDataService} from "../../services/user-data.service";

@Component({
    selector: 'app-classifier',
    templateUrl: './classifier.component.html',
    styleUrls: ['./classifier.component.scss']
})
export class ClassifierComponent implements OnInit {
    public messages: Array<string>;
    @Input() username: string;
    @Input() classifier: string;
    @Input() readyToParse: boolean;
    public classes: Array<string> = [];
    public error: string;
    public loadingClassifications = false;
    public classesFound: boolean;
    public classifications: Array<UcReply>;
    public displayTiles: Array<Tile> = [];
    public action: string;
    public pink: Array<string>;
    public blueGrey: Array<string>;
    public maxText: number = 20;

    constructor(private uClassify: UClassifyAPIService,
                private theme: ThemeService,
                private userData: UserDataService) {
    }

    ngOnInit() {
        this.maxText = window.innerWidth / 12;
        this.pink = (<any>Object).values(this.theme.pink);
        this.blueGrey = (<any>Object).values(this.theme.blueGrey);
        this.userData.messages$.subscribe((val) => this.messages = val);
    }

    getClassifications() {
        this.loadingClassifications = true;
        this.uClassifyPost();
    }

    uClassifyPost() {
        this.uClassify.ucPost(this.classifier, this.username, this.messages, this.action)
            .subscribe(
                (val: any) => {
                    this.pickAction(val);
                    this.loadingClassifications = false;
                }
                , (err) => this.error = err
            );
    }

    pickAction(val) {
        if (this.action === "keywords") {
            this.parseKeywords(val);
        } else if (this.action === "classify") {
            this.parseClassifications(val);
        }
    }

    parseKeywords(val: Array<Array<UcKeyword>>) {
        this.setClassesFromKeywords(val);
        this.loadingClassifications = false;
        this.displayTiles = [];
        this.messages.forEach((message: string, index: number) => {
            let keywords = val[index];
            if (keywords.length === 0) {
                this.displayTiles.push({color: "white", text: message, colspan: 2, rowspan: 2});
                this.displayTiles.push({
                    color: "white",
                    text: "No keywords were found for this message",
                    colspan: 1,
                    rowspan: 2,
                    textColor: "black"
                });
            } else if (keywords.length === 1) {
                let keyword = keywords[0];
                this.displayTiles.push({color: "white", text: message, colspan: 2, rowspan: 2});
                this.displayTiles.push({
                    color: this.getCertaintyColor(keyword),
                    text: this.getKeyWordText(keyword),
                    colspan: 1,
                    rowspan: 2,
                    textColor: 'white'
                });
            } else {
                this.displayTiles.push({color: "white", text: message, colspan: 2, rowspan: keywords.length});
                keywords.forEach((keyword: UcKeyword) => {
                    this.displayTiles.push({
                        color: this.getCertaintyColor(keyword),
                        text: this.getKeyWordText(keyword),
                        colspan: 1,
                        rowspan: 1,
                        textColor: 'white'
                    });
                });
            }
        });
    }

    parseClassifications(val: Array<UcReply>) {
        this.setClassesFromClassification(val);
        this.classifications = val;
        this.loadingClassifications = false;
        this.displayTiles = [];
        this.messages.forEach((message: string, index: number) => {
            this.displayTiles.push({color: "white", text: message});
            this.classifications[index].classification.forEach((val: {className: string, p: number, keyword: string,}) => {
                this.displayTiles.push({color: this.getCertaintyColor(val), text: Math.round(val.p * 1000) / 10 + "%"});
            });
        });
    }


    private getCertaintyColor(val: {p: number, className: string, keyword?: string}) {
        let color = "white";
        if (val.className === this.classes[1]) {
            color = this.theme.mdColor("accent", val.p * 100 * 10);
        } else if (val.className === this.classes[0]) {
            color = this.theme.mdColor("primary", val.p * 100 * 10);
        }
        return color;
    }

    private getKeyWordText(val: UcKeyword) {
        return val.keyword;
    }

    private setClassesFromClassification(val: Array<UcReply>) {
        let classification = val[0].classification;
        this.classes[0] = classification[0].className;
        this.classes[1] = classification[1].className;
        this.classesFound = true;
    }

    private setClassesFromKeywords(val: Array<Array<UcKeyword>>) {
        //[
        // [{"className":"positive","p":0.604174,"keyword":"world"},{"className":"positive","p":0.713866,"keyword":"love"}]]
        let classes = val.filter((filter) => filter.length > 1);
        for (let i = 0; i < classes.length; i++) {
            let replyArray = classes[i];
            let className = replyArray[0].className;
            let otherClassNames = replyArray.filter((reply) => reply.className !== className);
            if(otherClassNames.length > 0){
                this.classes[0] = className;
                this.classes[1] = otherClassNames[0].className;
                this.classesFound = true;
                return;
            }
        }
        this.classesFound = false;
    }


}
