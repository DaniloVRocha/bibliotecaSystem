package br.com.stefanini.developerup.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table(name = "livro")
public class Livro extends PanacheEntityBase{
	
	@Id
	@Column(unique=true, name="isbn", nullable=false)
	private String isbn;
	
	@Column(name="nome", length=50)
	private String nome;
	
	@ManyToOne
	@JoinColumn(name = "fk_autor_id")
	private Autor autor;
	
	@Column(name="ano_publicacao")
	private String anoDePublicacao;
	
	@Column(name="editora", length=50)
	private String editora;
	
	@Column(name="quantidade")
	private Integer quantidadeExemplares;
	

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Autor getAutor() {
		return autor;
	}

	public void setAutor(Autor autor) {
		this.autor = autor;
	}

	public String getAnoDePublicacao() {
		return anoDePublicacao;
	}

	public void setAnoDePublicacao(String anoDePublicacao) {
		this.anoDePublicacao = anoDePublicacao;
	}

	public String getEditora() {
		return editora;
	}

	public void setEditora(String editora) {
		this.editora = editora;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public Integer getQuantidadeExemplares() {
		return quantidadeExemplares;
	}

	public void setQuantidadeExemplares(Integer quantidadeExemplares) {
		this.quantidadeExemplares = quantidadeExemplares;
	}
}
