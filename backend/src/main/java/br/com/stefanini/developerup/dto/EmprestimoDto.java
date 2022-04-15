package br.com.stefanini.developerup.dto;

import java.time.LocalDate;

import br.com.stefanini.developerup.model.Cliente;
import br.com.stefanini.developerup.model.Livro;

public class EmprestimoDto {

	private Long id;

	private Cliente cliente;

	private Livro livro;

	private LocalDate dataInicio;

	private LocalDate dataEntrega;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Livro getLivro() {
		return livro;
	}

	public void setLivro(Livro livro) {
		this.livro = livro;
	}

	public LocalDate getDataInicio() {
		return dataInicio;
	}

	public void setDataInicio(LocalDate dataInicio) {
		this.dataInicio = dataInicio;
	}

	public LocalDate getDataEntrega() {
		return dataEntrega;
	}

	public void setDataEntrega(LocalDate dataEntrega) {
		this.dataEntrega = dataEntrega;
	}

}
