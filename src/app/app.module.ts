import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchedulePanelComponent } from './schedule-panel/schedule-panel.component';
import { MainConfigComponent } from './main-config/main-config.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { SongsListComponent } from './songs-list/songs-list.component';
import { SearchPipe } from './search.pipe';
import { SongPreviewComponent } from './song-preview/song-preview.component';
import { VerseListComponent } from './verse-list/verse-list.component';
import { VersePreviewComponent } from './verse-preview/verse-preview.component';
import { RemoveNewLinePipe } from './remove-new-line.pipe';
import { ReplaceNewLinePipe } from './replace-new-line.pipe';
import { LivePanelComponent } from './live-panel/live-panel.component';
import { LiveScreenComponent } from './live-screen/live-screen.component';
import { LiveScreenHandlersComponent } from './live-screen-handlers/live-screen-handlers.component';
import { NewSongComponent } from './new-song/new-song.component';
import { BibleComponent } from './bible/bible.component';
import { UserConfigComponent } from './user-config/user-config.component';
import { LoginComponent } from './login/login.component';
import { UserLoggedIn } from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SchedulePanelComponent,
    MainConfigComponent,
    ScheduleListComponent,
    SongsListComponent,
    SearchPipe,
    SongPreviewComponent,
    VerseListComponent,
    VersePreviewComponent,
    RemoveNewLinePipe,
    ReplaceNewLinePipe,
    LivePanelComponent,
    LiveScreenComponent,
    LiveScreenHandlersComponent,
    NewSongComponent,
    BibleComponent,
    UserConfigComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    HttpClientModule
  ],
  providers: [UserLoggedIn],
  bootstrap: [AppComponent]
})
export class AppModule { }
