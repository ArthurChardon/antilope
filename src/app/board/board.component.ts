import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';
import { CasesService } from '../cases.service';
import { PieceComponent } from '../piece/piece.component';
import { Piece } from '../piece/piece';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  cases: number[][] = []
  boardRows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  boardCols = [...Array(8).keys()].map( i => i+1).reverse();

  knightPiece: Piece = {type: 'knight', color: 'white'};
  bishopPiece: Piece = {type: 'bishop', color: 'white'};
  rookPiece: Piece = {type: 'rook', color: 'white'};
  queenPiece: Piece = {type: 'queen', color: 'white'};

  promotion: 'white' | 'black' | 'none' = 'none';

  constructor(private casesServices: CasesService) {}

  ngOnInit(): void {
    this.initCases();
    this.casesServices._promotePawn.subscribe((nb) => {
      this.promoteSet(nb);
    })
  }

  initCases() {
    for(let i = 0; i < 8; i++) {
      this.cases.push([])
      for (let j = 0; j < 8; j++) {
        this.cases[i].push(i*8+j)
      }
    }

  }

  promoteSet(nb: number) {
    var color = this.casesServices.getBoardPiece(nb)?.color;
    this.promotion = color ? color : 'none';
    if(this.promotion != 'none') {
      this.knightPiece.color = this.promotion;
      this.bishopPiece.color = this.promotion;
      this.rookPiece.color = this.promotion;
      this.queenPiece.color = this.promotion;
    }
  }

  promote(choice: Piece["type"]) {
    this.casesServices.setPromoteChoice(choice);
  }

}
