import { Component, OnInit } from '@angular/core';
// Importando a interface hero
import { Hero } from '../hero';
// Importando dados fictícios
import { HEROES } from '../mock-heroes';
// Importando o serviço de heróis
import { HeroService } from '../hero.service';
// Importando o serviço de msg
import { MessageService } from '../message.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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

  //selectedHero?: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) { }

  // É um gancho de ciclo de vida . Chamadas ngOnInit() logo após a criação de um componente. É um bom lugar para colocar a lógica de inicialização.
  // Incluído o ggetHeroes, pois não é boa prática chamar no construtor
  ngOnInit() {
    this.getHeroes();
  }

  // Função para exbiir os dados do herói selecionado
  //onSelect(hero: Hero): void {
  //  this.selectedHero = hero;
  //this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  //}

  // Crie um método para recuperar os heróis do serviço.
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  // Adicionar herói
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  // Deletar herói
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
