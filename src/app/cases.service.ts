import { Injectable } from '@angular/core';
import { Piece } from './piece/piece';
import { PieceComponent } from './piece/piece.component';

@Injectable({
  providedIn: 'root'
})
export class CasesService {
  convertCases: string[] = [];
  colorCases: string[] = [];
  pieceCases: (Piece|null)[] = [];

  selectedCase = null; // observable

  constructor() {
    this.initCases();
    this.initPieces();
   }

  private initCases () {
    const lts = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const nbs = [...Array(8).keys()].map( i => i+1).reverse();
    var count = 1;
    var white = true;

    for(var n in nbs) {
      for(var l in lts) {
        this.convertCases.push(lts[l]+nbs[n]);
        
        Math.floor((count - 1) / 8) % 2 == 1 ? white = count % 2 == 0 : white = count % 2 == 1;
        this.colorCases.push(white ? 'white': 'black');

        this.pieceCases.push(null);
        count += 1;
      }
    }
   }

   private initPieces () {
    this.pieceCases[0] = {type: 'rook', color: 'black'};
    this.pieceCases[1] = {type: 'knight', color: 'black'};
    this.pieceCases[2] = {type: 'bishop', color: 'black'};
    this.pieceCases[3] = {type: 'queen', color: 'black'};
    this.pieceCases[4] = {type: 'king', color: 'black'};
    this.pieceCases[5] = {type: 'bishop', color: 'black'};
    this.pieceCases[6] = {type: 'knight', color: 'black'};
    this.pieceCases[7] = {type: 'rook', color: 'black'};

    this.pieceCases[8] = {type: 'pawn', color: 'black'};
    this.pieceCases[9] = {type: 'pawn', color: 'black'};
    this.pieceCases[10] = {type: 'pawn', color: 'black'};
    this.pieceCases[11] = {type: 'pawn', color: 'black'};
    this.pieceCases[12] = {type: 'pawn', color: 'black'};
    this.pieceCases[13] = {type: 'pawn', color: 'black'};
    this.pieceCases[14] = {type: 'pawn', color: 'black'};
    this.pieceCases[15] = {type: 'pawn', color: 'black'};

    this.pieceCases[56] = {type: 'rook', color: 'white'};
    this.pieceCases[57] = {type: 'knight', color: 'white'};
    this.pieceCases[58] = {type: 'bishop', color: 'white'};
    this.pieceCases[59] = {type: 'queen', color: 'white'};
    this.pieceCases[60] = {type: 'king', color: 'white'};
    this.pieceCases[61] = {type: 'bishop', color: 'white'};
    this.pieceCases[62] = {type: 'knight', color: 'white'};
    this.pieceCases[63] = {type: 'rook', color: 'white'};

    this.pieceCases[48] = {type: 'pawn', color: 'white'};
    this.pieceCases[49] = {type: 'pawn', color: 'white'};
    this.pieceCases[50] = {type: 'pawn', color: 'white'};
    this.pieceCases[51] = {type: 'pawn', color: 'white'};
    this.pieceCases[52] = {type: 'pawn', color: 'white'};
    this.pieceCases[53] = {type: 'pawn', color: 'white'};
    this.pieceCases[54] = {type: 'pawn', color: 'white'};
    this.pieceCases[55] = {type: 'pawn', color: 'white'};
   }

  getCaseName (numb: number) {
      return this.convertCases[numb];
   }

  getCaseColor (numb: number) {
    return this.colorCases[numb];
  }

  getPiece (numb: number) {
    return this.pieceCases[numb];
  }

  selectCase (numb: number) {

  }
}
