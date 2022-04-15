import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagemService } from 'src/app/core/services/messagem.service';
import Autor from 'src/app/global/models/autor.model';
import { AutoresService } from '../autores.service';

@Component({
  selector: 'app-editar-autor',
  templateUrl: './editar-autor.component.html',
  styleUrls: ['./editar-autor.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }]
})
export class EditarAutorComponent implements OnInit {

  formEditarAutor: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(4)])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    isni: new FormControl('', Validators.compose([Validators.required, Validators.minLength(16)])),
    dataNascimento: new FormControl('', Validators.compose([Validators.required])),
    biografia: new FormControl(''),
  });

  maxDate: Date = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },
              private autorApi: AutoresService,
              private messageService: MessagemService,
              private _adapter: DateAdapter<any>) { }

  ngOnInit(): void {
    this._adapter.setLocale('pt-BR');
    this.preencherAutor();
  }

  preencherAutor() {
    this.autorApi.listarPorId(this.data.id).subscribe((res) => {
      this.formEditarAutor = new FormGroup({
        nome: new FormControl(res.nome, Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(4)])),
        email: new FormControl(res.email, Validators.compose([Validators.required, Validators.email])),
        isni: new FormControl(res.isni, Validators.compose([Validators.required, Validators.minLength(16)])),
        dataNascimento: new FormControl(new Date(res.dataNascimento + " 00:00:00"), Validators.compose([Validators.required])),
        biografia: new FormControl(res.biografia),
      });
    });
  }

  editarAutor() {
    const autor: Autor = this.formEditarAutor.value;
    autor.dataNascimento = this.formatarDataBackend(new Date(autor.dataNascimento))
    this.autorApi.editarAutor(this.data.id, autor).subscribe(() => {
      this.messageService.success("Autor Editado Com Sucesso");
      this.recarregarTabela();
    }, () => {
      this.messageService.error("Ocorreu um erro ao editar o autor, confira as informações e tente novamente")
    })
  }

  recarregarTabela() {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
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