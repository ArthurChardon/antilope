import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { fader, slidder } from './route-animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    //fader,
    slidder,
  ]
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
