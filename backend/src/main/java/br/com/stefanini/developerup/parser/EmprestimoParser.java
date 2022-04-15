package br.com.stefanini.developerup.parser;

import br.com.stefanini.developerup.dto.EmprestimoDto;
import br.com.stefanini.developerup.model.Emprestimo;

public class EmprestimoParser {
    public static EmprestimoParser get(){
        return  new EmprestimoParser();
    }

    public EmprestimoDto dto(Emprestimo entidade){
    	EmprestimoDto dto = new EmprestimoDto();
    	    	
        dto.setId(entidade.getId());
        dto.setCliente(entidade.getCliente());
        dto.setLivro(entidade.getLivro());
        dto.setDataInicio(entidade.getDataInicio());
        dto.setDataEntrega(entidade.getDataEntrega());
        return dto;
    }
}
