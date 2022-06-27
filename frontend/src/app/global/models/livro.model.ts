import Autor from "./autor.model";

export default interface Livro {

    isbn:string;
    nome?:string;
    autor?:Autor;
    anoDePublicacao?:string;
    editora?:string;
    quantidadeExemplares?:number;
    imagemUrl?:string;
}