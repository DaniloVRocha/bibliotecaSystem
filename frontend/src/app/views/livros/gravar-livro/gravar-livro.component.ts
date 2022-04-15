import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagemService } from 'src/app/core/services/messagem.service';
import OpenApi from 'src/app/global/constant/openapi-library.constant';
import Autor from 'src/app/global/models/autor.model';
import Livro from 'src/app/global/models/livro.model';
import OpenLibrary from 'src/app/global/models/openlibrary.model';
import { AutoresService } from '../../autores/autores.service';
import { LivrosService } from '../livros.service';

@Component({
  selector: 'app-gravar-livro',
  templateUrl: './gravar-livro.component.html',
  styleUrls: ['./gravar-livro.component.scss']
})
export class GravarLivroComponent implements OnInit {

  formGravarLivro: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.compose([Validators.required,Validators.maxLength(50)])),
    anoDePublicacao: new FormControl('', Validators.compose([Validators.required,Validators.minLength(4),Validators.minLength(4)])),
    editora: new FormControl('', Validators.compose([Validators.required,Validators.maxLength(50)])),
    quantidadeExemplares: new FormControl(''),
  });


  isbn:string = "";
  autores: Autor[] = [];
  autorSelecionado: number = 0;
  

  constructor(private livroApi:LivrosService,
              private autorApi:AutoresService,
              private messageService:MessagemService) { }

  ngOnInit(): void {
    this.buscarAutores();
  }

  buscarAutores(){
    this.autorApi.listarAutores().subscribe(res=>{
      this.autores = res;
    })
  }

  gravarLivro(){
    if (this.autorSelecionado == 0) {
      this.messageService.error("Você Deve selecionar um autor.")
    } else {
      const livro: Livro = this.formGravarLivro.value;
      livro.isbn = this.isbn;
      livro.autor = { id: this.autorSelecionado };

      this.livroApi.gravarLivro(livro).subscribe(() => {
        this.messageService.success("Livro Gravado Com Sucesso.")
      }, () => {
        this.messageService.error("Ocorreu um erro ao gravar o livro, verifique as informações e tente novamente.")
      });
    }
    
  }

  preencherDadosLivro(){
    this.livroApi.verificarIsnb(this.isbn).subscribe(res=>{
      if(Object.keys(res).length === 0 ) {
        this.messageService.error("Número de ISBN Ínvalido.")
      }else{
        var openAPI:OpenLibrary=  Object.values(res)[0].details;
        let dataCriacao = new Date(Object.values(res)[0].details.publish_date).getFullYear();
        this.formGravarLivro = new FormGroup({
          nome: new FormControl(openAPI.full_title, Validators.compose([Validators.required,Validators.maxLength(50)])),
          anoDePublicacao: new FormControl(dataCriacao, Validators.compose([Validators.required,Validators.minLength(4),Validators.minLength(4)])),
          editora: new FormControl(openAPI.publishers[0], Validators.compose([Validators.required,Validators.maxLength(50)])),
          quantidadeExemplares: new FormControl(openAPI.number_of_pages),
        });
      }
    })
  }
}
