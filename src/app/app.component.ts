import { Component } from '@angular/core';
import {TitleService} from "./title-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  constructor(private titleService: TitleService,
  private router: Router){

  }
  ngOnInit(){
      this.titleService.title.subscribe((val)=>this.title=val)
  }

  goToFb(){
      this.router.navigateByUrl("/fb");
  }
  goToPrivacy(){
      this.router.navigateByUrl("/privacy");

  }
}
