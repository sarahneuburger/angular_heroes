import { Component, OnInit } from '@angular/core';
// Importando a interface hero
import { Hero } from '../hero';

// Component import principal para se trabalhar com angular
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

// Export é sempre necessário para chamar em outro lugar
export class HeroesComponent implements OnInit {

  // Propriedade
  hero: Hero = {
    id: 1,
    name: "Windstorm"
  };

  constructor() { }

  // É um gancho de ciclo de vida . Chamadas ngOnInit() logo após a criação de um componente. É um bom lugar para colocar a lógica de inicialização.
  ngOnInit(): void {
  }

}
