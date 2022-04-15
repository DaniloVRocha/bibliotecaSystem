package br.com.stefanini.developerup.parser;

import br.com.stefanini.developerup.dto.AutorDto;
import br.com.stefanini.developerup.model.Autor;

public class AutorParser {
    public static AutorParser get(){
        return  new AutorParser();
    }

    public AutorDto dto(Autor entidade){
    	AutorDto dto = new AutorDto();

        dto.setId(entidade.getId());
        dto.setNome(entidade.getNome());
        dto.setEmail(entidade.getEmail());
        dto.setIsni(entidade.getIsni());
        dto.setDataNascimento(entidade.getDataNascimento());
        dto.setBiografia(entidade.getBiografia());
        
        return dto;
    }
}
