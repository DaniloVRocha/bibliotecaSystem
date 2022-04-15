package br.com.stefanini.developerup.dao;

import java.time.LocalDate;
import java.util.List;

import javax.enterprise.context.RequestScoped;

import br.com.stefanini.developerup.model.Emprestimo;
import br.com.stefanini.developerup.model.Livro;
import io.quarkus.panache.common.Parameters;
import io.quarkus.panache.common.Sort;

@RequestScoped
public class EmprestimoDao {
	
	public Emprestimo listarPorIdEmprestimo(Long idEmprestimo) {
		return Emprestimo.findById(idEmprestimo);
	}
	
	public List<Emprestimo> listar() {
		return Emprestimo.listAll(Sort.by("dataInicio, id").ascending());
	}
	
	public List<Emprestimo> listarPorIdCliente(Long idCliente) {
		return Emprestimo.list("fk_cliente_id = :id",Parameters.with("id", idCliente));
	}
	
	public Long quantidadeEmprestimoAtivos(Long idCliente) {
		return Emprestimo.count("fk_cliente_id = :id and entrega is null", Parameters.with("id", idCliente));	
	}
	
	public List<Emprestimo> listarEmprestimosAtivos() {
		return Emprestimo.list("entrega is null");
	}

	public String realizarEmprestimo(Emprestimo emprestimo)  {
		
			Long quantidadeEmprestimos = Emprestimo.count("fk_cliente_id = :id and entrega is null", Parameters.with("id", emprestimo.getCliente().getId()));	
				
			Long quantidadeMesmoLivro = Emprestimo.count("fk_cliente_id = :id and fk_livro_isbn = :isbn and entrega is null",Parameters.with("id", emprestimo.getCliente().getId()).and("isbn", emprestimo.getLivro().getIsbn()));
			
			Livro livro = Livro.findById(emprestimo.getLivro().getIsbn());
			
			if (quantidadeMesmoLivro > 0 || livro.getQuantidadeExemplares() <= 0) {
				return null;
			}
			
			if(quantidadeEmprestimos >= 3) {
				return null;
			}
			
			Emprestimo.persist(emprestimo);
			Livro.update("quantidade= :quantidade where isbn=:isbn", Parameters.with("quantidade", livro.getQuantidadeExemplares() - 1).and("isbn", livro.getIsbn()));
			
			return "Emprestimo Realizado Com Sucesso";
	}

	public String registrarDevolucao(Long idEmprestimo) {
		Emprestimo.update("entrega = :entrega "+ " where id = :id",Parameters.with("entrega", LocalDate.now()).and("id", idEmprestimo));
		Emprestimo emprestimo = listarPorIdEmprestimo(idEmprestimo);
		Livro livro = Livro.findById(emprestimo.getLivro().getIsbn());
		Livro.update("quantidade= :quantidade where isbn=:isbn", Parameters.with("quantidade", livro.getQuantidadeExemplares() + 1).and("isbn", livro.getIsbn()));
		return "Devolução Efetuada Com sucesso";
	}
}
