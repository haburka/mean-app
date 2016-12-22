import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class UClassifyAPIService {
  private url: string = "https://api.uclassify.com:443";
  private headers = new Headers();

  constructor(private http: Http) {
    this.headers.append("application", "x-www-form-urlencoded");
    this.headers.append("content-type", "application/json")
  }

  test() {
    return this.ucPost("Sentiment", "uClassify", ["I LIKE TO MOVE IT MOVE IT", "who let the dogs out"]);
  }

  ucPost(classifier: string, username: string, texts: Array<string>) {
    return this.http.post(
      "/api/classify",
      JSON.stringify({classifier: classifier, username: username, texts: texts}),
      {headers: this.headers}
    ).map((res) => res.json());
  }

  exampleReply() {
    return [{
      "textCoverage": 1,
      "classification": [{"className": "negative", "p": 0.52003}, {"className": "positive", "p": 0.47997}]
    }, {
      "textCoverage": 1,
      "classification": [{"className": "negative", "p": 0.709271}, {"className": "positive", "p": 0.290729}]
    }];
  }
}
