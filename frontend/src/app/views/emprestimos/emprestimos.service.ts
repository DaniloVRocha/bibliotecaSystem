import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import ApiUrl from 'src/app/global/constant/api-urls.constant';
import Emprestimo from 'src/app/global/models/emprestimo.model';

@Injectable({
  providedIn: 'root'
})
export class EmprestimosService {

  constructor(private http: HttpClient) { }

  listarEmprestimo(): Observable<Emprestimo[]> {
    return this.http
      .get<Emprestimo[]>(ApiUrl.emprestimo)
      .pipe(map((res) => res.map((c, i) => ({ ...c, posicao: i }))));
  }

  listarEmprestimoEmAberto():Observable<Emprestimo[]> {
    return this.http
      .get<Emprestimo[]>(`${ApiUrl.emprestimo}/ativos`)
      .pipe(map((res) => res.map((c, i) => ({ ...c, posicao: i }))));
  }

  listarEmprestimosPorCliente(id:any):Observable<Emprestimo[]> {
    return this.http
      .get<Emprestimo[]>(`${ApiUrl.emprestimo}/${id}`)
      .pipe(map((res) => res.map((c, i) => ({ ...c, posicao: i }))));
  }

  realizarEmprestimo(emprestimo:Emprestimo){
    return this.http.post(ApiUrl.emprestimo, emprestimo)
  }

  quantidadeDeEmprestimos(idCliente:number){
    return this.http.get<Number>(`${ApiUrl.emprestimo}/quantidade-ativos/${idCliente}`)
  }

  devolverLivro(id:number){
    return this.http.put(`${ApiUrl.emprestimo}/${id}`, id)
  }
}
