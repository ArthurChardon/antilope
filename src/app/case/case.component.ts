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

  otherSelected: number = -1;

  piece: Piece | null = null;
  name = 'null';
  caseBlanche = false;

  constructor(private casesServices: CasesService) {}

  ngOnInit(): void {
    if(this.numb > -1) {
      this.name = this.casesServices.getCaseName(this.numb);
      this.caseBlanche = this.casesServices.getCaseColor(this.numb) === 'white';
      this.piece = this.casesServices.getPiece(this.numb);
    }
    this.casesServices.selectedCase.subscribe((n) => {
      this.selected = n === this.numb;
      this.otherSelected = n;
    });
    this.casesServices.availableCases.subscribe((n) => {
      this.available = false;
      for(var k of n) {
        if (this.numb == k[1]) {
          this.available = true;
          break;
        }
      }
    })
    this.casesServices.refreshCases.subscribe((n) => {
      for(var k of n) {
        if(this.numb == k) {
          this.refreshCase();
        }
      }
    })
  }

  refreshCase() {
    if(this.numb > -1) {
      this.name = this.casesServices.getCaseName(this.numb);
      this.piece = this.casesServices.getPiece(this.numb);
    }
  }

  clickCase() {
    if(this.selected) {
      this.selected = false;
      this.casesServices.unSelectCase();
    }
    else {
      if(this.otherSelected != this.numb && this.casesServices.getPiece(this.otherSelected)) { // moving piece
        console.log('move piece', this.otherSelected);
        this.casesServices.movePiece(this.otherSelected, this.numb)
      }
      else {
        this.casesServices.selectCase(this.numb);
      }
    }
  }

}
