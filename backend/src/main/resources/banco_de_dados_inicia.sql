insert into Cliente(email,nome,contato) values('maratona@stefanini.com','Developer Up','(11) 99999-9999');
insert into Cliente(email,nome,contato) values('danilo@stefanini.com','Danilo','(61) 99999-9999');
insert into Cliente(email,nome,contato) values('cliente@stefanini.com','Cliente Exemplo','(21) 99999-9999');

insert into Autor(email,nome,isni,nascimento,biografia) values('maratona@stefanini.com','Developer Exemplo','000000012150090X', '1973-10-20', 'Exemplo de Biografia');
insert into Autor(email,nome,isni,nascimento,biografia) values('maratonadois@stefanini.com',' Robert Cecil Martin','123456789101112', '1985-10-20', 'Escritor Renomado');

insert into Livro(isbn,nome,fk_autor_id,ano_publicacao,editora,quantidade) values('9780132350884','Clean Code', 1, '2008', 'Editora Exemplo', 30);
insert into Livro(isbn,nome,fk_autor_id,ano_publicacao,editora,quantidade) values('9783527617838','Angular Momentum', 1, '2007', 'Wiley & Sons, Incorporated, John', 475);
insert into Livro(isbn,nome,fk_autor_id,ano_publicacao,editora,quantidade) values('9780007459483','Game Of Thrones', 1, '2011', 'HarperCollins Publishers', 50);
insert into Livro(isbn,nome,fk_autor_id,ano_publicacao,editora,quantidade) values('9780747532743','Harry Potter', 1, '1999', 'Bloomsbury', 224);


insert into Emprestimo(fk_cliente_id, fk_livro_isbn, dataInicio, entrega) values(1,'9780132350884','2018-10-20', '2018-10-20');
insert into Emprestimo(fk_cliente_id, fk_livro_isbn, dataInicio, entrega) values(1,'9783527617838','2018-10-20', null);
insert into Emprestimo(fk_cliente_id, fk_livro_isbn, dataInicio, entrega) values(1,'9780007459483','2018-10-20', null);
insert into Emprestimo(fk_cliente_id, fk_livro_isbn, dataInicio, entrega) values(2,'9780747532743','2018-10-20', null);