import { Component, OnInit } from '@angular/core';
// Importando a interface hero
import { Hero } from '../hero';
// Importando dados fictícios
import { HEROES } from '../mock-heroes';
// Importando o serviço de heróis
import { HeroService } from '../hero.service';
// Importando o serviço de msg
import { MessageService } from '../message.service';

// Component import principal para se trabalhar com angular
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

// Export é sempre necessário para chamar em outro lugar
export class HeroesComponent implements OnInit {

  // Propriedade
  // hero: Hero = {
  //  id: 1,
  //  name: "Windstorm"
  // };

  // Variável para receber os dados, array
  //heroes = HEROES;
  heroes: Hero[] = [];

  selectedHero?: Hero;
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  // É um gancho de ciclo de vida . Chamadas ngOnInit() logo após a criação de um componente. É um bom lugar para colocar a lógica de inicialização.
  // Incluído o ggetHeroes, pois não é boa prática chamar no construtor
  ngOnInit() {
    this.getHeroes();
  }

  // Função para exbiri os dados do herói selecionado
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  // Crie um método para recuperar os heróis do serviço.
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

}
