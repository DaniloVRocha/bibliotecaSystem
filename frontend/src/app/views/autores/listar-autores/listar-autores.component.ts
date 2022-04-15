import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessagemService } from 'src/app/core/services/messagem.service';
import Autor from 'src/app/global/models/autor.model';
import { AutoresService } from '../autores.service';
import { EditarAutorComponent } from '../editar-autor/editar-autor.component';
import { GravarAutoresComponent } from '../gravar-autores/gravar-autores.component';

@Component({
  selector: 'app-listar-autores',
  templateUrl: './listar-autores.component.html',
  styleUrls: ['./listar-autores.component.scss']
})
export class ListarAutoresComponent implements OnInit {

  autores: Autor[] = [];

  displayedColumns = ['nome', 'email', 'isni', 'dataNascimento', 'biografia', 'acoes'];

  constructor(private autorApi: AutoresService,
    public dialog: MatDialog,
    private messageService: MessagemService) { }

  ngOnInit(): void {
    this.listarAutores();
  }

  listarAutores() {
    this.autorApi.listarAutores().subscribe((res) => {
      this.autores = res;
    });
  }

  excluirAutor(id: Number) {
    this.autorApi.excluirAutores(id).subscribe(() => {
      this.messageService.success("Autor Excluido com sucesso")
      this.recarregarTabela();
    }, () => {
      this.messageService.error("Não é possivel excluir autores que tenham livros cadastrados, exclua os livros associados e tente novamente")
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(GravarAutoresComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe();
  }

  openDialogEditar(id: Number) {
    const dialogRef = this.dialog.open(EditarAutorComponent, {
      width: '400px',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe();
  }

  recarregarTabela() {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
}
