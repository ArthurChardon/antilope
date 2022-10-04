import { Component, OnInit, HostListener, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

import { colorNames } from './colorNames'
import { searchEngines, browsers } from './marketShares'

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

  screenHeight = 0;
  screenWidth = 0;

  maxArea = 0;
  maxFontSize = 0;
  maxWidth = 0;
  maxLength = 10;

  data = browsers.get('france');

  data3: [string, number][] = [
    ['Netflix', 0.82],
    ['YouTube', 0.12],
    ['Twitch', 0.06],
    ['Others', 0]
  ];

  data2: [string, number][] = [
    ['Netflix', 0.42],
    ['Twitch', 0.13],
    ['YouTube', 0.24],
    ['Others', 0.21]
  ];

  fontSizeData: [string, number][] = [];
  colorToMove = 'white';


  constructor(private sanitizer: DomSanitizer) { 
    this.getScreenSize();
  }

  ngOnInit(): void {
    
  }
  
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    
    this.maxFontSize = Math.floor(this.screenWidth / this.maxLength);
    this.maxArea = this.maxFontSize * this.maxLength * this.screenHeight;

    var fontSize = 1;
    this.fontSizeData = [];

    if(this.data) {
      for (var element of this.data) {
        var area = Math.floor(this.maxArea * element[1]);
        fontSize = Math.sqrt(area/(2*element[0].length));
        this.fontSizeData.push([element[0], fontSize]);
      }
    }
  }

  getColorFromName(name: string) {
    var color = colorNames.get(name);
    if(!color) {
      color = `rgb(${this.getRandomInt(255)}, ${this.getRandomInt(255)}, ${this.getRandomInt(255)})`;
    }
    return color;
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  invertHex(hex: string) {
    const hex_clean = hex.slice(1);
    return '#'+(Number(`0x1${hex_clean}`) ^ 0xFFFFFF).toString(16).slice(1).toUpperCase()
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
