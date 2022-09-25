import { Component, OnInit } from '@angular/core';
import { CasesService } from '../cases.service';
import { Piece } from '../piece/piece';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  colorToMove: 'black' | 'white' = 'white';

  cases: number[][] = []
  boardRows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  boardCols = [...Array(8).keys()].map( i => i+1).reverse();

  knightPiece: Piece = {type: 'knight', color: 'white'};
  bishopPiece: Piece = {type: 'bishop', color: 'white'};
  rookPiece: Piece = {type: 'rook', color: 'white'};
  queenPiece: Piece = {type: 'queen', color: 'white'};

  promotion: 'white' | 'black' | 'none' = 'none';

  constructor(private casesService: CasesService) {}

  ngOnInit(): void {
    this.initCases();
    this.casesService._promotePawn.subscribe((nb) => {
      this.promoteSet(nb);
    });
    this.casesService._colorToMove.subscribe((color) => {
      this.colorToMove = color;
    });
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
    var color = this.casesService.getBoardPiece(nb)?.color;
    this.promotion = color ? color : 'none';
    if(this.promotion != 'none') {
      this.knightPiece.color = this.promotion;
      this.bishopPiece.color = this.promotion;
      this.rookPiece.color = this.promotion;
      this.queenPiece.color = this.promotion;
    }
  }

  promote(choice: Piece["type"]) {
    this.casesService.setPromoteChoice(choice);
  }

}
