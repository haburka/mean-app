import { Component, OnInit } from '@angular/core';
import {UClassifyAPIService} from "../shared/services/u-classify-api.service";
import {Tile} from "../shared/models/tile";
import {UcInfo} from "../shared/models/uc-info";
import {TitleService} from "../shared/services/title-service.service";
import {UserDataService} from "../shared/services/user-data.service";

@Component({
  selector: 'app-custom-classification',
  templateUrl: './custom-classification.component.html',
  styleUrls: ['./custom-classification.component.scss']
})
export class CustomClassificationComponent implements OnInit {

    public username: string;
    public classifier: string;
    public error: string;
    public classifierInfo: Array<Tile> = [];
    public readyToParse: boolean = false;

    constructor(
      private uClassify: UClassifyAPIService,
      private title: TitleService,
      private userData: UserDataService
  ) { }

  ngOnInit() {
        this.title.title.next("Pick your Classifier");
  }

    checkClassifier(){
        this.uClassify.ucGetInfo(this.classifier, this.username)
            .subscribe(
                (val: any) => this.parseClassifierInfo(val),
                (err) => {
                    this.error = err;
                }
            );
    }
    parseClassifierInfo(result: Array<UcInfo>){
        if(result["statusCode"] || result["message"]){
            this.error = "Error while looking for classifier." + result["message"] + " returned with a status code of: " +result["statusCode"];
            return;
        }
        result.forEach((val: UcInfo) => {
            this.classifierInfo.push({color: "white", text: val.className, colspan: 6, rowspan: 1});
            this.classifierInfo.push({color: "white", text: ""+val.totalCount, colspan: 3, rowspan: 1}); //""+ converts to string
            this.classifierInfo.push({color: "white", text: ""+val.uniqueFeatures, colspan: 3, rowspan: 1});
        });
    }

}
