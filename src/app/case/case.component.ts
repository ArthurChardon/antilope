import { Component, Input, OnInit } from '@angular/core';
import { CasesService } from '../cases.service';
import { Piece } from '../piece/piece'

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit {
  @Input() numb = 0;

  selected = false;

  piece: Piece | null = null;
  name = 'null';
  caseBlanche = false;

  constructor(private casesServices: CasesService) {}

  ngOnInit(): void {
    if(this.numb) {
      this.name = this.casesServices.getCaseName(this.numb-1);
      this.caseBlanche = this.casesServices.getCaseColor(this.numb-1) === 'white';
      this.piece = this.casesServices.getPiece(this.numb-1);
    }
  }

  clickCase() {
    //this.casesServices
    this.selected = !this.selected;
  }

}
