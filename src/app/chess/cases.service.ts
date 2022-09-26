import { Injectable } from '@angular/core';
import { Piece } from './piece/piece';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasesService {
  convertCases: string[] = [];
  colorCases: string[] = [];
  pieceCases: (Piece|null)[] = [];

  enPassant: number = -1;

  endTurn = new Subject<string>();

  selectedCase = new Subject<number>();
  availableCases = new Subject<[number,number,string][]>();
  refreshCases = new Subject<number[]>();

  colorToMove :'white' | 'black' = 'white';
  _colorToMove = new Subject<('white' | 'black')>();

  movesPlayed: string[] = [];
  _movePlayed = new Subject<string>();

  piecesCaptured: Piece[][] = [[],[]];
  _pieceCaptured = new Subject<Piece>();

  possibleMoves: number[] = [];

  whiteAttackedCases: number[] = [];
  blackAttackedCases: number[] = [];
  _whiteAttackedCases = new Subject<number[]>();
  _blackAttackedCases = new Subject<number[]>();

  whiteCheck = false;
  blackCheck = false;
  _whiteCheck = new Subject<boolean>();
  _blackCheck = new Subject<boolean>();

  whiteCanOOO = true;
  whiteCanOO = true;
  blackCanOOO = true;
  blackCanOO = true;

  _promotePawn = new Subject<number>();
  nbPromote: number = -1;
  nbPromoteFrom: number = -1;
  _promoteChoice = new Subject<Piece["type"]>();
  promotionWait = false;
  choiceSubscription: Subscription | null = null;

  _ggEnd = new Subject<'black' | 'white' | 'pat' | 'none'>(); //stores the winner

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
    //this.setupPiecesCustom();

    this.endTurn.subscribe((move) => {
      this.endMove(move);
    });
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
    // this.pieceCases[35] = {type: 'king', color: 'white'};
    // this.pieceCases[12] = {type: 'king', color: 'black'};
    // //this.pieceCases[35] = {type: 'king', color: 'white'};
    // this.pieceCases[36] = {type: 'queen', color: 'white'};
    // this.pieceCases[36] = {type: 'pawn', color: 'white'};
     this.pieceCases[12] = {type: 'pawn', color: 'white'};
     this.pieceCases[13] = {type: 'pawn', color: 'white'};
     this.pieceCases[41] = {type: 'pawn', color: 'black'};
  }

  getCaseName (numb: number) {
      return this.convertCases[numb];
  }

  getCaseColor (numb: number) {
    return this.colorCases[numb];
  }

  getBoardPiece (numb: number) {
    return this.pieceCases[numb];
  }

  getPiece (numb: number, cases: (Piece|null)[]) {
    return cases[numb];
  }

  isEmpty (numb: number, cases: (Piece|null)[]) {
    return this.getPiece(numb, cases) === null;
  }

  hasEnemyPiece (numb: number, color: 'white' | 'black', cases: (Piece|null)[]) { // color of the player, numb of the case to be checked in cases
    var piece = this.getPiece(numb, cases);
    if(piece) {
      return piece.color != color
    }
    return false;
  }

  selectCase (numb: number) {
    this.selectedCase.next(numb);
    this.availableCases.next(this.availableMovesFrom(numb, this.pieceCases));
  }

  unSelectCase () {
    this.selectedCase.next(-1);
    this.availableCases.next([]);
  }

  movePiece(pos1: number, pos2: number) {
    var canMove = this.canMoveTo(pos1, pos2);
    if (canMove[0]) {
      var piece = this.getPiece(pos1, this.pieceCases);
      var piece2 = this.pieceCases[pos2]
      var newMove = '';
      this.enPassant = -1;

      if(piece) {
        if(canMove[1] != '') { // special move
          switch(canMove[1]) {
            case 'OO': {
              this.pieceCases[pos2] = this.pieceCases[pos1];
              this.pieceCases[pos1] = null;
              this.pieceCases[pos2-1] = this.pieceCases[pos2+1];
              this.pieceCases[pos2+1] = null;

              this.refreshCases.next([pos1, pos2, pos2-1, pos2+1]);
              newMove = 'O-O';
              this.endTurn.next(newMove);
              break;
            }
            case 'OOO': {
              this.pieceCases[pos2] = this.pieceCases[pos1];
              this.pieceCases[pos1] = null;
              this.pieceCases[pos2+1] = this.pieceCases[pos2-2];
              this.pieceCases[pos2-2] = null;

              this.refreshCases.next([pos1, pos2, pos2+1, pos2-2]);
              newMove = 'O-O-O';
              this.endTurn.next(newMove);
              break;
            }

            case 'prom' : { // convert a pawn
              console.log('convert', pos1);
              this._promotePawn.next(pos1);
              this.nbPromote = pos2;
              this.nbPromoteFrom = pos1;
              this.promotionWait = true;
              this.choiceSubscription = this._promoteChoice.subscribe((type) => {
                this.promoteTo(type);
              })            
              break;
            }

            case '2pawn' : {
              this.pieceCases[pos2] = this.pieceCases[pos1];
              this.pieceCases[pos1] = null;
              this.enPassant = (pos1+pos2)/2;
              this.refreshCases.next([pos1, pos2]);
              newMove = this.getCaseName(pos2);
              this.endTurn.next(newMove);
              break;
            }

            case 'ep' : {
              this.pieceCases[pos2] = this.pieceCases[pos1];
              this.pieceCases[pos1] = null;
              var posPawn2 = piece.color === 'white' ? 8 : -8;
              var pawn2 = this.pieceCases[pos2+posPawn2]
              if(pawn2) {
                this.eliminatePiece(pawn2);
              }
              this.pieceCases[pos2+posPawn2] = null;
              this.enPassant = (pos1+pos2)/2;
              this.refreshCases.next([pos1, pos2, pos2+posPawn2]);
              newMove = this.getCaseName(pos1).slice(0,1)+'x'+this.getCaseName(pos2);
              this.endTurn.next(newMove);
              break;
            }
          }
        }
        else { // classic move
          var captNotation = '';
  
          if(piece2) {
            this.eliminatePiece(piece2);
            captNotation = 'x';
          }
          newMove = this.textFromPiece(piece.type)+captNotation+this.getCaseName(pos2);
          this.pieceCases[pos2] = this.pieceCases[pos1];
          this.pieceCases[pos1] = null;
          this.refreshCases.next([pos1, pos2]);
          this.endTurn.next(newMove);
        }

        if((this.whiteCanOO || this.whiteCanOOO) && piece.type === 'king' && piece.color === 'white') {
          this.whiteCanOO = false;
          this.whiteCanOOO = false;
        } else if((this.blackCanOO || this.blackCanOOO) && piece.type === 'king' && piece.color === 'black') {
          this.blackCanOO = false;
          this.blackCanOOO = false;
        }

        if((this.whiteCanOO || this.whiteCanOOO) && piece.type === 'rook' && piece.color === 'white') {
          if(pos1==56) {
            this.whiteCanOOO = false;
          } else if(pos1==63) {
            this.whiteCanOO = false;
          }
        } else if((this.blackCanOO || this.blackCanOOO) && piece.type === 'rook' && piece.color === 'black') {
          if(pos1==0) {
            this.blackCanOOO = false;
          } else if(pos1==7) {
            this.blackCanOO = false;
          }
        }

      }
      return true;
    }
    return false;
  }

  availableMovesFrom(pos: number, cases: (Piece|null)[]) {
    var piece = this.getPiece(pos, cases);
    if(piece) {
      switch(piece.type) { 
        case 'pawn': { 
          return this.pos2_pawn(pos, piece.color, cases); 
        } 
        case 'rook': { 
          return this.pos2_rook(pos, piece.color, cases); 
        } 
        case 'knight': { 
          return this.pos2_knight(pos, piece.color, cases); 
        } 
        case 'bishop': { 
          return this.pos2_bishop(pos, piece.color, cases); 
        } 
        case 'queen': { 
          return this.pos2_rook(pos, piece.color, cases).concat(this.pos2_bishop(pos, piece.color, cases)); 
        } 
        case 'king': { 
          return this.pos2_king(pos, piece.color, false, cases); // à changer le booléen asap
        } 
        default: { 
          return [];
        } 
      } 
    }
    return [];
  }

  canMoveTo(pos1: number, pos2: number) {
    var output: [boolean, string] = [false, ''];
    if(this.getPiece(pos1, this.pieceCases)?.color === this.colorToMove) {
      for (var k of this.availableMovesFrom(pos1, this.pieceCases)) {
        if (k[1] === pos2) {
          output[0] = true;
          output[1] = k[2];
          return output;
        }
      }
    }
    return output;
  }

  endMove(newMove: string) {
    var checkMateEndGame = false;
    this.colorToMove = this.colorToMove === 'white' ? 'black' : 'white';
    this._colorToMove.next(this.colorToMove);
    this.unSelectCase();
    // Calcul des mvts possibles
    this.possibleMoves = this.calculMoves(this.colorToMove);
    if(this.possibleMoves.length < 1) {
      if(this.refreshThreats(this.colorToMove, this.pieceCases)[1]) {
        newMove = newMove + '#';
        checkMateEndGame = true;
        if(this.colorToMove === "white") {
          this._ggEnd.next("black");
          console.log('BLACK WON');
        } else {
          this._ggEnd.next("white");
          console.log('WHITE WON');
        }
      }
      else {
        console.log('PAT');
        this._ggEnd.next("pat");
      }
    }
    // Calcul des cases attaquées
    this.whiteAttackedCases = this.casesAttacked('white');
    this.blackAttackedCases = this.casesAttacked('black');
    this._whiteAttackedCases.next(this.whiteAttackedCases);
    this._blackAttackedCases.next(this.blackAttackedCases);
    

    if(!checkMateEndGame && (this.whiteCheck || this.blackCheck)) {
      console.log('check');
      newMove = newMove + '+';
    }

    this.movesPlayed.push(newMove);
    this._movePlayed.next(newMove);

    // Unsubscribe from promotion
    if(this.choiceSubscription) {
      this.choiceSubscription.unsubscribe();
      this.choiceSubscription = null;
    }
  }

  textFromPiece(pieceType: Piece["type"]) {
    switch(pieceType) { 
      case 'pawn': { 
        return ''; 
      } 
      case 'rook': { 
        return 'R'; 
      } 
      case 'knight': { 
        return 'N'; 
      } 
      case 'bishop': { 
        return 'B'; 
      } 
      case 'queen': { 
        return 'Q'; 
      } 
      case 'king': { 
        return 'K';
      } 
      default: { 
        return [];
      } 
    }
    return '';
  }

  eliminatePiece(piece: Piece) {
    this._pieceCaptured.next(piece);
    this.piecesCaptured[piece.color === 'white'? 0 : 1].push(piece);
  }

  casesAttacked(color: "white" | "black") { // Returns the cases of the colored pieces being threatened
    var cases: number[] = [];
    var check: boolean;

    var threatsResult = this.refreshThreats(color, this.pieceCases);
    cases = threatsResult[0];
    check = threatsResult[1];
    
    if(check) {
      if(color === "white") {
        this.whiteCheck = true;
        this._whiteCheck.next(true);
      }
      if(color === "black") {
        this.blackCheck = true;
        this._blackCheck.next(true);
      }
    }
    else {
      if(color === "white") {
        this.whiteCheck = false;
        this._whiteCheck.next(false);
      }
      if(color === "black") {
        this.blackCheck = false;
        this._blackCheck.next(false);
      }
    }
    return cases;
  }
  
  simulatePosition(pos1: number, pos2: number) {
    var piece1 = this.getPiece(pos1, this.pieceCases);
    if(piece1) {
      var color = piece1.color;
      var pieceCasesCopy: (Piece|null)[] = Object.assign([], this.pieceCases);
      pieceCasesCopy[pos2] = pieceCasesCopy[pos1];
      pieceCasesCopy[pos1] = null;
      
      var threatsResult = this.refreshThreats(color, pieceCasesCopy, true);
      if(threatsResult[1]) {
        return false;
      }
    }
    return true;
  }

  refreshThreats(color: "white" | "black", pieceCases: (Piece|null)[], sim?: boolean) {
    var casesOut: number[] = [];
    var pCases: [number,number,string][] = []

    for (var i = 0; i < pieceCases.length; i++) {
      var piece = pieceCases[i];
      if(piece && piece?.color != color) {
        pCases = [];
        switch(piece.type) {
          case 'pawn': {
            pCases = this.capture_pawn(i, piece.color, pieceCases, sim);
            break;
          }
          case 'rook': { 
            pCases = this.pos2_rook(i, piece.color, pieceCases, sim); 
            break;
          } 
          case 'knight': { 
            pCases = this.pos2_knight(i, piece.color, pieceCases, sim); 
            break;
          } 
          case 'bishop': { 
            pCases = this.pos2_bishop(i, piece.color, pieceCases, sim);  
            break;
          } 
          case 'queen': { 
            pCases = this.pos2_rook(i, piece.color, pieceCases, sim).concat(this.pos2_bishop(i, piece.color, pieceCases, sim)); 
            break;
          } 
          case 'king': { 
            pCases = this.pos2_king(i, piece.color, false, pieceCases, sim); // à changer le booléen asap
            break;
          } 
        }
        for (var list of pCases) {
          casesOut.push(list[1]);
        }
      }
    }
    var check: boolean;
    check = this.isChecked(color, pieceCases, casesOut);
    var threatsResults: [number[], boolean] = [casesOut, check];

    return threatsResults;
  }

  isChecked(color: "white" | "black", pieceCases: (Piece|null)[], casesThreatened :number[]) {
    for (var c of casesThreatened) {
      if(pieceCases[c]?.type === 'king' && pieceCases[c]?.color === color) {
        return true;
      }
    }
    return false;
  }

  calculMoves(color: "white" | "black") {
    var moves: number[] = []
    for (var i = 0; i < this.pieceCases.length; i++) {
      var p = this.pieceCases[i];
      if (p && p.color === color) {
        if(this.availableMovesFrom(i, this.pieceCases).length) {
          moves.push(i);
        }
      }
    }
    return moves;
  }

  promoteTo(choice: Piece["type"]) {
    if(this.nbPromote != -1) {
      var piecePromoted = this.pieceCases[this.nbPromoteFrom]
      if(piecePromoted) {
        var color = piecePromoted.color;
        this.pieceCases[this.nbPromote] = {type: choice, color: color};
        this.pieceCases[this.nbPromoteFrom] = null;
        this.promotionWait = false;
      }
    }
    this.refreshCases.next([this.nbPromote, this.nbPromoteFrom]);
    this._promotePawn.next(-1);
    this.endTurn.next(this.getCaseName(this.nbPromote).toString()+"=" + this.textFromPiece(choice));

    this.nbPromote = -1;
    this.nbPromoteFrom = -1;
  }

  setPromoteChoice(choice: Piece["type"]) {
    this._promoteChoice.next(choice);
  }

  pos2_bishop (pos1: number, color: 'white'|'black', cases: (Piece|null)[], sim?: boolean) {

    var availableMoves: [number,number,string][] = [];
    for(var k of this.moves_bishop) {
      var j = 1;
      while(true) {
        var n = this.tab120[this.tab64[pos1] + (k * j)]
        if(n != -1) { //as we are not out of the board
          if(this.isEmpty(n, cases) || this.hasEnemyPiece(n, color, cases)) {
            if(sim || this.simulatePosition(pos1, n)) {
              availableMoves.push([pos1, n, '']);
            }
          }
        }
        else { // outside the board
          break;
        }
        if(!this.isEmpty(n, cases)) {
          break;
        }
        j = j+1;
      }
    }
    return availableMoves;
  }

  pos2_knight (pos1: number, color: 'white'|'black', cases: (Piece|null)[], sim?: boolean) {
    var availableMoves: [number,number,string][] = [];
    for(var i of this.moves_knight) {
      var n = this.tab120[this.tab64[pos1] + i]
      if(n != -1) { //as we are not out of the board
        if(this.isEmpty(n, cases) || this.hasEnemyPiece(n, color, cases)) {
          if(sim|| this.simulatePosition(pos1, n)) {
            availableMoves.push([pos1, n, '']);
          }
        }
      }
    }
    return availableMoves;
  }

  pos2_rook (pos1: number, color: 'white'|'black', cases: (Piece|null)[], sim?: boolean) {
    var availableMoves: [number,number,string][] = [];
    for(var k of this.moves_rook) {
      var j = 1;
      while(true) {
        var n = this.tab120[this.tab64[pos1] + (k * j)]
        if(n != -1) { //as we are not out of the board
          if(this.isEmpty(n, cases) || this.hasEnemyPiece(n, color, cases)) {
            if(sim || this.simulatePosition(pos1, n)) {
              availableMoves.push([pos1, n, '']);
            }
          }
        }
        else { // outside the board
          break;
        }
        if(!this.isEmpty(n, cases)) {
          break;
        }
        j = j+1;
      }
    }
    return availableMoves;
  }

  pos2_pawn (pos1: number, color: 'white'|'black', cases: (Piece|null)[], sim?: boolean) {
    var availableMoves: [number,number,string][] = [];
    if (color === 'white') {
      var n = this.tab120[this.tab64[pos1]-10];
      if(n != -1) {
        if(this.isEmpty(n, cases)) {
          if(sim || this.simulatePosition(pos1, n)) {
            if(n < 8) {
              availableMoves.push([pos1, n, 'prom']);
            }
            else {
              availableMoves.push([pos1, n, '']);
            }
          }
        }
      }
      if(pos1 <=55 && pos1 >= 48) { // first row
        if(this.isEmpty(pos1-8, cases) && this.isEmpty(pos1-16, cases)) {
          if(sim || this.simulatePosition(pos1, pos1-16)) {
            availableMoves.push([pos1, pos1-16, '2pawn']);
          }
        }
      }
    }
    else if (color === 'black') {
      var n = this.tab120[this.tab64[pos1]+10];
      if(n != -1) {
        if(this.isEmpty(n, cases)) {
          if(sim || this.simulatePosition(pos1, n)) {
            if(n > 55) {
              availableMoves.push([pos1, n, 'prom'])
            }
            else {
              availableMoves.push([pos1, n, '']);
            }          
          }
        }
      }
      if(pos1 <=15 && pos1 >= 8) { // first row
        if(this.isEmpty(pos1+8, cases) && this.isEmpty(pos1+16, cases)) {
          if(sim || this.simulatePosition(pos1, pos1+16)) {
            availableMoves.push([pos1, pos1+16, '2pawn']);
          }
        }
      }
    }
    return availableMoves.concat(this.capture_pawn(pos1, color, cases));
  }

  capture_pawn(pos1: number, color: 'white'|'black', cases: (Piece|null)[], sim?: boolean) {
    var availableMoves: [number,number,string][] = [];
    if (color === 'white') {
      //Capture upper left
      var n = this.tab120[this.tab64[pos1]-11];
      if(n != -1) {
        if(this.hasEnemyPiece(n, color, cases)) {
          if(sim || this.simulatePosition(pos1, n)) {
            if(n < 8) {
              availableMoves.push([pos1, n, 'prom'])
            }
            else {
              availableMoves.push([pos1, n, '']);
            }                  
          }
        }
        else if (n == this.enPassant){
          if(sim || this.simulatePosition(pos1, n)) {
            availableMoves.push([pos1, n, 'ep']);
          }                  
        }
      }
      //Capture upper right
      var n = this.tab120[this.tab64[pos1]-9];
      if(n != -1) {
        if(this.hasEnemyPiece(n, color, cases)) {
          if(sim || this.simulatePosition(pos1, n)) {
            if(n < 8) {
              availableMoves.push([pos1, n, 'prom'])
            }
            else {
              availableMoves.push([pos1, n, '']);
            }                  
          }
        }
        else if (n == this.enPassant){
          if(sim || this.simulatePosition(pos1, n)) {
            availableMoves.push([pos1, n, 'ep']);
          }                  
        }
      }
    }
    else if (color === 'black') {
      //Capture bottom left
      var n = this.tab120[this.tab64[pos1]+11];
      if(n != -1) {
        if(this.hasEnemyPiece(n, color, cases)) {
          if(sim || this.simulatePosition(pos1, n)) {
            if(n > 55) {
              availableMoves.push([pos1, n, 'prom'])
            }
            else {
              availableMoves.push([pos1, n, '']);
            }           }
        }
        else if (n == this.enPassant){
          if(sim || this.simulatePosition(pos1, n)) {
            availableMoves.push([pos1, n, 'ep']);
          }                  
        }
      }
      //Capture bottom right
      var n = this.tab120[this.tab64[pos1]+9];
      if(n != -1) {
        if(this.hasEnemyPiece(n, color, cases)) {
          if(sim || this.simulatePosition(pos1, n)) {
            if(n > 55) {
              availableMoves.push([pos1, n, 'prom'])
            }
            else {
              availableMoves.push([pos1, n, '']);
            }           }
        }
        else if (n == this.enPassant){
          if(sim || this.simulatePosition(pos1, n)) {
            availableMoves.push([pos1, n, 'ep']);
          }                  
        }
      }
    }
    return availableMoves;
  }

  pos2_king (pos1: number, color: 'white'|'black', isAttacked: boolean, cases: (Piece|null)[], sim?: boolean) {
    // il faut (pour le pion aussi) gérer les déplacements et les menaces, par exemple sur un roque, le roi peut se déplacer mais pas menacer sur une case
    var availableMoves: [number,number,string][] = [];
    for(var i of this.moves_rook.concat(this.moves_bishop)) {
      var n = this.tab120[this.tab64[pos1] + i]
      if(n != -1) { //as we are not out of the board
        if(this.isEmpty(n, cases) || this.hasEnemyPiece(n, color, cases)) {
          if(sim || this.simulatePosition(pos1, n)) {
            availableMoves.push([pos1, n, '']);
          }
        }
      }
    }
    if(isAttacked) {
      return availableMoves;
    }
    // castle moves
    if(color === 'white' && !this.whiteCheck && this.whiteCanOO && this.isEmpty(61, cases) && this.isEmpty(62, cases)) {
      var pathThreatened = false;
      for (var threathenedCase of this.whiteAttackedCases) {
        if (threathenedCase == 61 || threathenedCase == 62) {
          pathThreatened = true;
          break;
        }
      }
      if(!pathThreatened) {
        availableMoves.push([pos1, 62, 'OO'])
      }
    } else if(color === 'black' && !this.blackCheck && this.blackCanOO && this.isEmpty(5, cases) && this.isEmpty(6, cases)) {
      var pathThreatened = false;
      for (var threathenedCase of this.blackAttackedCases) {
        if (threathenedCase == 5 || threathenedCase == 6) {
          pathThreatened = true;
          break;
        }
      }
      if(!pathThreatened) {
        availableMoves.push([pos1, 6, 'OO'])
      }
    }
    if(color === 'white' && !this.whiteCheck &&  this.whiteCanOOO && this.isEmpty(57, cases) && this.isEmpty(58, cases) && this.isEmpty(59, cases)) {
      var pathThreatened = false;
      for (var threathenedCase of this.whiteAttackedCases) {
        if (threathenedCase == 57 || threathenedCase == 58 || threathenedCase === 59) {
          pathThreatened = true;
          break;
        }
      }
      if(!pathThreatened) {
        availableMoves.push([pos1, 58, 'OOO'])
      }
    } else if(color === 'black' && !this.blackCheck && this.blackCanOOO && this.isEmpty(1, cases) && this.isEmpty(2, cases) && this.isEmpty(3, cases)) {
      var pathThreatened = false;
      for (var threathenedCase of this.blackAttackedCases) {
        if (threathenedCase == 1 || threathenedCase == 2 || threathenedCase === 3) {
          pathThreatened = true;
          break;
        }
      }
      if(!pathThreatened) {
        availableMoves.push([pos1, 2, 'OOO'])
      }
    }

    return availableMoves;
  }
}
