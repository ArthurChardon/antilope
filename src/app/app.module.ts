import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CaseComponent } from './case/case.component';
import { BoardComponent } from './board/board.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PieceComponent } from './piece/piece.component';

@NgModule({
  declarations: [
    AppComponent,
    CaseComponent,
    BoardComponent,
    PieceComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
