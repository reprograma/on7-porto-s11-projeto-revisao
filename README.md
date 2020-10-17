<h1 align="center">
    <br>
    <p align="center">Reprograma - Semana 11 (Revisão)<p>
</h1>

Olá, sejam bem-vindas a Semana 11 de revisão! Meu nome é Vanessa Jansen (@jansenvanessa), sou instrutora da Reprograma e irei acompanhar vocês nessa semana.

# Vamos recordar!

Quantas coisas novas já aprendemos sobre uma API Nodejs, não é mesmo?! Muitas novidades, bastante código e muita caminhada para chegarmos até aqui. Que tal fazermos uma breve retrospectiva? Então vamos lá!

## O que é uma API REST?

Antigamente quando desenvolvíamos uma aplicação WEB, não existia uma separação clara do código de FrontEnd e Backend. O código para fazer as telas (Frontend), era em conjunto com o código de negócio (Backend), criando uma forte dependência entre ambos. Hoje ainda é utilizado esse modelo em alguns casos. É sempre importante avaliarmos o projeto que precisamos fazer, para decidirmos o melhor caminho para desenvolvê-lo.

<imagem API rest>

Nesse curso estamos aprendendo como fazer uma API REST, que é uma API Backend, que irá disponilizar rotas, para que o Frontend (tela), consiga se comunicar com a parte da lógica por trás (Backend). Para isso criamos "Endpoints" na nossa API Rest do Backend e deixamos disponíveis para serem utilizadas pelo Frontend. Em outras palavras, criamos possibilidades de ações que podem ser chamadas pelo Frontend. 

### Exemplo

Criei um botão na tela (Frontend) que ao ser clicado precisa listar todas as alunas do nosso curso. Para isso, foi necessário criar uma API de alunas, e desenvolver uma rota que fornece como resposta a listagem de alunas do nosso curso. O Frontend então chama essa rota do nosso Backend, que responde a listagem de alunas. Com essa informação em mãos, o Frontend consegue trabalhar com esses dados, podendo colocar essas informção em uma tabela, em uma listagem, ou onde for necessário para a visualização do usuário.

Caso no futuro eu queira mudar as telas (Frontend) ou mesmo o código da API (Backend), mantendo as rotas disponibilizadas, poderei fazer sem precisar trocar a outra parte. Com a API REST o código do Backend é independente do Frontend e vice-versa.

## Relembrando os Verbos HTTP

O protocolo HTTP define alguns verbos para as requisições que indicam uma ação a ser executada. Isso significa que para realizar uma requisicão é necessário utilizar o verbo correto para a chamada que quero fazer. Os verbos mais utilizados são:

| Verbo      | Descrição      
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------|
| POST       | É utilizado quando queremos criar uma informação por meio da api.                                                                    |
| GET        | É utilizado quando queremos recuperar a representação de um recurso. Requisições utilizando esse verbo, devem retornar apenas dados. | 
| PUT        | O verbo PUT é utilizado quando queremos alterar integralmente um recurso.                                                            |
| PATCH      | O verbo PUT é utilizado quando queremos alterar parcialmente um recurso.                                                             |
| DELETE     | O verbo DELETE é utilizado quando queremos remover um recurso.                                                                       |

### PUT vs PATCH

O verbo PUT e o verbo PATCH são ambos utilizados quando queremos modificar um recurso. A diferença é que utilizamos o PUT quando queremos modificar o recurso por completo e utilizamos o PATCH quando queremos modificá-lo parcialmente.

## Relembrando o Http Status

Quando fazemos uma requisição na API (quando chamamos uma rota), como vamos saber se deu tudo certo nessa chamada? Ou como vamos saber se deu algum erro? Como saber qual o status da resposta da chamada que fiz? Para isso existe o Http status, com códigos com uma convenção de resposta. Existem inúmeros códigos, mas vamos nos concentrar nos mais utilizados:

