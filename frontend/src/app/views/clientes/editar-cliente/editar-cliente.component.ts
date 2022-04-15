import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MessagemService } from 'src/app/core/services/messagem.service';
import Cliente from 'src/app/global/models/cliente.model';
import { ClienteService } from '../clientes.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {

  formEditarCliente: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.compose([Validators.required,Validators.maxLength(50), Validators.minLength(4)]) ),
    email: new FormControl('', Validators.compose([Validators.required,Validators.email])),
    contato: new FormControl('', Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(11)])),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number},
              private clienteApi: ClienteService,
              private messageService:MessagemService) { }

  ngOnInit(): void {
    this.preencherCliente();
  }

  preencherCliente(){
    this.clienteApi.listarPorId(this.data.id).subscribe((res) => {
      this.formEditarCliente = new FormGroup({
        nome: new FormControl(res.nome, Validators.compose([Validators.required,Validators.maxLength(50), Validators.minLength(4)])),
        email: new FormControl(res.email, Validators.compose([Validators.required,Validators.email])),
        contato: new FormControl(res.contato, Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(11)])),
      });
    }, () => {
      this.messageService.error("Ocorreu um erro interno, tente novamente")
    });
  }

  editarCliente() {
    const cliente: Cliente = this.formEditarCliente.value;
    this.clienteApi.editarCliente(this.data.id, cliente).subscribe(()=>{
      this.messageService.success("Cliente Editado Com Sucesso");
      this.recarregarTabela();
    }, () => {
      this.messageService.error("Ocorreu um erro ao editar o cliente, confira as informações e tente novamente")
    });
  }

  recarregarTabela(){
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
}
