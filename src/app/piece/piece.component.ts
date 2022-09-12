import { Component, Input, OnInit } from '@angular/core';
import { faChessRook, faChessKnight, faChessBishop, faChessQueen, faChessKing, faChessPawn } from '@fortawesome/free-solid-svg-icons';
import { Piece } from './piece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
  @Input() piece: Piece | null = null;
  faPiece = faChessPawn;

  constructor() { }

  ngOnInit(): void {
    if (this.piece) {
      if (this.piece.type === 'pawn') {
        this.faPiece = faChessPawn;
      } 
      else if (this.piece.type === 'rook') {
        this.faPiece = faChessRook;
      }
      else if (this.piece.type === 'knight') {
        this.faPiece = faChessKnight;
      }
      else if (this.piece.type === 'bishop') {
        this.faPiece = faChessBishop;
      }
      else if (this.piece.type === 'queen') {
        this.faPiece = faChessQueen;
      }
      else if (this.piece.type === 'king') {
        this.faPiece = faChessKing;
      }
    } 
  }

}
