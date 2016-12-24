import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class UserDataService {
    messages$ = new BehaviorSubject<Array<string>>([]);
    classes$ = new BehaviorSubject<Array<string>>([]);
  constructor() { }

}