| Código | Status        | Descrição                          | Exemplo de Códigos                                     |
| ------ | ------------- | ---------------------------------- |-------------------------------------------------------- 
| 2xx    | `SUCCESSFUL`  | Quando deu certo o retorno         | 200 OK, 202 Accepted, 204 No Content                   | 
| 3xx    | `REDIRECTION` | Quando ocorre um redirecionamento  | 301 Moved Permanently, 303 See Other, 304 Not Modified | 
| 4xx    | `CLIENT ERROR`| Quando há erro do lado do cliente  | 400 Bad Request, 401 Unauthorized, 403 Forbidden       |
| 5xx    | `SERVER ERROR`| Quando há erro do lado do servidor | 500 Internal Server Error, 501 Not Implemented         |

Então na nossa API devemos informar o código ao responder as requisições feitas pelas rotas que desenvolvemos. Caso nossa resposta seja com sucesso, passamos então um status 200. Caso dê algum erro que foi ocasionado por responsabilidade do usuário, enviamos um erro 4xx. Por exemplo, se um usuário não tem permissão de acesso para chamar uma rota que criamos, devemos retornar para ele um status 401, que significa que ele não está autorizado. Porém caso dê algum erro que seja de responsabilidade da nossa API, poderemos retornar um status 500.

# Projeto API Nodejs "Jansen's Films"

Parabéns, você acaba de ser contratada por uma empresa de audio visual chamada Jansen's Films para desenvolver um novo produto que deverá ser lançado em breve. Nesse estágio inicial do produto, o mesmo consistirá em um aplicativo e uma página web onde o usuário poderá controlar uma lista com filmes que já assistiu e que gostaria de assistir.

<imagem do projeto>
    <imagem front com tabela>

Você será a desenvolvedora backend responsável pelo desenvolvimento da API que deverá ser feito em Nodejs. Em paralelo, o time de Frontend irá desenvolver o aplicativo e a página web que irão se comunicar com a API que você irá desenvolver.

A listagem de filmes será no seguinte formato: ```{ nome, genero, sinopse, assistido/ não assistido }```

O novo produto deverá:

- [x] poder listar todos os filmes da lista do usuário
- [x] poder adicionar um novo filme
- [x] poder remover filme da lista
- [x] poder alterar informações do filme
- [x] poder marcar/desmarcar filme como assistido

Sendo assim precisaremos criar 5 rotas:

| Verbo  | Descrição da Rota                     |
| ------ | --------------------------------------|
| POST   | Adicionar novo filme                  |
| GET    | Recuperar filme                       |
| DELETE | Remover filme                         |
| PUT    | Alterar informações do filme          |
| PATCH  | Marcar/Desmarcar filme como assistido |

## Como criar uma nova API Nodejs?

Primeiro, para a construção do backend do nosso produto em Nodejs criaremos uma pasta chamada "jansensfilms". Abriremos a mesma no programa Visual Studio Code e inicializaremos o terminal nessa mesma pasta.

### Iniciando a API Nodejs

Com o terminal aberto na pasta "jansensfilms", para iniciar nossa API Nodejs, precisamos inicializar o *package manager*, que é o gerenciador de pacotes do Node. Para isso executaremos ```npm init``` no terminal. Pressionando “Enter”, serão exibidas uma sequência de perguntas que deverão ser preenchidas ou mantidas o valor padrão.

<imagem do terminal>
    
Com isso um arquivo com o nome de package.json será criado. Esse arquivo é muito importante pois define que o nosso projeto como sendo Node.

### Instalando o Express

Feito isso, precisaremos instalar o Express no nosso projeto, que é um framework que nos trará facilidades. Para isso executaremos no terminal:

``` npm install express --save ```

O *--save* é necessário para especificar que esse pacote do express é uma dependência da nossa aplicação e que o nosso projeto obrigatoriamente precisa dela para funcionar. Quando uma outra pessoa baixar seu projeto, ao instalar as dependências, esse pacote também será instalado. Isso porque quando você usa o --save, esse pacote é referenciado em “dependencies” no arquivo package.json. A sessão “ dependencies”, desse arquivo, lista justamente as dependências do nosso projeto.

