import {BrowserModule} from "@angular/platform-browser";
import {NgModule, ErrorHandler} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule, Http} from "@angular/http";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {FbPlayComponent} from "./fb-play/fb-play.component";
import {UClassifyPlayComponent} from "./u-classify-play/u-classify-play.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {MaterialModule} from "@angular/material";
import {CustomClassificationComponent} from "./custom-classification/custom-classification.component";
import {SentimentClassificationComponent} from "./sentiment-classification/sentiment-classification.component";
import {MoodClassificationComponent} from "./mood-classification/mood-classification.component";
import {LargeNumberPipe} from "./shared/pipes/large-number.pipe";
import {ClassifierComponent} from "./shared/components/classifier/classifier.component";
import {FbGraphService} from "./shared/services/fb-graph.service";
import {UClassifyAPIService} from "./shared/services/u-classify-api.service";
import {UserDataService} from "./shared/services/user-data.service";
import {ThemeService} from "./shared/services/theme.service";
import {TitleService} from "./shared/services/title-service.service";
import {GetMessagesComponent} from "./shared/components/get-messages/get-messages.component";
import {FbLoginComponent} from "./shared/components/fb-login/fb-login.component";
import {TruncatePipe} from "./shared/pipes/truncate.pipe";
import {CustomErrorModule} from "./shared/overrides/custom-error-handler";
import {ErrorService} from "./error.service";

const ROUTES = [
    {
        path: 'privacy',
        component: PrivacyPolicyComponent
    },
    {
        path: 'fb',
        component: FbPlayComponent
    },
    {
        path: 'sentiment',
        component: SentimentClassificationComponent
    },
    {
        path: 'mood',
        component: MoodClassificationComponent
    },
    {
        path: 'custom-classification',
        component: CustomClassificationComponent
    }
];


@NgModule({
    declarations: [
        AppComponent,
        FbPlayComponent,
        UClassifyPlayComponent,
        PrivacyPolicyComponent,
        LargeNumberPipe,
        CustomClassificationComponent,
        SentimentClassificationComponent,
        MoodClassificationComponent,
        ClassifierComponent,
        GetMessagesComponent,
        FbLoginComponent,
        TruncatePipe,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES), // Add routes to the app
        MaterialModule.forRoot(),
        CustomErrorModule
    ],
    providers: [
        FbGraphService,
        UClassifyAPIService,
        TitleService,
        ThemeService,
        UserDataService,
        ErrorService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
