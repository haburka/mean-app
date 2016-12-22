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

    ucPost(classifier: string, username: string, texts: Array<string>,action: string) {
        return this.http.post(
            "/api/classify",
            JSON.stringify({classifier: classifier, username: username, texts: texts, action: action}),
            {headers: this.headers}
        ).map((res) => res.json());
    }

    exampleClassify() {
        return [{
            "textCoverage": 1,
            "classification": [
                {"className": "negative", "p": 0.52003, "keyword": "idk"},
                {"className": "positive", "p": 0.47997, "keyword": "idk"}
            ],
        }, {
            "textCoverage": 1,
            "classification": [
                {"className": "negative", "p": 0.709271, "keyword": "idk"},
                {"className": "positive", "p": 0.290729, "keyword": "idk"}
            ],
            "keyword": "idk"
        }];
    }

    exampleKeyword() {
        return [[{"className": "positive", "p": 0.604174, "keyword": "world"}, {
            "className": "positive",
            "p": 0.605051,
            "keyword": "senses"
        }, {"className": "positive", "p": 0.608954, "keyword": "must"}, {
            "className": "positive",
            "p": 0.642547,
            "keyword": "strengthen"
        }, {"className": "positive", "p": 0.606495, "keyword": "expand"}], [], [{
            "className": "negative",
            "p": 0.677781,
            "keyword": "625"
        }], [{"className": "negative", "p": 0.609804, "keyword": "not"}], [{
            "className": "negative",
            "p": 0.684732,
            "keyword": "total"
        }, {"className": "negative", "p": 0.717512, "keyword": "12-12"}, {
            "className": "positive",
            "p": 0.781353,
            "keyword": "thank"
        }], [{"className": "negative", "p": 0.633866, "keyword": "completely"}, {
            "className": "positive",
            "p": 0.656347,
            "keyword": "frameworks"
        }, {"className": "negative", "p": 0.810726, "keyword": "errors"}, {
            "className": "negative",
            "p": 0.983871,
            "keyword": "npm"
        }, {"className": "negative", "p": 0.664996, "keyword": "install"}], [{
            "className": "negative",
            "p": 0.65507,
            "keyword": "problem"
        }, {"className": "positive", "p": 0.672534, "keyword": "angular"}, {
            "className": "positive",
            "p": 0.662835,
            "keyword": "github"
        }, {"className": "positive", "p": 0.806707, "keyword": "amazing"}], [{
            "className": "positive",
            "p": 0.608954,
            "keyword": "must"
        }, {"className": "negative", "p": 0.609804, "keyword": "not"}, {
            "className": "positive",
            "p": 0.623467,
            "keyword": "each"
        }, {"className": "negative", "p": 0.706821, "keyword": "hateful"}, {
            "className": "negative",
            "p": 0.646516,
            "keyword": "hurt"
        }], [{"className": "positive", "p": 0.605078, "keyword": "music"}], [{
            "className": "negative",
            "p": 0.63255,
            "keyword": "ended"
        }, {"className": "negative", "p": 0.651613, "keyword": "spent"}]]
    }
}
