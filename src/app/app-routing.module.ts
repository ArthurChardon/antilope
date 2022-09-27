import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AccueilComponent } from './accueil/accueil.component';
import { ChessComponent } from './chess/chess.component';
import { TempComponent } from './temp/temp.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'chess', component: ChessComponent, data: {animation: 'isRight'} },
  { path: 'temp', component: TempComponent, data: {animation: 'isLeft'}  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
    
}