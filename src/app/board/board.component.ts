import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  cases: number[][] = []
  boardRows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  boardCols = [...Array(8).keys()].map( i => i+1).reverse();

  constructor() { }

  ngOnInit(): void {
    this.initCases();
  }

  initCases() {
    for(let i = 0; i < 8; i++) {
      this.cases.push([])
      for (let j = 0; j < 8; j++) {
        this.cases[i].push(i*8+j)
      }
    }

  }

}
