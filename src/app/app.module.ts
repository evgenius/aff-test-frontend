import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatSlideToggleModule,
         MatInputModule, MatSelectModule,
         MatButtonModule, MatGridListModule,
         MatDialogModule, MatExpansionModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MatchesComponent } from './matches.component';
import { MatchDetailsDialog } from './match-details.component';
import { MatchService } from './match.service';
import { SliderModule } from './modules/slider/slider.module';

@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    MatchDetailsDialog,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatExpansionModule,
    MatDialogModule,
    SliderModule,
  ],
  entryComponents: [
    MatchDetailsDialog,
  ],
  providers: [MatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
