import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CaseComponent } from './case/case.component';
import { BoardComponent } from './board/board.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PieceComponent } from './piece/piece.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CasesService } from './cases.service';


@NgModule({
  declarations: [
    AppComponent,
    CaseComponent,
    BoardComponent,
    PieceComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [CasesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
