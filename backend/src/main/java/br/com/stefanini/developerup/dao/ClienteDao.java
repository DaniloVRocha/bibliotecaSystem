package br.com.stefanini.developerup.dao;

import java.util.List;

import javax.enterprise.context.RequestScoped;

import br.com.stefanini.developerup.model.Cliente;
import io.quarkus.panache.common.Parameters;
import io.quarkus.panache.common.Sort;

/**
 * @author Danilo Dorgam
 * email danilodorgam@gmail.com
 * created 30/03/2022
 * @version 0.1.0
 */
@RequestScoped
public class ClienteDao {
	
	public List<Cliente> listar() {
		return Cliente.listAll(Sort.by("nome,email,contato").ascending());
	}

	public Cliente listarPorId(Long id) {
		return Cliente.findById(id);
	}

	public void gravar(Cliente cliente) {
		Cliente.persist(cliente);
	}

	public int alterar(Long id, Cliente cliente) {
		return Cliente.update("email= :email," + " nome = :nome," + " contato = :contato" + " where id = :id",
				Parameters.with("email", cliente.getEmail()).and("nome", cliente.getNome())
						.and("contato", cliente.getContato()).and("id", id));
	}

	public void excluir(Long id) {
		Cliente.deleteById(id);
	}
}
