import { Component, OnInit, Input } from '@angular/core';
// Import da interface Hero
import { Hero } from '../hero';



@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // Atributo para aparesentar dados, ligada ao html
  @Input() hero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }

}
