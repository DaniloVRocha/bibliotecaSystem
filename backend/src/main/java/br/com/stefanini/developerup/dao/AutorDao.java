package br.com.stefanini.developerup.dao;

import java.util.List;

import javax.enterprise.context.RequestScoped;

import br.com.stefanini.developerup.model.Autor;
import io.quarkus.panache.common.Parameters;
import io.quarkus.panache.common.Sort;

/**
 * @author Danilo Dorgam
 * email danilodorgam@gmail.com
 * created 30/03/2022
 * @version 0.1.0
 */
@RequestScoped
public class AutorDao {
	
	public List<Autor> listar() {
		return Autor.listAll(Sort.by("nome, id").ascending());
	}

	public Autor listarPorId(Long id) {
		return Autor.findById(id);
	}

	public void gravar(Autor autor)  {
		Autor.persist(autor);
	}

	public int alterar(Long id, Autor autor) {
		return Autor.update("email= :email," + " nome = :nome," + " isni = :isni," + " nascimento = :nascimento," + " biografia = :biografia" + " where id = :id",
				Parameters.with("email", autor.getEmail())
				.and("isni", autor.getIsni())
				.and("nome", autor.getNome())
				.and("nascimento", autor.getDataNascimento())
				.and("biografia", autor.getBiografia())
				.and("id", id));
	}

	public void excluir(Long id) {
		Autor.deleteById(id);
	}
}
