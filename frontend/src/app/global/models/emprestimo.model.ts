import Cliente from "./cliente.model";
import Livro from "./livro.model";

export default interface Emprestimo {
    id?: number;
    cliente: Cliente;
    livro: Livro;
    dataInicio: string;
    dataEntrega?:string;
}