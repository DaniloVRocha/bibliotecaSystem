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

import br.com.stefanini.developerup.dto.LivroDto;
import br.com.stefanini.developerup.model.Livro;
import br.com.stefanini.developerup.service.LivroService;


@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Path("/livro")
@RequestScoped

public class LivroRest {
    @Inject
    LivroService service;

    @GET
    @Operation(summary = "Listar", description = "Retorna uma lista de Livros")
    @APIResponse(responseCode = "200", description = "LivroDto",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = LivroDto.class))})
    public Response listar()  {
        return Response.status(Response.Status.OK).entity(service.listar()).build();
    }
    
    @GET
    @Path("{isnb}")
    @Operation(summary = "Listar Por ISNB", description = "Retorna uma Livro Especifico")  
    @APIResponse(responseCode = "200", description = "LivroDto",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = LivroDto.class))})
    public Response listarPorId(@PathParam("isnb") String isnb)  {
        return Response.status(Response.Status.OK).entity(service.listarPorIsnb(isnb)).build();
    }
    
    @POST
    @Transactional
    @Operation(summary = "Cadastrar", description = "Cadastra um Livro")
    @APIResponse(responseCode = "201", description = "LivroDto",
            content = {@Content(mediaType = "application/json",
            schema = @Schema(implementation = LivroDto.class))})
    public Response create(Livro livro) {
        service.gravar(livro);
        return Response.status(Response.Status.CREATED).build();
    }
    
    @PUT
    @Path("{isnb}")
    @Transactional
    @Operation(summary = "Alterar", description = "Altera um Livro")
    @APIResponse(responseCode = "200", description = "LivroDto",
            content = {@Content(mediaType = "application/json",
            schema = @Schema(implementation = LivroDto.class))})
    public Response update(@PathParam("isnb") String isnb, Livro livro) {
        service.alterar(isnb, livro);
        return Response.status(Response.Status.OK).build();
    }
    
    @DELETE
    @Path("{isnb}")
    @Transactional
    public Response delete(@PathParam("isnb") String isnb) {
    	service.excluir(isnb);
        return Response.status(204).build();
    }
}
