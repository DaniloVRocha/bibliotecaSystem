import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessagemService } from 'src/app/core/services/messagem.service';
import Cliente from 'src/app/global/models/cliente.model';
import { ClienteService } from '../clientes.service';
import { EditarClienteComponent } from '../editar-cliente/editar-cliente.component';
import { GravarClienteComponent } from '../gravar-cliente/gravar-cliente.component';

@Component({
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.scss'],
})
export class ListarClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  displayedColumns = ['nome', 'email', 'contato', 'acoes'];

  constructor(private clienteApi: ClienteService,
              public dialog: MatDialog,
              private messageService:MessagemService) {}

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes(){
    this.clienteApi.listarClientes().subscribe((res) => {
      this.clientes = res;
    });
  }

  excluirCliente(id:Number){
    this.clienteApi.excluirClientes(id).subscribe(() => {
      this.messageService.success("Cliente Excluido com sucesso")
      this.recarregarTabela();
    }, () => {
      this.messageService.error("Não é possivel excluir um cliente que tenha emprestimos em aberto.")
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(GravarClienteComponent, {
      width: '400px'});
    dialogRef.afterClosed().subscribe();
  }
  
  openDialogEditar(id:Number){
    const dialogRef = this.dialog.open(EditarClienteComponent, {
      width: '400px',
      data: { id: id }});
    dialogRef.afterClosed().subscribe();
  }

  recarregarTabela(){
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
}

