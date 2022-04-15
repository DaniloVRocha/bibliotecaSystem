package br.com.stefanini.developerup.rest;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
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

import br.com.stefanini.developerup.dto.ClienteDto;
import br.com.stefanini.developerup.model.Cliente;
import br.com.stefanini.developerup.service.ClienteService;


/**
 * @author Danilo Dorgam
 * email danilodorgam@gmail.com
 * created 30/03/2022
 * @version 0.1.0
 */
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Path("/cliente")
@RequestScoped

public class ClienteRest {
    @Inject
    ClienteService service;

    @GET
    @Operation(summary = "Listar", description = "Retorna uma lista de Clientes")
    @APIResponse(responseCode = "200", description = "ClienteDto",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = ClienteDto.class))})
    public Response listar()  {
        return Response.status(Response.Status.OK).entity(service.listar()).build();
    }
    
    @GET
    @Path("{id}")
    @Operation(summary = "Listar Por ID", description = "Retorna uma Cliente Especifico")  
    @APIResponse(responseCode = "200", description = "ClienteDto",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = ClienteDto.class))})
    public Response listarPorId(@PathParam("id") Long id)  {
    	return Response.status(Response.Status.OK).entity(service.listarPorId(id)).build();  
    }
   
    @POST
    @Transactional
    @Operation(summary = "Cadastrar", description = "Cadastra um Cliente")
    @APIResponse(responseCode = "201", description = "ClienteDto",
            content = {@Content(mediaType = "application/json",
            schema = @Schema(implementation = ClienteDto.class))})
    public Response create(@Valid Cliente cliente) {
        service.gravar(cliente);
        return Response.status(Response.Status.CREATED).build();
    }
    
    @PUT
    @Path("{id}")
    @Transactional
    @Operation(summary = "Alterar", description = "Altera um Cliente")
    @APIResponse(responseCode = "200", description = "ClienteDto",
            content = {@Content(mediaType = "application/json",
            schema = @Schema(implementation = ClienteDto.class))})
    public Response update(@PathParam("id") Long id, Cliente cliente) {
        service.alterar(id, cliente);
        return Response.status(Response.Status.OK).build();
    }
    
    @DELETE
    @Path("{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
    	service.excluir(id);
        return Response.status(204).build();
    }
}
