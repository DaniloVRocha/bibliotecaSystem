package br.com.stefanini.developerup.service;



import java.util.List;
import java.util.stream.Collectors;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;

import br.com.stefanini.developerup.dao.ClienteDao;
import br.com.stefanini.developerup.dto.ClienteDto;
import br.com.stefanini.developerup.model.Cliente;
import br.com.stefanini.developerup.parser.ClienteParser;
import br.com.stefanini.developerup.service.exceptions.NotFoundException;

/**
 * @author Danilo Dorgam
 * email danilodorgam@gmail.com
 * created 30/03/2022
 * @version 0.1.0
 */
@RequestScoped
public class ClienteService {
    @Inject
    ClienteDao dao;
    
	public Cliente listarPorId(Long id) throws NotFoundException {
			Cliente cli = dao.listarPorId(id);
			if(cli == null) {
				throw new NotFoundException("Cliente não Encontrado!");
			}
			return cli;	
	}

    public List<ClienteDto> listar(){
        return dao.listar().stream().map(ClienteParser.get()::dto).collect(Collectors.toList());
    }
    
    public String gravar(Cliente cliente) {
			dao.gravar(cliente);
			return "Gravado Com Sucesso";
    }
    
    public String alterar(Long id, Cliente cliente) {
    	dao.alterar(id,cliente);
    	return "Alterado Com Sucesso";
    }

	public void excluir(Long id) {
		Cliente cliente = listarPorId(id);
		dao.excluir(cliente.getId());
	}
}
