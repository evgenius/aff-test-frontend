import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatSlideToggleModule,
         MatButtonModule, MatGridListModule,
         MatExpansionModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MatchesComponent } from './matches.component';
import { MatchService } from './match.service';
import { SliderModule } from './modules/slider/slider.module';

@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatExpansionModule,
    SliderModule,
  ],
  providers: [MatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
