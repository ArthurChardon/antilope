import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { faBook, faSkull, faHouse, faChessPawn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-swinging-button',
  templateUrl: './swinging-button.component.html',
  styleUrls: ['./swinging-button.component.scss']
})
export class SwingingButtonComponent implements OnInit {
  @HostBinding("attr.style")
  public get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--animation-time: ${this.duration}ms; --angle-max: ${this.angle};  --length-cable: ${this.cableLength}px`);
  }

  @Input() icon = 'house';
  @Input() color = 'black';
  @Input() length: 'large' | 'medium' | 'small' | 'random' = 'medium';
  @Input() route = '/';

  faIcon = faHouse;
  shortIcon = false;

  duration = 2000;
  cableLength = 250;
  angle = 20;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    switch(this.icon) {
      case 'house':
        this.faIcon = faHouse;
        break;
      case 'skull':
        this.faIcon = faSkull;
        break;
      case 'book':
        this.faIcon = faBook;
        break;  
      case 'pawn':
        this.faIcon = faChessPawn;
        this.shortIcon = true;
        break;
        
      default:
        this.faIcon = faHouse;
        break;
    }

    this.duration = this.getRandomIntFromInterval(1200, 2200);
    this.angle = this.getRandomIntFromInterval(15, 25);
    this.cableLength = this.getRandomIntFromInterval(200, 275);
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  getRandomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  getRandom(max: number) {
    return Math.random() * max;
  }

}
