import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import {RouterModule} from "@angular/router";
import {PostsService} from "./posts.service";
import {FbGraphService} from "./fb-graph.service";
import {FacebookService} from "ng2-facebook-sdk";
import { FbPlayComponent } from './fb-play/fb-play.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'fb',
    component: FbPlayComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    FbPlayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [PostsService,FbGraphService,FacebookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
