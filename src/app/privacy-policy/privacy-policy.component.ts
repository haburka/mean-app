import { Component, OnInit } from '@angular/core';
import {TitleService} from "../title-service.service";

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private title: TitleService) { }

  ngOnInit() {
      this.title.title.next("Privacy Policy");
  }

}
