import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class TitleService {
    title = new BehaviorSubject<string>("App Works");
  constructor() { }
}
