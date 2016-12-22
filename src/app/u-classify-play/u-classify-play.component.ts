import { Component, OnInit } from '@angular/core';
import {UClassifyAPIService} from "../u-classify-api.service";
import {UcReply} from "../uc-reply";

@Component({
  selector: 'app-u-classify-play',
  templateUrl: './u-classify-play.component.html',
  styleUrls: ['./u-classify-play.component.css']
})
export class UClassifyPlayComponent implements OnInit {

  res: UcReply = new UcReply();

  constructor(
    private uClassify: UClassifyAPIService
  ) { }

  ngOnInit() {
    this.res.data = this.uClassify.exampleReply();
  }

}
