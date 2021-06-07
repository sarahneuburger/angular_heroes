import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
// Import dashboard
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// Um Angular típico Routetem duas propriedades:
// path: uma string que corresponde ao URL na barra de endereço do navegador.
// component: o componente que o roteador deve criar ao navegar para esta rota.
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  // Rota do dash
  { path: 'dashboard', component: DashboardComponent },
  // Para fazer o aplicativo navegar para o painel automaticamente
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // Detalhes dos heróis
  { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }