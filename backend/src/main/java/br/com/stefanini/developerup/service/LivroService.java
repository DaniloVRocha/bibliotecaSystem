package br.com.stefanini.developerup.service;



import java.util.List;
import java.util.stream.Collectors;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;

import br.com.stefanini.developerup.dao.LivroDao;
import br.com.stefanini.developerup.dto.LivroDto;
import br.com.stefanini.developerup.model.Livro;
import br.com.stefanini.developerup.parser.LivroParser;
import br.com.stefanini.developerup.service.exceptions.NotFoundException;

@RequestScoped
public class LivroService {
    @Inject
    LivroDao dao;
    
	public Livro listarPorIsnb(String isnb) throws NotFoundException {
			Livro livro = dao.listarPorIsbn(isnb);
			if(livro == null) {
				throw new NotFoundException("Livro não Encontrado! Isnb: " + isnb , null);
			}
			return livro;	
	}

    public List<LivroDto> listar(){
        return dao.listar().stream().map(LivroParser.get()::dto).collect(Collectors.toList());
    }
    
    public String gravar(Livro livro) {
			dao.gravar(livro);
			return "Gravado Com Sucesso"; 	
    }
    
    public String alterar(String isnb, Livro livro) {
    	dao.alterar(isnb,livro);
    	return "Alterado Com Sucesso";
    }

	public void excluir(String isnb) {
		Livro livro = listarPorIsnb(isnb);
		dao.excluir(livro.getIsbn());
	}
}
