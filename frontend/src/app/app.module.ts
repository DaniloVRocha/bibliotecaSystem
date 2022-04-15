import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { EditarClienteComponent } from './views/clientes/editar-cliente/editar-cliente.component';
import { GravarClienteComponent } from './views/clientes/gravar-cliente/gravar-cliente.component';
import { ListarClientesComponent } from './views/clientes/listar-clientes/listar-clientes.component';
import { HomeComponent } from './views/home/home.component';
import { ListarAutoresComponent } from './views/autores/listar-autores/listar-autores.component';
import { GravarAutoresComponent } from './views/autores/gravar-autores/gravar-autores.component';
import { EditarAutorComponent } from './views/autores/editar-autor/editar-autor.component';
import { ListarLivrosComponent } from './views/livros/listar-livros/listar-livros.component';
import { GravarLivroComponent } from './views/livros/gravar-livro/gravar-livro.component';
import { EditarLivroComponent } from './views/livros/editar-livro/editar-livro.component';
import { ListarEmprestimosComponent } from './views/emprestimos/listar-emprestimos/listar-emprestimos.component';
import { GravarEmprestimoComponent } from './views/emprestimos/gravar-emprestimo/gravar-emprestimo.component';
import { DetalharEmprestimoComponent } from './views/emprestimos/detalhar-emprestimo/detalhar-emprestimo.component';
import { TabelaEmprestimosComponent } from './views/emprestimos/tabela-emprestimos/tabela-emprestimos.component';






@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    ListarClientesComponent,
    FooterComponent,
    GravarClienteComponent,
    EditarClienteComponent,
    ListarAutoresComponent,
    GravarAutoresComponent,
    EditarAutorComponent,
    ListarLivrosComponent,
    GravarLivroComponent,
    EditarLivroComponent,
    ListarEmprestimosComponent,
    GravarEmprestimoComponent,
    DetalharEmprestimoComponent,
    TabelaEmprestimosComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,


    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    NgxMaskModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
function maskConfigFunction(maskConfigFunction: any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

