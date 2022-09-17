import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { CaseComponent } from './chess/case/case.component';
import { BoardComponent } from './chess/board/board.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PieceComponent } from './chess/piece/piece.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CasesService } from './chess/cases.service';
import { ChessComponent } from './chess/chess.component';
import { TempComponent } from './temp/temp.component';
import { NiceCardComponent } from './nice-card/nice-card.component';


@NgModule({
  declarations: [
    AppComponent,
    CaseComponent,
    BoardComponent,
    PieceComponent,
    ChessComponent,
    TempComponent,
    NiceCardComponent
  ],
  imports: [
    AppRoutingModule,
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