Ao rodar a instalação do express, uma *pasta node_modules* com os pacotes do meu projeto será criada. Se reparar, dentro dessa pasta teremos uma pasta chamada “express”. Toda vez que você rodar o comando ``` npm install``` essa pasta node_modules será atualizada com as últimas atualizações conforme o que estiver configurado no arquivo *package.json*.

### Criando o arquivo .gitignore

Devemos criar na raíz do "jansensfilmes" o arquivo *.gitignore* e escrever nele ```node_modules/``` para o git nao trackear essa pasta para commit.

### Criando a estrutura da nossa API

Primeiramente, iremos criar uma pasta chamada “src” (de “source”) na raiz do nosso projeto, onde armazenaremos todos os códigos da aplicação. Dentro dessa, criaremos três pastas:

- [x] controller - para armazenar a lógica de controle da nossa api
- [x] model - para armazenar os nosso modelos (ex: nossos filmes)
- [x] routes - para armazenar as rotas

```
jansensfilms
├── src
│   ├── controllers
│   ├── models
│   ├── routes
├── package.json
```
### Criando o servidor

Deveremos criar dentro de *src/* um arquivo chamado *app.js*. Nesse arquivo faremos as configurações da nossa aplicação. Inicializaremos configuraremos a mesma para utilizar o express. Nesse arquivo criaremos uma constante express que receberá o módulo express. Utilizaremos essa constante para configurar nossa aplicação:

```app.js
const express = require("express")
const app = express()

app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

module.exports = app
```

Criaremos agora, na raíz de "jansensfilms", um arquivo chamado “server.js” para configurarmos nosso servidor. Nesse arquivo criaremos uma constante *app* que receberá nossa aplicação express que criamos no arquivo *app.js*. No caso definimos a porta 3000 para o nosso servidor rodar quando for inicializado.

```server.js
const app = require("./src/app")
const port = 3000;

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});
```

Quando criamos o servidor utilizando o protocolo HTTP, definimos um callback que será executado sempre que recebermos uma requisição web. Nesse caso, esse callback seria executado quando o nosso servidor for iniciado e aparecerá a mensagem “Servidor está rodando na porta 3000”.

### Testando o servidor

Vamos testar nosso servidor? Para isso executaremos o comando ```node server.js``` no terminal. Ao executar o comando, a mensagem informando que o servidor está rodando será exibida.

### Nodemon

Caso você esteja com o servidor rodando e tente alterar algum arquivo, para que o servidor capte essas alterações será necessário reiniciá-lo manualmente. Porém é bem chato ficar fazendo isso. Para evitar esse tipo de problema, podemos utilizar o *nodemon* para inicializar nosso servidor. Para utilizá-lo, deveremos primeiramente instalá-lo rodando o comando ```npm install nodemon --save```. Com o nodemon instalado, para rodar nosso servidor o utilizando, deveremos utilizar o comando ```nodemon server.js```. Com isso nosso servidor será inicializado com o nodemon e você poderá editar seus arquivos sem precisar reiniciá-lo.

### Scripts package.json

Para não precisar ficar escrevendo ```nodemon server.js``` para inicializar o servidor, podemos ir no nosso arquivo *package.json* e editar o atributo "scripts" do json. Poderemos incluir um script de start, informando que quando ele for utilizado, executará o comando ```nodemon server.js```:

```package.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  }
```
Dessa forma para inicializar o servidor, basta digitar ```npm start``` no terminal e pressionar enter, que o mesmo já chamará automaticamente o comando ```nodemon server.js```.

### Vamos criar nossa primeira rota GET!

Com o projeto configurado e com o servidor rodando, caso a gente tente executar no browser *http://localhost:3000*, vamos receber a mensagem “Cannot GET”. Isso significa que o nosso servidor ainda não está habilitado a devolver uma resposta do método GET no endereço “/“. Isso tudo porque ainda não definimos nenhuma rota no nosso projeto.

Vamos então criar a primeira rota da nossa API! Dentro da pasta *routes/* deveremos criar um arquivo chamado *index.js*. Nesse arquivo iremos criar nossa primeira rota GET. Nesse iremos definir que quando chamarmos *http://localhost:3000* a mesma será chamada:

```index.js
const express = require("express")
const router = express.Router()

router.get("/", function (req, res) {
    res.status(200).send({
        title: "Reprograma - On7 Semana 11 - Projeto Revisão",
        version: "1.0.0"
    })
})

module.exports = router
```
Criamos nossa rota, porém ainda não fizemos nossa aplicação utilizá-la. Para isso temos que ir no arquivo *app.js*, definirmos uma constante para nossa rota "index" e setar para nossa aplicação utilizar:

```app.js
const index = require("./routes/index")
app.use("/", index)
```
Nosso arquivo *app.js* deverá então ficar da seguinte forma:

```app.js
const express = require("express")
const app = express()

//rotas
const index = require("./routes/index")

app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*") // informo que minha api poderá ser chamada de qualquer lugar. Por um browser, por exemplo.
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next() 
    // como criei uma função dentro do app.use, preciso dar um "next()" para mandar ele seguir para a próxima middleware. 
    // se eu não faço isso, a requisição vai ficar travada aí.
})

app.use("/", index)

module.exports = app
```

O *app.use* adiciona uma middleware na nossa aplicação. Por exemplo, quando fazemos ```app.use(express.json())```, estou dizendo que minha api irá trabalhar com json. Isso significa, por exemplo, que quando eu fizer um POST, minha api irá entender que vou receber um json.

Agora com a rota desenvolvida, ao executarmos no browser *http://localhost:3000* não deverá mais apresentar o erro de GET.


### Nova rota de GET para retornar os filmes

A empresa Jansen's Films acabou de te enviar uma base de dados de exemplo chamado *movies.json*. Essa contém uma listagem de filmes que deveremos trabalhar. Com a listagem em mãos, poderemos desenvolver uma rota GET que exibirá essa listagem toda vez que uma requisição para listar os filmes seja chamada.

Para que nosso projeto fique organizado, iremos colocar o arquivo *movies.json* que você recebeu dentro da pasta *model*. Iremos, em seguida, na pasta *routes* e criaremos um arquivo chamado *movies.js*. Nesse, iremos armazenar todas as rotas referentes aos filmes. Nosso projeto deverá estar com a seguinte estrutura:

```
jansensfilms
├── src
│   ├── controllers
│   ├── models
|       ├── movies.json
│   ├── routes
│       ├── index.js
│       ├── movies.js
|   ├── app.js
├── package.json
├── server.js
```

Primeiramente, deveremos informar a nossa aplicação que iremos utilizar as rotas que iremos criar para os filmes. Para isso deveremos abrir a pasta *src* e editar o arquivo *app.js* 

```app.js
const movies = require("./routes/movies")
app.use("/movies", movies)
```

Estamos dizendo para a aplicação utilizar as rotas do arquivo *movies.js* e utilizar a rota "/movies" para executá-las. Isso significa que toda vez que você chamar *http://localhost:3000/movies*, as nossas rotas de movies serão chamadas. 

Entretanto, ainda não escrevemos nenhuma rota. Para escrever nossa primeira rota que listará os filmes, deveremos abrir a pasta *routes* e editar o arquivo *movies.js*: 

```movies.js
const express = require("express")
const router = express.Router()
const controller = require("../controllers/movieController")

router.get("/", controller.getAllMovies)

module.exports = router;
```

Nessa estamos dizendo que toda vez que for utilizado o verbo GET na chamada *http://localhost:3000/movies*, o *controller.getAllMovies* será executado. Mas que *controller.getAllMovies* é esse? Precisamos criar ele ainda, certo? Então vamos lá!

Primeiramente deveremos criar nosso controller de filmes. Então na pasta *controllers* deveremos criar o arquivo *movieController.js*. Nesse, deveremos criar a função *getAllMovies* que estamos chamando na nossa rota de GET:

```movieController.js
const movies = require("../models/movies.json")

const getAllMovies = (req, res) => {
    console.log(req.url)
    res.status(200).send(movies)
}

module.exports = {
    getAllMovies,
}
```
Nesse arquivo atribuímos nosso json de filmes a uma constante que chamamos de "movies". Então ao chamar a função *getAllMovies* nós respondemos a requisição com o status 200, informando que deu tudo certo e enviando nosso json de filmes. Feito isso, nossa rota que lista todos os filmes está pronta!

### Testando a rota GET no Frontend

As desenvolvedoras Frontend enviaram uma tela que elas desenvolveram para testarmos nossa rota de GET. O html delas chama nossa rota GET que lista os filmes. Para testarmos isso, deveremos rodar nosso servidor e abrir o arquivo *index.html* que foi enviado. O mesmo irá exibir os filmes contidos no nosso json de filmes.

### Testando a rota GET via Postman

Entretanto, nós como desenvolvedoras backend, não iremos utilizar o front para ficar testando nossas rotas no momento de desenvolvimento. Usaremos uma ferramenta para isso, chamada Postman. Essa ferramenta permite testar serviços RESTful por meio do envio de requisições HTTP e da análise do seu retorno. Você pode salvar todas as suas collections e facilitar o seu dia-a-dia como pessoa desenvolvedora!

Para testar nossa rota GET de listagem de todos os filmes no Postman, deveremos clicar em New > Request. Com a nova requisição aberta, deveremos escolher na combobox o verbo HTTP *GET* e digitar *http://localhost:3000/movies*. Ao clicar no botão *send* o array de json com nossos filmes será exibido.

### Criando a rota POST

Para criar um novo filme na nossa listagem, precisaremos escrever uma rota de POST. Para isso no nosso arquivo de rotas de filmes (*routes/movies.js*), iremos incluir a seguinte rota:

```movies.js
router.post("/", controller.createMovie)
```
Nosso controller ainda não possui a função createMovie que nossa rota está chamando. Então no arquivo *controllers/movieController.js* deveremos implementar a função com o código abaixo:

```
const fs = require("fs")

const createMovie = (req, res) => {
    const { id, name, genre, synopsis, watched } = req.body
    movies.push({ id, name, genre, synopsis, watched })
    fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) { // gravando novo filme no array de filmes
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const movieFound = movies.find(movie => movie.id == id) // recupero o filme que foi criei no array de filmes      
            res.status(200).send(movieFound)
        }
    })
}

module.exports = {
    createMovie,
    getAllMovies,
}
```
De cara, na primeira linha que escrevemos, estamos importando uma biblioteca chamada fs. Essa biblioteca permite que você trabalhe com o sistema de arquivos em seu computador. Precisamos dela para escrever um novo filme no nosso arquivo *movies.json*. Entretanto, antes de utilizá-la, precisamos instalá-la na nossa aplicação. Para isso é necessário rodar no terminal o comando ```npm install fs --save```

Em seguida, dentro da função createMovie, extraímos do corpo da requisição enviada pelo cliente (req.body), as informações do filme que iremos adicionar. Em sequência adicionamos nossas informações no array de filmes (nossa listagem de filmes). Logo depois atualizamos nosso arquivo movies.json com o array de filmes com o filme que adicionamos.

Dando algum erro, devolveremos o status 500 com a mensagem de erro. Caso dê certo, devolveremos o status 200, com o filme que adicionamos e gravamos no arquivo *movies.json*.

### Testando a rota POST via Postman

Para testar via Postman, a rota POST que cria um novo filme na listagem filmes, deveremos clicar em New > Request. Com a nova requisição aberta, deveremos escolher na combobox o verbo HTTP *POST* e digitar *http://localhost:3000/movies*. Deveremos então, passar a informação do novo filme que iremos adicionar. Para isso deveremos clicar em *body* e clicar em *raw*. Logo após trocar a combobox "text" para *JSON*. Isso significa que estamos definindo que iremos enviar um JSON para nossa API quando enviarmos a requisição. Deveremos então informar o seguinte JSON:

```
{
    "id": 4,
    "name": "The Old Guard",
    "genre": "Ação",
    "synopsis": "The Old Guard é um filme de ação e ficção científica de super-heróis americano de 2020 dirigido por Gina (...)",
    "watched": false
}
```

Ao clicar no botão *send*, enviaremos nosso novo filme para ser criado na nossa API. Dando certo, o filme que enviamos será retornado em tela para a gente.

### Criando a rota GET (by id)

Para verificarmos nosso novo filme criado, o buscando pelo id 4 (o id do filme que criamos). Será necessário criar uma nova rota de GET que trará o filme, dado um id. No caso queremos que quando chamarmos a rota GET *http://localhost:3000/movies/4* nosso filme que acabamos de criar seja retornado.

Para isso, no nosso arquivo de rotas de filmes (*routes/movies.js*), deveremos incluir a seguinte rota:

```movies.js
router.get("/:id", controller.getMovie)
```
Nessa rota informamos que será passado um valor de parâmetro na nossa rota que será o parâmetro id (ex: *http://localhost:3000/movies/4* ). Mais uma vez nosso controller ainda não possui a função que estamos chamando. Então no arquivo *controllers/movieController.js* deveremos implementar a função getMovie com o código abaixo:

```movieController.js
const getMovie = (req, res) => {
    const movieId = req.params.id
    const movieFound = movies.find((movie) => movie.id == movieId)
    if (movieFound) {
        res.status(200).send(movieFound)
    } else {
        res.status(404).send({ message: "Filme não encontrado" })
    }
}

module.exports = {
    createMovie,
    getMovie,
    getAllMovies,
}
```

Nesse, atribuítmos o valor do parametro id (req.params.id) a constante *movieId*. Com isso sabemos o id que foi passado na requisição. Em seguida percorremos o array de filmes, verificando o id no filme (movie.id == movieId). Ao encontrar o filme com o id passado, o mesmo é atribuído a constante "movieFound". Se o "movieFound" tiver valor, em outras palavras, se o filme for encontrado por id, iremos responder a requisição com status 200 e enviaremos na resposta o filme encontrado. Senão, se ele não for encontrado, retornaremos um status 404 (NOT FOUND) na requisição, informando que o mesmo não foi encontrado. 

### Testando a rota GET by id via Postman

Para testar nossa rota GET passando o id como parâmetro, via Postman, deveremos clicar em New > Request. Com a nova requisição aberta, deveremos escolher na combobox o verbo HTTP *GET* e digitar *http://localhost:3000/movies/4* (escolhi o id 4 mas você pode testar com outros ids). Ao clicar no botão *send*, se você passou o id de um filme que existe na listagem, o mesmo deverá ser exibido como resposta. Mas caso você passe um id de um filme que não existe, ele deve retornar um status 404 informando que o filme não foi encontrado.

### Criando a rota PUT

Para alterarmos um filme existente no nosso arquivo *movies.json*, Deveremos implementar uma rota de PUT que deverá permitir realizar essa alteração. Para isso, no nosso arquivo de rotas de filmes (*routes/movies.js*), deveremos incluir a seguinte rota:

```movies.js
router.put("/:id", controller.updateMovie)
```
Nessa rota informamos que será passado um valor de parâmetro na nossa rota que será o parâmetro id (ex: *http://localhost:3000/movies/4* ). Deveremos ir então no arquivo *controllers/movieController.js* para implementar a função *updateMovie*, que ainda não existe, com o código abaixo:

```movieController.js
const updateMovie = (req, res) => {
    try {
        const movieId = req.params.id
        const movieToUpdate = req.body //Pego o corpo da requisição com as alterações 

        const movieFound = movies.find(movie => movie.id == movieId) // separo o filme que irei atualizar      
        const movieIndex = movies.indexOf(movieFound) // separo o indice do filme no array de filmes

        if (movieIndex >= 0) { // verifico se o filme existe no array de filmes
            movies.splice(movieIndex, 1, movieToUpdate) //busco no array o filme, excluo o registro antigo e substituo pelo novo 
        } else {
            res.status(404).send({ message: "Filme não encontrado para ser atualizado" })
        }

        fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) { // gravo meu json de filmes atualizado
            if (err) {
                res.status(500).send({ message: err }) // caso dê erro retorno status 500
            } else {
                console.log("Arquivo de filmes atualizado com sucesso!")
                const movieUpdated = movies.find(movie => movie.id == movieId) // separo o filme que modifiquei no array
                res.status(200).send(movieUpdated) // envio o filme modificado como resposta
            }
        })
    } catch (err) {
        res.status(500).send({ message: err }) // caso dê erro retorno status 500
    }
}

module.exports = {
    createMovie,
    updateMovie,
    getMovie,
    getAllMovies,
}
```

### Testando a rota PUT via Postman

Para testar, via Postman, a rota PUT que altera um filme na listagem filmes, deveremos clicar em New > Request. Com a nova requisição aberta, deveremos escolher na combobox o verbo HTTP *PUT* e digitar *http://localhost:3000/movies/4* (escolhi o id 4 mas poderia ter escolhido outro id qualquer existente na lista). Deveremos então, passar a nova informação filme que iremos atualizar. Para isso deveremos clicar em *body* e clicar em *raw*. Logo após trocar a combobox "text" para *JSON*. Isso significa que estamos definindo que iremos enviar um JSON para nossa API quando enviarmos a requisição. Deveremos então informar o seguinte JSON:

```
{
    "id": 4,
    "name": "The Old Guard",
    "genre": "Ficção científica",
    "synopsis": "The Old Guard é um filme de ação e ficção científica de super-heróis americano de 2020 dirigido por Gina (...)",
    "watched": false
}
```
Ao clicar no botão *send*, se você passou o id de um filme que existe na listagem, o mesmo deverá ser retornado com a alteração feita na resposta. Mas caso você passe um id de um filme que não existe, ele deve retornar um status 404 informando que o filme não foi encontrado para ser atualizado.

### Criando a rota PATCH

Precisamos criar uma rota para alterar apenas o status de assistido do nosso filme. Com isso poderemos informar se ele foi assistido ou não. Deveremos então implementar uma rota de PATCH que deverá permitir realizar essa alteração. Para isso, no nosso arquivo de rotas de filmes (*routes/movies.js*), deveremos incluir a seguinte rota:

```movies.js
router.patch("/:id/watched", controller.updateWatchedStatus)
```
Nessa rota informamos que será passado um valor de parâmetro na nossa rota que será o parâmetro id (ex: *http://localhost:3000/movies/4/watched* ). Deveremos ir então no arquivo *controllers/movieController.js* para implementar a função *updateWatchedStatus*, que ainda não existe, com o código abaixo:

```movieController.js
const updateWatchedStatus = (req, res) => {
    try {
        const movieId = req.params.id // pego a informação do id no parametro da requisição
        const watched = req.body.watched // pego a informação de watched no corpo da requisição. Ele terá valor true ou false, dependendo do que tiver sido passado

        const movieToUpdate = movies.find(movie => movie.id == movieId) // separo o filme que irei mudar o status
        const movieIndex = movies.indexOf(movieToUpdate) // identifico o índice do filme no meu array

        if (movieIndex >= 0) { // verifico se o filme existe no array de filmes
            movieToUpdate.watched = watched //atualizo o objeto com o novo status informando se foi assistido ou não
            movies.splice(movieIndex, 1, movieToUpdate) // removo o filme pelo índice substituindo pelo novo
        } else {
            res.status(404).send({ message: "Filme não encontrado para informar se foi assistido ou não" })
        }

        fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) { // gravo meu json de filmes atualizado
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Arquivo atualizado com sucesso!")
                const movieUpdated = movies.find((movie) => movie.id == movieId) // separo o filme que modifiquei no array
                res.status(200).send(movieUpdated) // envio o filme modificado como resposta
            }
        })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

module.exports = {
    createMovie,
    updateMovie,
    updateWatchedStatus,
    getMovie,
    getAllMovies,
}
```

### Testando a rota PATCH via Postman

Para testar, via Postman, a rota PATCH que altera o status de assistido do filme, deveremos clicar em New > Request. Com a nova requisição aberta, deveremos escolher na combobox o verbo HTTP *PATCH* e digitar *http://localhost:3000/movies/4* (escolhi o id 4 mas poderia ter escolhido outro id qualquer existente na lista). Deveremos então, passar a informação de que o filme foi assistido ou não para enviar junto na requisição. Para isso deveremos clicar em *body* e clicar em *raw*. Logo após trocar a combobox "text" para *JSON*. Deveremos então informar o seguinte JSON:

```
{
	"watched" : true
}
```
Ao clicar no botão *send*, se você passou o id de um filme que existe na listagem, o mesmo deverá ser retornado com a alteração de status feita na resposta. Mas caso você passe um id de um filme que não existe, ele deve retornar um status 404 informando que o filme não foi encontrado para ser atualizado.

## Criando a rota de DELETE

Precisamos criar uma rota para poder deletar um filme, dado um id. Deveremos então implementar uma rota de DELETE que deverá permitir deletar o filme da nossa listagem. Para isso, no nosso arquivo de rotas de filmes (*routes/movies.js*), deveremos incluir a seguinte rota:

```movies.js
router.delete("/:id", controller.deleteMovie)
```
Nessa rota informamos que será passado um valor de parâmetro na nossa rota que será o parâmetro id (ex: *http://localhost:3000/movies/4* ). Deveremos ir então no arquivo *controllers/movieController.js* para implementar a função *deleteMovie*, que ainda não existe, com o código abaixo:

```movieController.js
const deleteMovie = (req, res) => {
    try {
        const movieId = req.params.id
        const movieFound = movies.find(movie => movie.id == movieId) // encontro o filme pelo id
        const movieIndex = movies.indexOf(movieFound) // identifico o índice do filme no meu array

        if (movieIndex >= 0) { // verifico se o filme existe no array de filmes
            movies.splice(movieIndex, 1) // removo o filme pelo índice
        } else {
            res.status(404).send({ message: "Filme não encontrado para ser deletado" })
        }

        fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) { // gravo meu array de filmes sem o filme que deletei
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Filme deletado com sucesso do arquivo!")
                res.sendStatus(204)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar o filme" })
    }
}

module.exports = {
    createMovie,
    deleteMovie,
    updateMovie,
    updateWatchedStatus,
    getMovie,
    getAllMovies,
}
```

### Testando a rota DELETE via Postman

Para testar, via Postman, a rota DELETE que deleta um filme, deveremos clicar em New > Request. Com a nova requisição aberta, deveremos escolher na combobox o verbo HTTP *DELETE* e digitar *http://localhost:3000/movies/4* (escolhi o id 4 mas poderia ter escolhido outro id qualquer existente na lista). Ao clicar no botão *send*, se você passou o id de um filme que existe na listagem, deverá ser retornado um 204 NO CONTENT da API, informando que ok deu tudo certo, não tem nada para retornar. Mas caso você passe um id de um filme que não existe, ele deve retornar um status 404 informando que o filme não foi encontrado para ser deletado.

### API Pronta!

Desenvolvemos todas as rotas necessárias para nosso produto do Jansen's Films. Criamos a rota de POST (que cria um novo filme), duas rotas de GET (uma para trazer todos os filmes e uma para trazer um filme dado o id), PUT (para alterar o filme), PATCH (para alterar o status de assistido do filme) e DELETE (para deletar o filme). Com todas as rotas desenvolvidas na nossa API de filmes, basta o pessoal do front terminar o desenvolvimento para termos o produto pronto para ser lançado!

### Acabamos, e agora?

Agora que nossa API está implementada, podemos e devemos exercitar! Será que podemos melhorar nosso código? Temos linhas se códigos repetidas que poderiam virar funções e serem reaproveitadas? Sempre há algo para melhorar, então fique a vontade para mexer e melhorar o código!

Espero que tenha gostado da atividade e o segredo é praticar!!! Quanto mais exercícios fizer, melhor :) Abs e até mais!
