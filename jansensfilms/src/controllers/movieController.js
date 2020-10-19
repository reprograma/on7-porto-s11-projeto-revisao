const movies = require("../models/movies.json")
const fs = require("fs")

const getAllMovies = (req, res) => {
    console.log("Minha query string:")
    console.log(req.query)
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

const createMovie = (req, res) => {
    const { id, name, genre, synopsis, watched } = req.body
    movies.push({ id, name, genre, synopsis, watched }) // adicionando meu filme no array de filmes
    fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) {
        if (err) {
            res.status(500).send({ message: err }) //responder com o erro
        } else {
            console.log("O filme foi gravado no arquivo com sucesso!")
            const movieFound = movies.find(movie => movie.id == id) // recupero o filme que criei no array de filmes
            res.status(200).send(movieFound)
        }
    })
}

const getMovie = (req, res) => {
    const movieId = req.params.id
    const movieFound = movies.find(movie => movie.id == movieId)

    if (movieFound) {
        res.status(200).send(movieFound)
    } else {
        // 404 Not Found -> nao encontrei o filme pelo id
        res.status(404).send({ message: "Filme não encontrado" })
    }
}

const updateMovie = (req, res) => {
    const movieId = req.params.id
    const movieToUpdate = req.body

    const movieFound = movies.find(movie => movie.id == movieId) //separei o filme que vou atualizar
    const movieIndex = movies.indexOf(movieFound) // separei o indice do filme no meu array de filmes

    if (movieIndex >= 0) { // verifico se o filme existe no array de filmes
        // filme foi encontrado
        movies.splice(movieIndex, 1, movieToUpdate) // busco no array o filme, excluo o registro antigo e subtituo pelo novo
        fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err }) // caso de erro retorno status 500
            } else {
                console.log("Arquivo de filme foi atualizado com sucesso!")
                const movieUpdated = movies.find(movie => movie.id == movieId)
                res.status(200).send(movieUpdated)
            }
        })
    } else {
        //filme nao foi encontrado
        res.status(404).send({ message: "Filme não encontrado para ser atualizado!" })
    }
}

const updateWatchedStatus = (req, res) => {
    try {
        const movieId = req.params.id
        const newWatched = req.body.watched // status se foi assistido (true) ou se nao foi assistido (false)

        const movieToUpdate = movies.find(movie => movie.id == movieId) // spearei o filme que irei mudar o status de assistido
        const movieIndex = movies.indexOf(movieToUpdate)

        if (movieIndex >= 0) {
            // achei o filme
            movieToUpdate.watched = newWatched // atribuo o novo status
            movies.splice(movieIndex, 1, movieToUpdate) // atualizo meu array de filmes
            fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    console.log("Arquivo de filme foi atualizado com sucesso!")
                    const movieUpdated = movies.find(movie => movie.id == movieId)
                    res.status(200).send(movieUpdated)
                }
            })
        } else {
            // nao achei o filme
            res.status(400).send({ message: "Filme não encontrado para atualizar o status de asssistido" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Erro na api")
    }

}

const deleteMovie = (req, res) => {
    try {
        const movieId = req.params.id
        const moviesFound = movies.filter(movie => movie.id == movieId) // encontro todos os filmes com o id buscado

        if (moviesFound && moviesFound.length > 0) {
            moviesFound.forEach(movie => { // deleto cada um dos filmes encontrados e vou deletar cada um deles
                const movieIndex = movies.indexOf(movie)
                movies.splice(movieIndex, 1)
            })

            fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Filme deletado com sucesso do arquivo!")
                    res.sendStatus(204) // 204 No Content - sem corpo de resposta, apenas o status
                }
            })

        } else {
            res.status(400).send({ message: "Filme não encontrado para deletar" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Erro ao deletar filme" })
    }
}

module.exports = {
    getAllMovies,
    createMovie,
    getMovie,
    updateMovie,
    updateWatchedStatus,
    deleteMovie
}