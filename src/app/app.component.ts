import { Component, OnInit, HostListener } from '@angular/core';
import { CasesService } from './cases.service';
import { Piece } from './piece/piece';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Chess Antilope';
  colorToMove: 'black' | 'white' = 'white';
  moves : string[] = [];
  piecesCaptured: Piece[] = [];

  whiteCheck = 'none';
  blackCheck = 'none';

  winner: 'black' | 'white' | 'pat' | 'none' = 'white';//'none';
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
    this.casesService._colorToMove.subscribe((color) => {
      this.colorToMove = color;
    });

    this.casesService._movePlayed.subscribe((move) => {
      this.moves.push(move);
    });

    this.casesService._pieceCaptured.subscribe((piece) => {
      this.piecesCaptured.push(piece);
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
