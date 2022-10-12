import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { CardResultsComponent } from './card-results/card-results.component';
import { CardTimelineComponent } from './card-results/card-timeline/card-timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    CardResultsComponent,
    CardTimelineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
