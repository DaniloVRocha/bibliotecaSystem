import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MessagemService } from 'src/app/core/services/messagem.service';
import Autor from 'src/app/global/models/autor.model';
import { AutoresService } from '../autores.service';

@Component({
  selector: 'app-gravar-autores',
  templateUrl: './gravar-autores.component.html',
  styleUrls: ['./gravar-autores.component.scss'],
  providers:[{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}]
})
export class GravarAutoresComponent implements OnInit {

  formGravarAutor: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.compose([Validators.required,Validators.maxLength(50), Validators.minLength(4)]) ),
    email: new FormControl('', Validators.compose([Validators.required,Validators.email])),
    isni: new FormControl('', Validators.compose([Validators.required,Validators.minLength(16)])),
    dataNascimento: new FormControl('', Validators.compose([Validators.required])),
    biografia: new FormControl('', Validators.maxLength(200)),
  });

  maxDate: Date = new Date();

  constructor(private autorApi:AutoresService,
              private messageService:MessagemService,
              private _adapter: DateAdapter<any>) { }

  ngOnInit(): void {
    this._adapter.setLocale('pt-BR');
  }

  gravarAutor(){
    const autor:Autor = this.formGravarAutor.value;
    autor.dataNascimento = this.formatarDataBackend(new Date(autor.dataNascimento))
    this.autorApi.novoAutor(autor).subscribe(()=>{
      this.messageService.success("Autor Criado com sucesso")
      this.recarregarTabela();
    }, () => {
      this.messageService.error("Ocorreu um erro ao gravar o autor, verifique as informações e tente novamente.")
    });
  }

  recarregarTabela(){
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  formatarDataBackend(data: Date) {
    //captura de dia, mes, ano.
    let dia = data.getDate();
    let mes = data.getMonth() + 1;
    let ano = data.getFullYear();
    //verifica se é necessario incluir 0 para datas de apenas 1 dígito
    var dataForm = `${ano}`;
    dataForm += ((mes < 10) ? `-0${mes}` : `-${mes}`);
    dataForm += ((dia < 10) ? `-0${dia}`: `-${dia}`);

    return `${dataForm}`
  }

}
