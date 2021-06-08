import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
// HeroService.getHeroes()retornará um Observable porque eventualmente
// usará o HttpClient.getmétodo Angular para buscar os heróis e HttpClient.get()retornará umObservable .
import { Observable, of } from 'rxjs';
// Injetando o serviço de mensagem
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

// Pegar erros ocorridos em http.get()
import { catchError, map, tap } from 'rxjs/operators';

// Você deve disponibilizar o HeroServicepara o sistema de injeção de dependência antes 
// que o Angular possa injetá- lo no HeroesComponent, registrando um provedor. 
// Um provedor é algo que pode criar ou entregar um serviço; neste caso, ele instancia a HeroServiceclasse para fornecer o serviço.
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // Método retornar os heróis
  // O handleError()método a seguir relata o erro e retorna um resultado inócuo para
  // que o aplicativo continue funcionando
  // Tap que olha os valores observáveis, faz algo com esses valores e os repassa. A 
  // tap()chamada de volta não afeta os próprios valores.
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  // Buscar herói por id
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // O Angular injetará o singleton MessageServicenessa propriedade ao criar o HeroService.
  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** Log um HeroService com o MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'api/heroes';  // URL web api

  // Método handleError
  // Depois de relatar o erro ao console, o manipulador constrói uma mensagem amigável e retorna 
  // um valor seguro para o aplicativo para que o aplicativo possa continuar funcionando.
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // PUT - atualizar herói no servidor
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // A API da web heroes espera um cabeçalho especial nas solicitações de salvamento HTTP.
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** POST: adicionar novo herói */
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

/** DELETE: deletar um herói */
deleteHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

/* GET: buscar heróis por nome */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}

}
