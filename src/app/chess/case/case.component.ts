import { Component, Input, OnInit } from '@angular/core';
import { CasesService } from '../cases.service';
import { Piece } from '../piece/piece'

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit {
  @Input() numb = -1;

  selected = false;
  available = false;

  attacked = false;
  checked = false;
  mated = false;

  otherSelected: number = -1;

  piece: Piece | null = null;
  name = 'null';
  caseBlanche = false;

  constructor(private casesService: CasesService) {}

  ngOnInit(): void {
    if(this.numb > -1) {
      this.name = this.casesService.getCaseName(this.numb);
      this.caseBlanche = this.casesService.getCaseColor(this.numb) === 'white';
      this.piece = this.casesService.getBoardPiece(this.numb);
    }
    this.casesService.selectedCase.subscribe((n) => {
      this.selected = n === this.numb;
      this.otherSelected = n;
    });
    this.casesService.availableCases.subscribe((n) => {
      this.available = false;
      for(var k of n) {
        if (this.numb == k[1]) {
          this.available = true;
          break;
        }
      }
    })
    this.casesService.refreshCases.subscribe((n) => {
      for(var k of n) {
        if(this.numb == k) {
          this.refreshCase();
        }
      }
    })
    this.casesService._whiteAttackedCases.subscribe((n) => {
      for(var k of n) {
        if(this.numb == k) {
          this.attacked = true;
          break;
        }
      }
    })
    this.casesService._blackCheck.subscribe((n) => {
      if(!this.piece) {
        this.checked = false;
      }
      if(n && this.piece?.type === 'king' && this.piece.color === 'black') {
        this.checked = true;
      }
      else if(this.piece?.color === 'black') {
        this.checked = false;
      }
    })
    this.casesService._whiteCheck.subscribe((n) => {
      if(!this.piece) {
        this.checked = false;
      }
      if(n && this.piece?.type === 'king' && this.piece.color === 'white') {
        this.checked = true;
      }
      else if(this.piece?.color === 'white') {
        this.checked = false;
      }
    })
    this.casesService._ggEnd.subscribe((winner) => {
      if(this.piece?.type === 'king' && this.piece.color != winner) {
        this.checked = false;
        this.mated = true;
      }
    })
  }

  refreshCase() {
    if(this.numb > -1) {
      this.name = this.casesService.getCaseName(this.numb);
      this.piece = this.casesService.getBoardPiece(this.numb);
    }
  }

  clickCase() {
    if(this.selected) {
      this.selected = false;
      this.casesService.unSelectCase();
    }
    else {
      if(this.otherSelected != this.numb && this.casesService.getBoardPiece(this.otherSelected)) { // moving piece
        if(this.casesService.movePiece(this.otherSelected, this.numb))
        {
          return;
        }
      }
      this.casesService.selectCase(this.numb);
    }
  }

}
