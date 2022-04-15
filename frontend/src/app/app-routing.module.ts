import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarAutoresComponent } from './views/autores/listar-autores/listar-autores.component';
import { GravarClienteComponent } from './views/clientes/gravar-cliente/gravar-cliente.component';
import { ListarClientesComponent } from './views/clientes/listar-clientes/listar-clientes.component';
import { GravarEmprestimoComponent } from './views/emprestimos/gravar-emprestimo/gravar-emprestimo.component';
import { ListarEmprestimosComponent } from './views/emprestimos/listar-emprestimos/listar-emprestimos.component';
import { HomeComponent } from './views/home/home.component';
import { ListarLivrosComponent } from './views/livros/listar-livros/listar-livros.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { pageTitle: 'Página Inicial' },
  },
  {
    path: 'clientes/listar',
    component: ListarClientesComponent,
    data: { pageTitle: 'Listar Clientes' },
  },
  {
    path: 'autores/listar',
    component: ListarAutoresComponent,
    data: { pageTitle: 'Listar Autores' },
  },
  {
    path: 'livros/listar',
    component: ListarLivrosComponent,
    data: { pageTitle: 'Listar Livros' },
  },
  {
    path: 'emprestimos/listar',
    component: ListarEmprestimosComponent,
    data: { pageTitle: 'Listar Emprestimos' },
  },
  {
    path: 'emprestimos/gravar',
    component: GravarEmprestimoComponent,
    data: { pageTitle: 'Novo Emprestimo' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
