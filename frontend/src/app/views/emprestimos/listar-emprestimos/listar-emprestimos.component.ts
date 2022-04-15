import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Cliente from 'src/app/global/models/cliente.model';
import Emprestimo from 'src/app/global/models/emprestimo.model';
import { ClienteService } from '../../clientes/clientes.service';
import { EmprestimosService } from '../emprestimos.service';

@Component({
  selector: 'app-listar-emprestimos',
  templateUrl: './listar-emprestimos.component.html',
  styleUrls: ['./listar-emprestimos.component.scss']
})
export class ListarEmprestimosComponent implements OnInit {

  emprestimos: Emprestimo[] = [];
  displayedColumns = ['nomeCliente', 'isbn', 'nomeLivro', 'dataInicio', 'contato', 'entregue', 'acoes'];
  
  options: any[] = [
    {value: 1, viewValue: 'Todos os Emprestimos'},
    {value: 2, viewValue: 'Emprestimos em aberto'},
    {value: 3, viewValue: 'Emprestimos por cliente'},
  ];
  selectedValue:number = 1;
  mostrarTable:boolean = true;
  clientes!: Cliente[];
  buscaCliente:string="";

  constructor(private emprestimoApi:EmprestimosService,
              private clientesApi : ClienteService) { }

  ngOnInit(): void {
    this.recarregaConteudo();
  }

  recarregaConteudo(){
    if(this.selectedValue === 1){
      this.mostrarTable = true;
      this.listarEmprestimos();
    }else if(this.selectedValue === 2){
      this.mostrarTable = true;
      this.listarEmprestimosEmAberto();
    }else if(this.selectedValue === 3){
      this.mostrarTable = false;
      this.buscaCliente="";
      this.buscarClientes();
    }
  }
  listarEmprestimosPorCliente(id: number) {
    throw new Error('Method not implemented.');
  }
  listarEmprestimosEmAberto() {
    this.emprestimoApi.listarEmprestimoEmAberto().subscribe(res=>{
      this.emprestimos = res;
    })
  }

  listarEmprestimos(){
    this.emprestimoApi.listarEmprestimo().subscribe((res) => {
      this.emprestimos = res;
    });
  }

  buscarClientes(){
    debugger;
    this.clientesApi.listarClientes().subscribe(res=>{
      this.clientes = res
      .filter(cliente => cliente.nome?.toLocaleLowerCase().includes(this.buscaCliente.toLocaleLowerCase()) || 
      cliente.email?.toLocaleLowerCase().includes(this.buscaCliente.toLocaleLowerCase()));
    })
  }

  preencherTabelasPorCliente(clientes: Cliente[]) {
    debugger;
    clientes.forEach(cliente => {
      if (cliente.nome?.toLowerCase() === this.buscaCliente.toLowerCase()) {
        this.emprestimoApi.listarEmprestimosPorCliente(cliente.id).subscribe(res=>{
          this.emprestimos = res;
          this.mostrarTable = true;
        })
      }
    });
  }
}
