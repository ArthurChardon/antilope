import { Component, OnInit, HostListener } from '@angular/core';
import { CasesService } from './cases.service';
import { Piece } from './piece/piece';
import { faBook, faSkull } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})

export class ChessComponent implements OnInit{
  title = 'Chess Antilope';
  moves : string[] = [];
  blackCaptured: Piece[] = [];
  whiteCaptured: Piece[] = [];

  whiteCheck = 'none';
  blackCheck = 'none';

  faBookIcon = faBook;
  faSkullIcon = faSkull;

  winner: 'black' | 'white' | 'pat' | 'none' = 'none';//'none';
  gg = {'black': 'Black won !', 'white': 'White won !', 'pat': "Draw by stalemate", 'none': ''};

  @HostListener('click', ['$event.target'])
  onClick(target:any) {
    if(target.className.length) {
      if(!target.className.includes('caseContainer')) {
        this.casesService.unSelectCase();
      }
    }
  }

  constructor(private casesService: CasesService) {}

  ngOnInit(): void {
    this.casesService._movePlayed.subscribe((move) => {
      this.moves.push(move);
    });

    this.casesService._pieceCaptured.subscribe((piece) => {
      if(piece.color === 'black') {
        this.blackCaptured.push(piece);
      } else if(piece.color === 'white') {
        this.whiteCaptured.push(piece);
      }
    });

    this.casesService._whiteCheck.subscribe((check) => {
      this.whiteCheck = check ? 'white' : 'none';
    });

    this.casesService._blackCheck.subscribe((check) => {
      this.blackCheck = check ? 'black' : 'none';
    });

    this.casesService._ggEnd.subscribe((winner) => {
      this.endGame(winner);
    })
  }

  endGame(winner: 'black' | 'white' | 'pat' | 'none') {
    console.log(winner);
    this.winner = winner;
  }

}
