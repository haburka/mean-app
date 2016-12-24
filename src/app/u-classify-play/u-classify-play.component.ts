import { Component, OnInit } from '@angular/core';
import {UcReply} from "../shared/models/uc-reply";
import {UClassifyAPIService} from "../shared/services/u-classify-api.service";

@Component({
  selector: 'app-u-classify-play',
  templateUrl: './u-classify-play.component.html',
  styleUrls: ['./u-classify-play.component.css']
})
export class UClassifyPlayComponent implements OnInit {

  res: Array<UcReply> = [];

  constructor(
    private uClassify: UClassifyAPIService
  ) { }

  ngOnInit() {
    // this.res = this.uClassify.exampleClassify();
  }

}
