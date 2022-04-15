package br.com.stefanini.developerup.service;



import java.util.List;
import java.util.stream.Collectors;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;

import br.com.stefanini.developerup.dao.EmprestimoDao;
import br.com.stefanini.developerup.dto.EmprestimoDto;
import br.com.stefanini.developerup.model.Emprestimo;
import br.com.stefanini.developerup.parser.EmprestimoParser;
import br.com.stefanini.developerup.service.exceptions.BusinessException;

/**
 * @author Danilo Dorgam
 * email danilodorgam@gmail.com
 * created 30/03/2022
 * @version 0.1.0
 */
@RequestScoped
public class EmprestimoService {
    @Inject
    EmprestimoDao dao;

    public List<EmprestimoDto> listarPorIdCliente(Long idCliente){
        return dao.listarPorIdCliente(idCliente).stream().map(EmprestimoParser.get()::dto).collect(Collectors.toList());
    }
 
    public Long quantidadeEmprestimoAtivos(Long idCliente) {
    	return dao.quantidadeEmprestimoAtivos(idCliente);
    }
    
    public List<EmprestimoDto> listarTodosEmprestimos(){
        return dao.listar().stream().map(EmprestimoParser.get()::dto).collect(Collectors.toList());
    }
    
    public List<EmprestimoDto> listarEmprestimosAtivos(){
        return dao.listarEmprestimosAtivos().stream().map(EmprestimoParser.get()::dto).collect(Collectors.toList());
    }
    
    public String realizarEmprestimo(Emprestimo emprestimo) {
			String retorno = dao.realizarEmprestimo(emprestimo);
			if(retorno == null) {
				throw new BusinessException("Ocorreu um erro ao gravar emprestimo");
			}
			return "Emprestimo Realizado Com Sucesso";
    }
    
	public String registrarDevolucao(Long id) {
		dao.registrarDevolucao(id);
		return "Livro Devolvido Com Sucesso";
	}
}
