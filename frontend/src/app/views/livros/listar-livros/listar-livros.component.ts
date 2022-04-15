import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessagemService } from 'src/app/core/services/messagem.service';
import Livro from 'src/app/global/models/livro.model';
import { EditarLivroComponent } from '../editar-livro/editar-livro.component';
import { GravarLivroComponent } from '../gravar-livro/gravar-livro.component';
import { LivrosService } from '../livros.service';

@Component({
  selector: 'app-listar-livros',
  templateUrl: './listar-livros.component.html',
  styleUrls: ['./listar-livros.component.scss']
})
export class ListarLivrosComponent implements OnInit {

  livros:Livro[] = [];
  displayedColumns = ['nome', 'isbn','autor','anoDePublicacao','editora','quantidadeExemplares', 'acoes'];

  constructor(private livroApi:LivrosService,
              public dialog: MatDialog,
              private messageService:MessagemService) { }

  ngOnInit(): void {
    this.listarLivros();
  }

  listarLivros(){
    this.livroApi.listarLivros().subscribe((res) => {
      this.livros = res;
    });
  }
  
  excluirLivro(isnb:string){
    this.livroApi.excluirAutores(isnb).subscribe(() => {
      this.messageService.success("O Livro foi Excluido com sucesso")
      this.recarregarTabela();
    }, () => {
      this.messageService.error("Não é possível excluir livros que estejam emprestados.")
    });
 }

  openDialog() {
    const dialogRef = this.dialog.open(GravarLivroComponent, {
      width: '400px'});
    dialogRef.afterClosed().subscribe();
  }

  openDialogEditar(isbn:string) {
    const dialogRef = this.dialog.open(EditarLivroComponent, {
      width: '400px',
      data: {isbn:isbn}});
    dialogRef.afterClosed().subscribe();
  }

  recarregarTabela(){
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

}
