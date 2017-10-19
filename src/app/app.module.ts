import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatCheckboxModule, MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MatchesComponent } from './matches.component';
import { MatchService } from './match.service';

@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  providers: [MatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
