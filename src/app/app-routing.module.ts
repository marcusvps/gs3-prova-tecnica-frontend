import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from './components/cliente/list/list.component';
import {LoginComponent} from './components/login/login.component';
import {NovoComponent} from './components/cliente/novo/novo.component';
import {VisualizarComponent} from './components/cliente/visualizar/visualizar.component';
import {AlterarComponent} from './components/cliente/alterar/alterar.component';
import {AdminGuardService} from './guard/admin-guard.service';
import {ListHistoricoComponent} from './components/historico/list/list-historico.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'list', component: ListComponent},
  { path: 'viewCliente',component:VisualizarComponent},
  { path: 'novo', component: NovoComponent, canActivate:[AdminGuardService]},
  { path: 'editar', component: AlterarComponent, canActivate:[AdminGuardService]},
  { path: 'historico', component: ListHistoricoComponent, canActivate:[AdminGuardService]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
