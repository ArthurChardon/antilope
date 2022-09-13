import { Injectable } from '@angular/core';
import { Piece } from './piece/piece';
import { PieceComponent } from './piece/piece.component';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasesService {
  convertCases: string[] = [];
  colorCases: string[] = [];
  pieceCases: (Piece|null)[] = [];

  selectedCase = new Subject<number>();
  availableCases = new Subject<(string|number)[][]>();
  refreshCases = new Subject<number[]>();

  colorToMove = new Subject<'white' | 'black'>();

  tab120 = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7, -1,
    -1,  8,  9, 10, 11, 12, 13, 14, 15, -1,
    -1, 16, 17, 18, 19, 20, 21, 22, 23, -1,
    -1, 24, 25, 26, 27, 28, 29, 30, 31, -1,
    -1, 32, 33, 34, 35, 36, 37, 38, 39, -1,
    -1, 40, 41, 42, 43, 44, 45, 46, 47, -1,
    -1, 48, 49, 50, 51, 52, 53, 54, 55, -1,
    -1, 56, 57, 58, 59, 60, 61, 62, 63, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
  ]
  tab64 = [
    21, 22, 23, 24, 25, 26, 27, 28,
    31, 32, 33, 34, 35, 36, 37, 38,
    41, 42, 43, 44, 45, 46, 47, 48,
    51, 52, 53, 54, 55, 56, 57, 58,
    61, 62, 63, 64, 65, 66, 67, 68,
    71, 72, 73, 74, 75, 76, 77, 78,
    81, 82, 83, 84, 85, 86, 87, 88,
    91, 92, 93, 94, 95, 96, 97, 98
  ]

  moves_rook=[-10,10,-1,1]
  moves_bishop=[-11,-9,11,9]
  moves_knight=[-12,-21,-19,-8,12,21,19,8]

  constructor() {
    this.initCases();
    this.initPieces();
    this.setupPiecesCustom();
    this.colorToMove.next('black');
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

   private setupPiecesCustom() {
    //this.pieceCases[35] = {type: 'king', color: 'white'};
    //this.pieceCases[36] = {type: 'queen', color: 'white'};
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

  isEmpty (numb: number) {
    return this.getPiece(numb) === null;
  }

  hasEnemyPiece (numb: number, color: 'white' | 'black') {
    var piece = this.getPiece(numb);
    if(piece) {
      return piece.color != color
    }
    return false;
  }

  selectCase (numb: number) {
    this.selectedCase.next(numb);
    this.availableCases.next(this.availableMovesFrom(numb));
  }

  unSelectCase () {
    this.selectedCase.next(-1);
    this.availableCases.next([]);
  }

  pos2_bishop (pos1: number, color: 'white'|'black') {
    var availableMoves: (string|number)[][] = [];
    for(var k of this.moves_bishop) {
      var j = 1;
      while(true) {
        var n = this.tab120[this.tab64[pos1] + (k * j)]
        if(n != -1) { //as we are not out of the board
          if(this.isEmpty(n) || this.hasEnemyPiece(n, color)) {
            availableMoves.push([pos1, n, '']);
          }
        }
        else { // outside the board
          break;
        }
        if(!this.isEmpty(n)) {
          break;
        }
        j = j+1;
      }
    }
    return availableMoves;
  }

  pos2_knight (pos1: number, color: 'white'|'black') {
    var availableMoves: (string|number)[][] = [];
    for(var i of this.moves_knight) {
      var n = this.tab120[this.tab64[pos1] + i]
      if(n != -1) { //as we are not out of the board
        if(this.isEmpty(n) || this.hasEnemyPiece(n, color)) {
          availableMoves.push([pos1, n, '']);
        }
      }
    }
    return availableMoves;
  }

  pos2_rook (pos1: number, color: 'white'|'black') {
    var availableMoves: (string|number)[][] = [];
    for(var k of this.moves_rook) {
      var j = 1;
      while(true) {
        var n = this.tab120[this.tab64[pos1] + (k * j)]
        if(n != -1) { //as we are not out of the board
          if(this.isEmpty(n) || this.hasEnemyPiece(n, color)) {
            availableMoves.push([pos1, n, '']);
          }
        }
        else { // outside the board
          break;
        }
        if(!this.isEmpty(n)) {
          break;
        }
        j = j+1;
      }
    }
    return availableMoves;
  }

  pos2_pawn (pos1: number, color: 'white'|'black') {
    var availableMoves: (string|number)[][] = [];
    if (color === 'white') {
      var n = this.tab120[this.tab64[pos1]-10];
      if(n != -1) {
        if(this.isEmpty(n)) {
          /*
          # If the PAWN has arrived to rank 8 (square 0 to 7), 
                    if(n<8):
                        # it will be promoted
                        liste.append((pos1,n,'q'))
                        liste.append((pos1,n,'r'))
                        liste.append((pos1,n,'n'))
                        liste.append((pos1,n,'b'))
                    else:
                        liste.append((pos1,n,''))*/
          availableMoves.push([pos1, n, '']);
        }
      }
      if(pos1 <=55 && pos1 >= 48) { // first row
        if(this.isEmpty(pos1-8) && this.isEmpty(pos1-16)) {
          availableMoves.push([pos1, pos1-16, '']);
        }
      }

      //Capture upper left
      var n = this.tab120[this.tab64[pos1]-11];
      if(n != -1) {
        if(this.hasEnemyPiece(n, color) /* OU N EST UNE CASE D'EN PASSANT*/) {
                    /*
          # If the PAWN has arrived to rank 8 (square 0 to 7), 
                    if(n<8):
                        # it will be promoted
                        liste.append((pos1,n,'q'))
                        liste.append((pos1,n,'r'))
                        liste.append((pos1,n,'n'))
                        liste.append((pos1,n,'b'))
                    else:
                        liste.append((pos1,n,''))*/
          availableMoves.push([pos1, n, '']);
        }
      }
      //Capture upper right
      var n = this.tab120[this.tab64[pos1]-9];
      if(n != -1) {
        if(this.hasEnemyPiece(n, color) /* OU N EST UNE CASE D'EN PASSANT*/) {
                    /*
          # If the PAWN has arrived to rank 8 (square 0 to 7), 
                    if(n<8):
                        # it will be promoted
                        liste.append((pos1,n,'q'))
                        liste.append((pos1,n,'r'))
                        liste.append((pos1,n,'n'))
                        liste.append((pos1,n,'b'))
                    else:
                        liste.append((pos1,n,''))*/
          availableMoves.push([pos1, n, '']);
        }
      }
    }
    else if (color === 'black') {
      var n = this.tab120[this.tab64[pos1]+10];
      if(n != -1) {
        if(this.isEmpty(n)) {
          /*
          # If the PAWN has arrived to rank 8 (square 0 to 7), 
                    if(n>55):
                        # it will be promoted
                        liste.append((pos1,n,'q'))
                        liste.append((pos1,n,'r'))
                        liste.append((pos1,n,'n'))
                        liste.append((pos1,n,'b'))
                    else:
                        liste.append((pos1,n,''))*/
          availableMoves.push([pos1, n, '']);
        }
      }
      if(pos1 <=15 && pos1 >= 8) { // first row
        if(this.isEmpty(pos1+8) && this.isEmpty(pos1+16)) {
          availableMoves.push([pos1, pos1+16, '']);
        }
      }

      //Capture bottom left
      var n = this.tab120[this.tab64[pos1]+11];
      if(n != -1) {
        if(this.hasEnemyPiece(n, color) /* OU N EST UNE CASE D'EN PASSANT*/) {
                    /*
          # If the PAWN has arrived to rank 8 (square 0 to 7), 
                    if(n>55):
                        # it will be promoted
                        liste.append((pos1,n,'q'))
                        liste.append((pos1,n,'r'))
                        liste.append((pos1,n,'n'))
                        liste.append((pos1,n,'b'))
                    else:
                        liste.append((pos1,n,''))*/
          availableMoves.push([pos1, n, '']);
        }
      }
      //Capture bottom right
      var n = this.tab120[this.tab64[pos1]+9];
      if(n != -1) {
        if(this.hasEnemyPiece(n, color) /* OU N EST UNE CASE D'EN PASSANT*/) {
                    /*
          # If the PAWN has arrived to rank 8 (square 0 to 7), 
                    if(n>55):
                        # it will be promoted
                        liste.append((pos1,n,'q'))
                        liste.append((pos1,n,'r'))
                        liste.append((pos1,n,'n'))
                        liste.append((pos1,n,'b'))
                    else:
                        liste.append((pos1,n,''))*/
          availableMoves.push([pos1, n, '']);
        }
      }
    }
    return availableMoves;
  }

  pos2_king (pos1: number, color: 'white'|'black', isAttacked: boolean) {
    var availableMoves: (string|number)[][] = [];
    for(var i of this.moves_rook.concat(this.moves_bishop)) {
      var n = this.tab120[this.tab64[pos1] + i]
      if(n != -1) { //as we are not out of the board
        if(this.isEmpty(n) || this.hasEnemyPiece(n, color)) {
          availableMoves.push([pos1, n, '']);
        }
      }
    }
    if(isAttacked) {
      return availableMoves;
    }
    // castle moves

    return availableMoves;
  }

  movePiece(pos1: number, pos2: number) {
    if (this.canMoveTo(pos1, pos2)) {
      this.pieceCases[pos2] = this.pieceCases[pos1];
      this.pieceCases[pos1] = null;
      this.refreshCases.next([pos1, pos2]);
      this.unSelectCase();
    }
  }

  availableMovesFrom(pos: number) {
    var piece = this.getPiece(pos);
    if(piece) {
      switch(piece.type) { 
        case 'pawn': { 
          return this.pos2_pawn(pos, piece.color); 
        } 
        case 'rook': { 
          return this.pos2_rook(pos, piece.color); 
        } 
        case 'knight': { 
          return this.pos2_knight(pos, piece.color); 
        } 
        case 'bishop': { 
          return this.pos2_bishop(pos, piece.color); 
        } 
        case 'queen': { 
          return this.pos2_rook(pos, piece.color).concat(this.pos2_bishop(pos, piece.color)); 
        } 
        case 'king': { 
          return this.pos2_king(pos, piece.color, false); // à changer le booléen asap
        } 
        default: { 
          return [];
        } 
      } 
    }
    return [];
  }

  canMoveTo(pos1: number, pos2: number) {
    for (var k of this.availableMovesFrom(pos1)) {
      if (k[1] === pos2) {
        return true;
      }
    }
    return false;
  }
}
