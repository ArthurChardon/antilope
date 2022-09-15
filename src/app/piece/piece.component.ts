import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faChessRook, faChessKnight, faChessBishop, faChessQueen, faChessKing, faChessPawn } from '@fortawesome/free-solid-svg-icons';
import { Piece } from './piece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit, OnChanges {
  @Input() piece: Piece | null = null;
  @Input() size: 'small' | 'medium' = 'medium';

  pieceSize: SizeProp | undefined;
  faPiece = faChessPawn;

  constructor() { }

  ngOnInit(): void {
    this.setIcon();
    this.pieceSize = this.size === 'medium' ? "4x" : "3x";
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setIcon();
  }

  setIcon() {
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
