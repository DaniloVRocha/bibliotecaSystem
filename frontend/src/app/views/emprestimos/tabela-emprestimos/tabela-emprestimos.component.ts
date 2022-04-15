import { Component, Input, OnInit } from '@angular/core';
import { MessagemService } from 'src/app/core/services/messagem.service';
import Emprestimo from 'src/app/global/models/emprestimo.model';
import { EmprestimosService } from '../emprestimos.service';

@Component({
  selector: 'app-tabela-emprestimos',
  templateUrl: './tabela-emprestimos.component.html',
  styleUrls: ['./tabela-emprestimos.component.scss']
})
export class TabelaEmprestimosComponent implements OnInit {
  
  @Input()
  emprestimos: Emprestimo[] = [];

  displayedColumns = ['nomeCliente', 'isbn', 'nomeLivro', 'dataInicio', 'contato', 'entregue', 'acoes'];

  constructor(private emprestimoApi:EmprestimosService,
              private messageService:MessagemService) { }

  ngOnInit(): void {
  }

  listarEmprestimos(){
    this.emprestimoApi.listarEmprestimo().subscribe((res) => {
      this.emprestimos = res;
    });
  }

  devolverLivro(id:number){
    this.emprestimoApi.devolverLivro(id).subscribe(()=>{
      this.messageService.success("Livro Devolvido Com Sucesso")
      this.recarregarTabela();
    },()=>{
      this.messageService.error("Ocorreu um erro ao devolver o livro")
    })
  }
  
  recarregarTabela() {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
}
