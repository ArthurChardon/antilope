import { Component, OnInit } from '@angular/core';
import { faBook, faSkull, faHouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  faBookIcon = faBook; faSkullIcon = faSkull; faHouseIcon = faHouse;


  constructor() { }

  ngOnInit(): void {
  }

}
