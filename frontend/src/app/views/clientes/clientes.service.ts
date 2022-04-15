import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import ApiUrl from 'src/app/global/constant/api-urls.constant';
import Cliente from 'src/app/global/models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  listarPorId(id:Number):Observable<Cliente> {
    return this.http.get<Cliente>(`${ApiUrl.clientes}/${id}`)
  }

  listarClientes(): Observable<Cliente[]> {
    return this.http
      .get<Cliente[]>(ApiUrl.clientes)
      .pipe(map((res) => res.map((c, i) => ({ ...c, posicao: i }))));
  }

  novoCliente(cliente:Cliente){
    return this.http.post<Cliente>(ApiUrl.clientes, cliente);
  }

  excluirClientes(id:Number){
    return this.http.delete(`${ApiUrl.clientes}/${id}`);
  }

  editarCliente(id:Number, cliente:Cliente){
    return this.http.put<Cliente>(`${ApiUrl.clientes}/${id}`, cliente);
  }

}
