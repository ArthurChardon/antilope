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
import { searchEngines, browsers, os, example } from './marketShares'

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

  marketSharesData: Map<string, [string, number][]> = new Map();
  data: [string, number][] | undefined = [];
  marketChoice = 'search';

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

  refinedData: [string, number, number, string][] = [];
  worldSelected = true;




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
    this.refinedData = [];

    this.reloadData();

    if(this.data) {
      for (var element of this.data) {
        var area = Math.floor(this.maxArea * element[1]);
        fontSize = Math.sqrt(area/(2*element[0].length));
        this.refinedData.push([element[0], fontSize, Math.sqrt(area)* 2/3, this.getColorFromName(element[0])]);
      }
    }
  }

  reloadData() {
    switch(this.marketChoice) {
      case 'search':
        this.marketSharesData = searchEngines;
        break;
      case 'browser':
        this.marketSharesData = browsers;
        break;
      case 'os':
        this.marketSharesData = os;
        break;
      default:
        this.marketSharesData = example;
        break;
    }
    this.data = this.marketSharesData.get(this.worldSelected ? 'world' : 'france');
  }

  getColorFromName(name: string) {
    var color = colorNames.get(name);
    if(!color) {
      switch(this.getRandomInt(5)) {
        case 1:
          color = '#511378';
          break;  
        case 2:
          color = '#8a7967';
          break; 
        case 3:
          color = '#7ac143';
          break; 
        case 4:
          color = '#efdf00';
          break; 
        case 5:
          color = '#da1884';
          break; 
        default:
          color = '#ffffff';
          break;
      }
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
    this.worldSelected = !this.worldSelected;
    this.data = this.worldSelected ?  this.marketSharesData.get('world') : this.marketSharesData.get('france');
    this.getScreenSize();
  }

}
