import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AccueilComponent } from './accueil/accueil.component';
import { ChessComponent } from './chess/chess.component';
import { TempComponent } from './temp/temp.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'chess', component: ChessComponent },
  { path: 'temp', component: TempComponent },
];; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
    
}