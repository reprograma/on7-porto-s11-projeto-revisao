# Reprograma - Semana 11

## Revisão + Exercícios GET, POST, PUT, DELETE e PATCH
Por: @jansenvanessa

1. [Principais verbos HTTP]

    - [POST](#post)
    - [GET](#get)
    - [DELETE](#delete)
    - [PUT](#put)
    - [PATCH](#patch)
    - [PUT vs PATCH] (#put-vs-patch)

2. [POSTMAN] (#postman)

3. [Projeto Lista de Séries](#projeto-lista-filmes)

---
### Principais verbos HTTP

Iremos recordar os principais verbos HTTP, que foram falados nas aulas anteriores. Caso queiram conhecer os demais verbos existentes acessar o site: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods

#### POST

O verbo POST é utilizado quando queremos criar uma informação por meio da api.

#### GET

O verbo GET é utilizado quando queremos recuperar a representação de um recurso. Requisições utilizando esse verbo, devem retornar apenas dados.

#### DELETE

O verbo DELETE é utilizado quando queremos remover um recurso.

#### PUT

O verbo PUT é utilizado quando queremos alterar integralmente um recurso.

#### PATCH

O verbo PUT é utilizado quando queremos alterar parcialmente um recurso.

#### PUT vs PATCH

O verbo PUT e o verbo PATCH são ambos utilizados quando queremos modificar um recurso. A diferença é que utilizamos o PUT quando queremos modificar o recurso por completo e utilizamos o PATCH quando queremos modificá-lo parcialmente.

### POSTMAN

<descrever o que é e fazer passo a passo para baixar>

### PROJETO API DE FILMES

Queremos criar uma api para controlar os filmes que você quer assistir e que já assistiu. Para isso, vamos primeiramente planejar nossa api:

1. Filme: { 
   nome,
   genero,
   sinopse,
   assistido/ não assistido
   }

2. Rotas a serem criadas:

    - POST: Adicionar novo filme
    - GET: Recuperar filme
    - DELETE: Remover filme
    - PUT: Alterar informações do filme
    - PATCH: Marcar/Desmarcar filme como assistido
    
    
### DESAFIO API DE SÉRIES

Durante a aula, fizemos juntas uma api para controlar os filmes que queremos assistir. Porém essa api só serve para filmes, e com as séries, como fica? Agora que já sabemos como criar uma lista de filmes, podemos também fazer uma api para controlar nossas séries com temporadas e seus episódios!

Nessa api queremos poder cadastrar séries, cada uma com inúmeras temporadas e cada temporada com uma lista de epsódios. A estrutura de uma série ficaria dessa forma:

Série: 
{ 
   nome,
   genero,
   sinopse,
   temporadas:[
     {
       numero,
       epsodios: [ {
         numero,
         nome,
         assistido/ não assistido
       }
       ]
     } 
   ]
 }

Para podermos controlar nossas séries, marcando os episódios já vistos como "assistido" iremos precisar implementar na nossa nova API de Séries as seguintes rotas:

    - POST: Adicionar nova série
    - GET: Recuperar série
    - DELETE: remover série
    - PUT: Alterar informações da série
    - POST: Adicionar nova temporada a série
    - GET: Recuperar temporada
    - POST: Adicionar novo episódio a temporada
    - GET: Recuperar episódio
    - PATCH: Marcar/Desmarcar episódio como assistido

