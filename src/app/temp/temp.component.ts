import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-temp',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.scss']
})
export class TempComponent implements OnInit {

  colorToMove = 'white';
  isOpen = true;
  constructor() { }

  ngOnInit(): void {
  }
  

  toggle() {
    this.isOpen = !this.isOpen;
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
