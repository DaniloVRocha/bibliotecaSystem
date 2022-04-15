import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { MessagemService } from 'src/app/core/services/messagem.service';
import Cliente from 'src/app/global/models/cliente.model';
import Emprestimo from 'src/app/global/models/emprestimo.model';
import Livro from 'src/app/global/models/livro.model';
import { ClienteService } from '../../clientes/clientes.service';
import { LivrosService } from '../../livros/livros.service';
import { EmprestimosService } from '../emprestimos.service';

@Component({
  selector: 'app-gravar-emprestimo',
  templateUrl: './gravar-emprestimo.component.html',
  styleUrls: ['./gravar-emprestimo.component.scss']
})
export class GravarEmprestimoComponent implements OnInit {

  formGravarCliente: FormGroup = new FormGroup({
    nome: new FormControl({value: '', disabled: true},Validators.required),
    email: new FormControl({value: '', disabled: true},Validators.required),
    contato: new FormControl({value: '', disabled: true},Validators.required),
  });

  formGravarLivro: FormGroup = new FormGroup({
    isbn: new FormControl({value: '', disabled: true},Validators.required),
    nome: new FormControl({value: '', disabled: true},Validators.required),
    editora: new FormControl({value: '', disabled: true},Validators.required),
  });

  clientes!: Cliente[];
  livros!:Livro[];
  clienteGravar!:Cliente;
  livroGravar!:Livro;
  buscaCliente:string="";
  buscaLivro:string ="";
  disabled:boolean = true;
  liberaLivro:boolean = false;
  liberaCliente:boolean = false;

  constructor(private clientesApi : ClienteService,
              private livrosApi:LivrosService,
              private emprestimoApi:EmprestimosService,
              private messageService: MessagemService,
              private router:Router) {}

  ngOnInit(): void {
    this.buscarClientes();
    this.buscarLivros();
  }

  realizarEmprestimo(){
    const livro:Livro = {isbn:this.livroGravar.isbn}
    const cliente:Cliente = {id:this.clienteGravar.id}
    const emprestimo:Emprestimo = {
      cliente : cliente,
      livro : livro,
      dataInicio : this.formatarDataBackend(new Date())
    }
    this.emprestimoApi.realizarEmprestimo(emprestimo).subscribe(res => {
      this.messageService.success(`Emprestimo De Livro Realizado Com sucesso`)
      this.router.navigate(['/emprestimos/listar'])
    }, error =>{
      this.messageService.error(`Ocorreu um erro ao realizar o emprestimo, verifique quantidade de exemplares e quantidade de emprestimos e tente novamente`)
    })
  }

  buscarClientes(){
    debugger;
    this.clientesApi.listarClientes().subscribe(res=>{
      this.clientes = res
      .filter(cliente => cliente.nome?.toLocaleLowerCase().includes(this.buscaCliente.toLocaleLowerCase()) || 
      cliente.email?.toLocaleLowerCase().includes(this.buscaCliente.toLocaleLowerCase()));
    })
  }

  buscarLivros(){
    debugger;
    this.livrosApi.listarLivros().subscribe(res=>{
      this.livros = res
      .filter(livro => livro.nome?.toLocaleLowerCase().includes(this.buscaLivro.toLocaleLowerCase()) || 
      livro.isbn.toLocaleLowerCase().includes(this.buscaLivro.toLocaleLowerCase()));
    })
  }

  preencherCamposCliente(clientes: Cliente[]) {
    debugger;
    clientes.forEach(cliente => {
      if (cliente.nome?.toLowerCase() === this.buscaCliente.toLowerCase()) {
        this.formGravarCliente = new FormGroup({
          nome: new FormControl({ value: cliente.nome, disabled: true },Validators.required),
          email: new FormControl({ value: cliente.email, disabled: true },Validators.required),
          contato: new FormControl({ value: cliente.contato, disabled: true },Validators.required),
        });
        this.clienteGravar = cliente;
        this.liberaCliente=true;
      }
    });
    if(this.buscaCliente.trim() === ""){
      this.formGravarCliente = new FormGroup({
        nome: new FormControl({ value: '', disabled: true },Validators.required),
        email: new FormControl({ value: '', disabled: true },Validators.required),
        contato: new FormControl({ value: '', disabled: true },Validators.required),
      });
      this.clienteGravar = this.formGravarCliente.value;
      this.liberaCliente = false;
    }
  }



  preencherCamposLivro(livros: Livro[]) {
    debugger;
    livros.forEach(livro => {
      if (livro.nome?.toLowerCase() === this.buscaLivro.toLowerCase()) {
        this.formGravarLivro = new FormGroup({
          isbn: new FormControl({value: livro.isbn, disabled: true},Validators.required),
          nome: new FormControl({value: livro.nome, disabled: true},Validators.required),
          editora: new FormControl({value: livro.editora, disabled: true},Validators.required),
        });
        this.livroGravar = livro;
        this.liberaLivro = true ;
        
      }
    });
    if(this.buscaLivro.trim() === ""){
      this.formGravarLivro = new FormGroup({
        isbn: new FormControl({value: '', disabled: true},Validators.required),
        nome: new FormControl({value: '', disabled: true},Validators.required),
        editora: new FormControl({value: '', disabled: true},Validators.required),
      });
      this.livroGravar = this.formGravarLivro.value;
      this.liberaLivro = false;
    }
  }

  formatarDataBackend(data: Date) {

    let dia = data.getDate();
    let mes = data.getMonth() + 1;
    let ano = data.getFullYear();

    var dataForm = `${ano}`;
    dataForm += ((mes < 10) ? `-0${mes}` : `-${mes}`);
    dataForm += ((dia < 10) ? `-0${dia}` : `-${dia}`);

    return `${dataForm}`
  }
}
