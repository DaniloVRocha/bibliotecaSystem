package br.com.stefanini.developerup.rest;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
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

import br.com.stefanini.developerup.dto.AutorDto;
import br.com.stefanini.developerup.model.Autor;
import br.com.stefanini.developerup.service.AutorService;


@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Path("/autor")
@RequestScoped

public class AutorRest {
    @Inject
    AutorService service;

    @GET
    @Operation(summary = "Listar", description = "Retorna uma lista de Autores")
    @APIResponse(responseCode = "200", description = "AutorDto",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = AutorDto.class))})
    public Response listar()  {
        return Response.status(Response.Status.OK).entity(service.listar()).build();
    }
    
    @GET
    @Path("{id}")
    @Operation(summary = "Listar Por ID", description = "Retorna uma Autor Especifico")  
    @APIResponse(responseCode = "200", description = "AutorDto",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = AutorDto.class))})
    public Response listarPorId(@PathParam("id") Long id)  {
        return Response.status(Response.Status.OK).entity(service.listarPorId(id)).build();
    }
    
    @POST
    @Transactional
    @Operation(summary = "Cadastrar", description = "Cadastra um Autor")
    @APIResponse(responseCode = "201", description = "AutorDto",
            content = {@Content(mediaType = "application/json",
            schema = @Schema(implementation = AutorDto.class))})
    public Response create(Autor autor) {
        service.gravar(autor);
        return Response.status(Response.Status.CREATED).build();
    }
    
    @PUT
    @Path("{id}")
    @Transactional
    @Operation(summary = "Alterar", description = "Altera um Autor")
    @APIResponse(responseCode = "200", description = "AutorDto",
            content = {@Content(mediaType = "application/json",
            schema = @Schema(implementation = AutorDto.class))})
    public Response update(@PathParam("id") Long id, Autor autor) {
        service.alterar(id, autor);
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
