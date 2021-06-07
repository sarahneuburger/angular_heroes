import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
// HeroService.getHeroes()retornará um Observable porque eventualmente
// usará o HttpClient.getmétodo Angular para buscar os heróis e HttpClient.get()retornará umObservable .
import { Observable, of } from 'rxjs';
// Injetando o serviço de mensagem
import { MessageService } from './message.service';

// Você deve disponibilizar o HeroServicepara o sistema de injeção de dependência antes 
// que o Angular possa injetá- lo no HeroesComponent, registrando um provedor. 
// Um provedor é algo que pode criar ou entregar um serviço; neste caso, ele instancia a HeroServiceclasse para fornecer o serviço.
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // Método retornar os heróis
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  // O Angular injetará o singleton MessageServicenessa propriedade ao criar o HeroService.
  constructor(private messageService: MessageService) { }
}
