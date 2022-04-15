package br.com.stefanini.developerup.dao;

import java.util.List;

import javax.enterprise.context.RequestScoped;

import br.com.stefanini.developerup.model.Livro;
import io.quarkus.panache.common.Parameters;
import io.quarkus.panache.common.Sort;

@RequestScoped
public class LivroDao {
	
	public List<Livro> listar() {
		return Livro.listAll(Sort.by("nome, quantidade").ascending());
	}
	
	public Livro listarPorIsbn(String isbn) {
		return Livro.findById(isbn);
	}

	public void gravar(Livro livro)  {
		Livro.persist(livro);
	}

	public int alterar(String isbn, Livro livro) {
		return Livro.update("isbn= :newisbn," + " nome = :nome," + " autor = :autor," 
	+ " ano_publicacao = :anoDePublicacao," + " editora = :editora," + " quantidade = :quantidade" + " where isbn = :isbn",
				Parameters.with("isbn", isbn)
				.and("newisbn", livro.getIsbn())
				.and("nome", livro.getNome())
				.and("autor", livro.getAutor())
				.and("anoDePublicacao", livro.getAnoDePublicacao())
				.and("editora", livro.getEditora())
				.and("quantidade", livro.getQuantidadeExemplares()));
	}

	public void excluir(String isnb) {
		Livro.deleteById(isnb);
	}
}
