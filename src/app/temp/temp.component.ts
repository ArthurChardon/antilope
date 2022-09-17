import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.scss']
})
export class TempComponent implements OnInit {

  colorToMove = 'white';
  constructor() { }

  ngOnInit(): void {
  }

  clique() {
    if(this.colorToMove === 'white') {
      this.colorToMove = 'black';
    }
    else if(this.colorToMove === 'black') {
      this.colorToMove = 'white';
    }
  }

}
