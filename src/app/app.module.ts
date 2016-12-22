import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {PostsComponent} from "./posts/posts.component";
import {RouterModule} from "@angular/router";
import {PostsService} from "./posts.service";
import {FbGraphService} from "./fb-graph.service";
import {FbPlayComponent} from "./fb-play/fb-play.component";
import {UClassifyAPIService} from "./u-classify-api.service";
import {UClassifyPlayComponent} from "./u-classify-play/u-classify-play.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {MaterialModule} from "@angular/material";

const ROUTES = [
    {
        path: 'privacy',
        component: PrivacyPolicyComponent
    },
    {
        path: 'posts',
        component: PostsComponent
    },
    {
        path: 'fb',
        component: FbPlayComponent
    },
    {
        path: 'uClassify',
        component: UClassifyPlayComponent
    }
];


@NgModule({
    declarations: [
        AppComponent,
        PostsComponent,
        FbPlayComponent,
        UClassifyPlayComponent,
        PrivacyPolicyComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES), // Add routes to the app
        MaterialModule.forRoot()
    ],
    providers: [
      PostsService,
      FbGraphService,
      UClassifyAPIService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
