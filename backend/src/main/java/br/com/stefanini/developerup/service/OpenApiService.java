package br.com.stefanini.developerup.service;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/api")
@RegisterRestClient
public interface OpenApiService {

    @GET
    @Path("/books")
    @Produces(MediaType.APPLICATION_JSON)
    Response getInformacaoLivro(@QueryParam("bibkeys")String bibkeys,
                                          @QueryParam("jscmd")String jscmd, @QueryParam("format")String format);



}
