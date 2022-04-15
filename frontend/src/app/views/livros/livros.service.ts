import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import ApiUrl from 'src/app/global/constant/api-urls.constant';
import OpenApi from 'src/app/global/constant/openapi-library.constant';
import Livro from 'src/app/global/models/livro.model';
import OpenLibrary from 'src/app/global/models/openlibrary.model';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  constructor(private http: HttpClient) { }

  //OpenApi Library
  verificarIsnb(isnb:String){
    return this.http.get<OpenLibrary>(`${OpenApi.livros}?bibkeys=ISBN:${isnb}&jscmd=details&format=json`)
  }

  //Crud Livros
  listarLivros(){
    return this.http.get<Livro[]>(ApiUrl.livros)
    .pipe(map((res) => res.map((c, i) => ({ ...c, posicao: i }))));
  }

  listarPorId(isbn:string){
    return this.http.get<Livro>(`${ApiUrl.livros}/${isbn}`)
  }

  gravarLivro(livro:Livro){
    return this.http.post<Livro>(ApiUrl.livros, livro);
  }

  excluirAutores(isnb:string){
    return this.http.delete(`${ApiUrl.livros}/${isnb}`)
  }

  editarAutor(isnb:string, livro:Livro){
    return this.http.put(`${ApiUrl.livros}/${isnb}`, livro)
  }
}
