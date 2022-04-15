import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import ApiUrl from 'src/app/global/constant/api-urls.constant';
import Autor from 'src/app/global/models/autor.model';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {

  constructor(private http: HttpClient) { }

  listarAutores():Observable<Autor[]>{
    return this.http.get<Autor[]>(ApiUrl.autores)
    .pipe(map((res) => res.map((c, i) => ({ ...c, posicao: i }))));
  }

  novoAutor(autor:Autor){
    return this.http.post<Autor>(ApiUrl.autores, autor)
  }

  excluirAutores(id:Number){
    return this.http.delete(`${ApiUrl.autores}/${id}`)
  }

  listarPorId(id:Number):Observable<Autor> {
    return this.http.get<Autor>(`${ApiUrl.autores}/${id}`)
  }
  editarAutor(id:number, autor:Autor){
    return this.http.put<Autor>(`${ApiUrl.autores}/${id}`, autor)
  }
}
