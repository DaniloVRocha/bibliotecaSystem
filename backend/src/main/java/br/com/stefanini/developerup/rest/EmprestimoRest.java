package br.com.stefanini.developerup.rest;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

import br.com.stefanini.developerup.dto.EmprestimoDto;
import br.com.stefanini.developerup.model.Emprestimo;
import br.com.stefanini.developerup.service.EmprestimoService;

@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Path("/emprestimo")
@RequestScoped

public class EmprestimoRest {
    @Inject
    EmprestimoService service;

    @GET
    @Operation(summary = "Listar Todos", description = "Retorna uma lista de todos os emprestimos")
    @APIResponse(responseCode = "200", description = "EmprestimoDto",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = EmprestimoDto.class))})
    public Response listarTodosEmprestimos()  {
        return Response.status(Response.Status.OK).entity(service.listarTodosEmprestimos()).build();
    }
    
    @GET
    @Path("{id}")
    @Operation(summary = "Lista Por Id", description = "Retorna uma lista de emprestimos de um cliente especifico")
    @APIResponse(responseCode = "200", description = "EmprestimoDto",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = EmprestimoDto.class))})
    public Response listar(@PathParam("id") Long id)  {
        return Response.status(Response.Status.OK).entity(service.listarPorIdCliente(id)).build();
    }
    
    @GET
    @Path("/ativos")
    @Operation(summary = "Listar Emprestimos ativos", description = "Retorna todos os emprestimos ativos")  
    @APIResponse(responseCode = "200", description = "EmprestimoDto",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = EmprestimoDto.class))})
    public Response listarEmprestimosAtivos()  {
    	return Response.status(Response.Status.OK).entity(service.listarEmprestimosAtivos()).build();  
    }
    
    @GET
    @Path("/quantidade-ativos/{id}")
    @Operation(summary = "Quantidade Emprestimos ativos", description = "Retorna a quantidade de emprestimos ativos")  
    @APIResponse(responseCode = "200", description = "EmprestimoDto",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = EmprestimoDto.class))})
    public Response quantidadeEmprestimoAtivos(@PathParam("id") Long id)  {
    	return Response.status(Response.Status.OK).entity(service.quantidadeEmprestimoAtivos(id)).build();  
    }
    
    @POST
    @Transactional
    @Operation(summary = "Realizar Emprestimo", description = "Cadastra um novo emprestimo")
    @APIResponse(responseCode = "201", description = "EmprestimoDto",
            content = {@Content(mediaType = "application/json",
            schema = @Schema(implementation = EmprestimoDto.class))})
    public Response realizarEmprestimo(Emprestimo emprestimo) {
        service.realizarEmprestimo(emprestimo);
        return Response.status(Response.Status.CREATED).build();
    }
    
    @PUT
    @Path("{id}")
    @Transactional
    @Operation(summary = "Registrar Devolução", description = "Registrar devolução do livro")
    @APIResponse(responseCode = "200", description = "EmprestimoDto",
            content = {@Content(mediaType = "application/json",
            schema = @Schema(implementation = EmprestimoDto.class))})
    public Response registrarDevolucao(@PathParam("id") Long id) {
        service.registrarDevolucao(id);
        return Response.status(Response.Status.OK).build();
    }
}
