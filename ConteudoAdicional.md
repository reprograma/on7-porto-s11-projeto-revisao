<h1 align="center">
    <br>
    <p align="center">Conteúdo Adicional<p>
</h1>

# Para saber mais...

Olá meninas! Como fomos na aula da Semana 11? Espero que tenham gostado :)

Nessa aula de revisão fixamos conteúdos que vocês já tinham visto e de quebra acabamos aprendendo coisas novas, não é verdade? Vamos recordar o que vimos de novo!

![coruja](https://i.pinimg.com/600x315/9c/89/a6/9c89a66d513977abc3bbb93af8af9a3b.jpg)

## Query string

Quando precisamos fazer um filtro de busca, é uma boa prática utilizarmos a *query string* na nossa rota. Isso porque quando vou fazer uma busca em uma rota GET, o filtro é opcional (podemos ver o Google fazendo isso e o Youtube também). 

Caso nossa página de busca de filmes tivesse como opção filtrar ou não por gênero, precisaríamos implementar a rota de *getAllMovies* com a *query string*. Então nós alteramos nosso código de *getAllMovies* para que sejam retornados todos os filmes e também para que aceite filtrar por gênero, quando esse for passado.

Nosso código ficou da seguinte maneira:

```movieController.js
const getAllMovies = (req, res) => {
    console.log("Minha query string:")
    console.log(res.query)
    const genre = req.query.genre // puxamos a informação de gênero da nossa query string
    if (genre) { // se eu tiver passado a query string com o gênero na hora de fazer a request...
        //filtra por genero meus filmes
        //Por exemplo: "Aventura" está inclusa nesse array? -> [ "Aventura", "Comedia"]
        const moviesByGenre = movies.filter(movie => movie.genre.includes(genre)) // encontro todos os filmes do gênero que filtrei
        res.status(200).send(moviesByGenre) // retorno apenas os filmes com o gênero que filtrei por query string
    } else { // se eu NAO tiver passado genero na minha query string...
        res.status(200).send(movies) // retorna todos os filmes sem filtro
    }
}
```

E o a nossa chamada pelo Postman utilizando a query String ficou da seguinte maneira:

![postman_querystring](https://i.imgur.com/F2os1zo.png)

Poderíamos colocar vários filtros diferentes e trabalhar com cada um deles. No caso, a cada parametro a mais na nossa *query string*, devemos intercalar cada um deles com *&*. Caso precisemos adicionar "espaço" a nossa string, utilizamos *%20*, como o caso de *Comédia%20Romântica*. Então nossa chamada poderia ficar assim com mais um parâmetro *name* na nossa *querystring*:

```
http://localhost:3000/movies?genre=Comédia%20Romântica&name=NomeDoMeuFilme
```

Mas lembrando que o código que implementamos no *getAllMovies* só filtra pelo gênero. Nesse caso, se quiséssemos filtrar também pelo nome do filme, teríamos que implementar também o filtro de *name* na nossa função *getAllMovies*.

## For percorrendo manualmente um array

Aprendemos ao longo do curso que podemos percorrer um array utilizando o *forEach*. Agora também sabemos que podemos também fazer um *for* (percorrer um array) de forma manual. Essa forma manual nos abre possibilidades para que possamos construir diversas lógicas. Mas como podemos fazer isso mesmo? Vamos relembrar?

Primeiramente, é importante lembrar que o array começa SEMPRE na posição 0 (zero). Exemplo:

```
const meuArray = ['Livro 1', 'Livro 2', 'Livro 3']
console.log(`Meu elemento: ${meuArray[0]}`)
console.log(`Meu elemento: ${meuArray[1]}`)
console.log(`Meu elemento: ${meuArray[2]}`)

```
Se rodarmos o código acima, teremos algo assim no nosso terminal:

```
Meu elemento: Livro 1
Meu elemento: Livro 2
Meu elemento: Livro 3
```

Podemos utilizar um for de forma manual para percorrer esse mesmo array do exemplo acima, utilizando a estrutura:

```
for (let posicao = 0; posicao < tamanhoDoMeuArray; posicao++) {
  // codigo que vamos escrever para percorrer
}
```

Nesse código do for, declaramos uma variável posição que não é constante, ela se modifica conforme vai acontecendo o *loop* do for. Então nesse caso ao invés de usar *cons posicao = 0*, usamos o *let* fazendo *let posicao = 0*. Em adição, atribuímos o valor 0 (zero) a variável *posicao* para dizer que ela irá inicializar com 0 (zero).

Em seguida, colocamos uma codicional para que o for continue rodando. A condição é *posicao < tamanhoDoMeuArray*. Enquanto minha posição for menor que o tamanho do meu array (enquanto ele não terminar de percorrer meu array), quero que o for continue a iteração.

Ao final, temos o incremento que iremos fazer a nossa variável posição. A cada iteração do for (a cada loop), a posicao executará *posicao++*. O *posicao++* é a mesma coisa de let posicao = posicao + 1. O *posicao++* soma 1 a variável posicao.

Com isso para percorrer o array de forma manual utilizando o array, podemos fazer da seguinte maneira:

```
const meuArray = ['Livro 1', 'Livro 2', 'Livro 3']
const tamanhoDoMeuArray = meuArray.length
for (let posicao = 0; posicao < tamanhoDoMeuArray; posicao++) {
  console.log(`Minha posição: ${posicao}`)
  console.log(`Meu elemento: ${meuArray[posicao]}`)
}
```
No caso se rodarmos esse código o nosso terminal irá exibir algo assim:

```
Minha posição: 0
Meu elemento: Livro 1
Minha posição: 1
Meu elemento: Livro 2
Minha posição: 2
Meu elemento: Livro 3
```


No exemplo da aula de hoje, inventamos juntas que nossa rota de *DELETE* não iria apenas ter a regra de deletar nosso filme dado um id. Teria, na verdade, uma lógica um pouquinho mais complexa:

- [ ] Caso meu array *moviesFound* tivesse apenas 1 elemento esse seria deletado.
- [ ] Porém (|| -> símbolo que utilizei no código que sinifica OU, Porém, Todavia...), se ele tivesse mais de um elemento, ele manteria o primeiro elemento sempre e eliminaria os demais repetidos.

A regra que inventamos não faz muito sentido na prática para nosso produto de Filmes, mas é legal para treinarmos. Então nosso deleteMovie tinha ficado da seguinte maneira com essa regra que inventamos:

```movieController.js
const deleteMovie = (req, res) => {
    try {
        const movieId = req.params.id
        const moviesFound = movies.filter(movie => movie.id == movieId) // vou achar todos os filmes que possuem o id passado

        if (moviesFound) {// o filme existe no meu array?

            for (let position = 0; position < moviesFound.length; position++) {
                console.log(`Posição: ${position}`) // exibo o valor da minha variável de posição
                console.log(moviesFound[position]) // exibo o filme que está nessa posição do array moviesFound

                if ( moviesFound.length == 1 || (moviesFound.length > 1 && position > 0)) { // aplico a lógica que inventamos de deletar apenas quando só tiver um elemento no array (tamanho do array for 1) ou quando tiver mais de um elemento, deletar todos que não forem da primeira posição
                    //deletar
                    const movieIndex = movies.indexOf(moviesFound[position])
                    movies.splice(movieIndex, 1)
                }
            }
            fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Filme deletado com sucesso do arquivo!")
                    res.sendStatus(204) // 204 No Content
                }
            })
        } else {
            // se o filme não foi encontrado
            res.status(400).send({ message: "Filme não encontrado para deletar" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Erro ao deletar filme" })
    }
}
```
