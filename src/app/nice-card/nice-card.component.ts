import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nice-card',
  templateUrl: './nice-card.component.html',
  styleUrls: ['./nice-card.component.scss']
})
export class NiceCardComponent implements OnInit {
  @Input() letter = 'A';
  @Input() firstText = 'first';
  @Input() secondText = 'second';
  @Input() size: 'big' | 'small' = 'big';

  @Input() color = '2c';

  constructor() { }

  ngOnInit(): void {
  }

}
