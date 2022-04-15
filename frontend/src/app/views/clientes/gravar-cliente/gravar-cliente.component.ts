import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagemService } from 'src/app/core/services/messagem.service';
import Cliente from 'src/app/global/models/cliente.model';
import { ClienteService } from '../clientes.service';

@Component({
  selector: 'app-gravar-cliente',
  templateUrl: './gravar-cliente.component.html',
  styleUrls: ['./gravar-cliente.component.scss']
})
export class GravarClienteComponent implements OnInit {

  formGravarCliente: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.compose([Validators.required,Validators.maxLength(50), Validators.minLength(4)]) ),
    email: new FormControl('', Validators.compose([Validators.required,Validators.email])),
    contato: new FormControl('', Validators.compose([Validators.required,Validators.minLength(11)])),
  });

  constructor(private clienteApi: ClienteService,
              private messageService:MessagemService) { }

  ngOnInit(): void {
  }

  gravarCliente(){
    const cliente:Cliente = this.formGravarCliente.value;
    this.clienteApi.novoCliente(cliente).subscribe(()=>{
      this.messageService.success("Cliente Criado com sucesso")
      this.recarregarTabela();
    }, () => {
      this.messageService.error("Ocorreu um erro ao gravar o cliente, verifique as informações e tente novamente.")
    });
  }

  recarregarTabela(){
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
}
