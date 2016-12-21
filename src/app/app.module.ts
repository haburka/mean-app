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

const ROUTES = [
    {
        path: '',
        redirectTo: 'FbPlayComponent',
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
    providers: [PostsService, FbGraphService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
