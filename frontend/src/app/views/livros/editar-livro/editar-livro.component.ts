import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagemService } from 'src/app/core/services/messagem.service';
import Autor from 'src/app/global/models/autor.model';
import Livro from 'src/app/global/models/livro.model';
import OpenLibrary from 'src/app/global/models/openlibrary.model';
import { AutoresService } from '../../autores/autores.service';
import { LivrosService } from '../livros.service';

@Component({
  selector: 'app-editar-livro',
  templateUrl: './editar-livro.component.html',
  styleUrls: ['./editar-livro.component.scss']
})
export class EditarLivroComponent implements OnInit {


  formEditarLivro: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
    anoDePublicacao: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.minLength(4)])),
    editora: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
    quantidadeExemplares: new FormControl(''),
  });

  isbn: string = "";
  autores: Autor[] = [];
  autorSelecionado: any = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { isbn: string },
    private livroApi: LivrosService,
    private autorApi: AutoresService,
    private messageService: MessagemService) { }

  ngOnInit(): void {
    this.buscarAutores();
    this.preencherLivro();
  }

  buscarAutores() {
    this.autorApi.listarAutores().subscribe(res => {
      this.autores = res;
    })
  }

  preencherLivro() {
    this.livroApi.listarPorId(this.data.isbn).subscribe((res) => {
      this.autorSelecionado = res.autor?.id;
      this.isbn = res.isbn
      this.formEditarLivro = new FormGroup({
        nome: new FormControl(res.nome, Validators.compose([Validators.required, Validators.maxLength(50)])),
        anoDePublicacao: new FormControl(res.anoDePublicacao, Validators.compose([Validators.required, Validators.minLength(4), Validators.minLength(4)])),
        editora: new FormControl(res.editora, Validators.compose([Validators.required, Validators.maxLength(50)])),
        quantidadeExemplares: new FormControl(res.quantidadeExemplares),
      });
    });
  }

  editarLivro() {
    const livro: Livro = this.formEditarLivro.value;
    livro.autor = { id: this.autorSelecionado }
    livro.isbn = this.isbn;
    this.livroApi.editarAutor(this.data.isbn, livro).subscribe(() => {
      this.messageService.success("Livro Editado Com Sucesso");
      this.recarregarTabela();
    }, () => {
      this.messageService.error("Ocorreu um erro ao editar o livro, confira as informações e tente novamente")
    });
  }

  preencherDadosLivro() {
    this.livroApi.verificarIsnb(this.isbn).subscribe(res => {
      if (Object.keys(res).length === 0) {
        this.messageService.error("Número de ISBN Ínvalido.")
      } else {
        var openAPI: OpenLibrary = Object.values(res)[0].details;
        let dataCriacao = new Date(Object.values(res)[0].details.publish_date).getFullYear();
        this.formEditarLivro = new FormGroup({
          nome: new FormControl(openAPI.title, Validators.compose([Validators.required, Validators.maxLength(50)])),
          anoDePublicacao: new FormControl(dataCriacao, Validators.compose([Validators.required, Validators.minLength(4), Validators.minLength(4)])),
          editora: new FormControl(openAPI.publishers[0], Validators.compose([Validators.required, Validators.maxLength(50)])),
          quantidadeExemplares: new FormControl(openAPI.number_of_pages),
        });
      }
    })
  }

  recarregarTabela() {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

}
