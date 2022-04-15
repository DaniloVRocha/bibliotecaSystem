package br.com.stefanini.developerup.service;



import java.util.List;
import java.util.stream.Collectors;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;

import br.com.stefanini.developerup.dao.AutorDao;
import br.com.stefanini.developerup.dto.AutorDto;
import br.com.stefanini.developerup.model.Autor;
import br.com.stefanini.developerup.parser.AutorParser;
import br.com.stefanini.developerup.service.exceptions.NotFoundException;

/**
 * @author Danilo Dorgam
 * email danilodorgam@gmail.com
 * created 30/03/2022
 * @version 0.1.0
 */
@RequestScoped
public class AutorService {
    @Inject
    AutorDao dao;
    
	public Autor listarPorId(Long id) throws NotFoundException {
			Autor autor = dao.listarPorId(id);
			if(autor == null) {
				throw new NotFoundException("Autor não Encontrado! Id: " + id , null);
			}
			return autor;	
	}

    public List<AutorDto> listar(){
        return dao.listar().stream().map(AutorParser.get()::dto).collect(Collectors.toList());
    }
    
    public String gravar(Autor autor) {
			dao.gravar(autor);
			return "Gravado Com Sucesso"; 	
    }
    
    public String alterar(Long id, Autor autor) {
    	dao.alterar(id,autor);
    	return "Alterado Com Sucesso";
    }

	public void excluir(Long id) {
		Autor autor = listarPorId(id);
		dao.excluir(autor.getId());
	}
}
