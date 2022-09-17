import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ChessComponent } from './chess/chess.component';
import { TempComponent } from './temp/temp.component';

const routes: Routes = [
  { path: '', component: TempComponent },
  { path: 'chess', component: ChessComponent },
];; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
    
}