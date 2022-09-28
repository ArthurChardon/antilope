import { Component, OnInit, Input } from '@angular/core';
import { faBook, faSkull, faHouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-swinging-button',
  templateUrl: './swinging-button.component.html',
  styleUrls: ['./swinging-button.component.scss']
})
export class SwingingButtonComponent implements OnInit {
  @Input() icon = 'house';
  @Input() color = 'black';
  @Input() length: 'large' | 'medium' | 'small' | 'random' = 'medium';
  @Input() route = '/';

  faBookIcon = faBook; faSkullIcon = faSkull; faHouseIcon = faHouse;
  faIcon = faHouse;

  constructor() { }

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
        
      default:
        this.faIcon = faHouse;
        break;
    }
  }

}
