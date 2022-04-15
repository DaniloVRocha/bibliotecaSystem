package br.com.stefanini.developerup.parser;

import br.com.stefanini.developerup.dto.LivroDto;
import br.com.stefanini.developerup.model.Livro;

public class LivroParser {
    public static LivroParser get(){
        return  new LivroParser();
    }

    public LivroDto dto(Livro entidade){
    	LivroDto dto = new LivroDto();
    	
    	dto.setIsbn(entidade.getIsbn());
    	dto.setNome(entidade.getNome());
    	dto.setQuantidadeExemplares(entidade.getQuantidadeExemplares());
    	dto.setEditora(entidade.getEditora());
    	dto.setAnoDePublicacao(entidade.getAnoDePublicacao());
    	dto.setAutor(entidade.getAutor());
        
        return dto;
    }
}
