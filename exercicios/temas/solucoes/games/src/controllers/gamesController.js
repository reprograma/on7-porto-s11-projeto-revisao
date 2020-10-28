const games = require("../models/games.json")
const fs = require("fs")

const createGame = (req, res) => {
    const { id, title, launchYear, liked, consoles, stages } = req.body
    games.push({ id, title, launchYear, liked, consoles, stages })
    fs.writeFile("./src/models/games.json", JSON.stringify(games), 'utf8', function (err) { // gravando novo game no array de games
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const gameFound = games.find(game => game.id == id) // recupero o game que foi criado no array de games      
            res.status(200).send(gameFound)
        }
    })
}

const deleteGame = (req, res) => {
    try {
        const gameId = req.params.id
        const gameFound = games.find(game => game.id == gameId) // encontro o game pelo id
        const gameIndex = games.indexOf(gameFound) // identifico o índice do game no meu array

        if (gameIndex >= 0) { // verifico se o game existe no array de games
            games.splice(gameIndex, 1) // removo o game pelo índice
            fs.writeFile("./src/models/games.json", JSON.stringify(games), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Game deletado com sucesso do arquivo!")
                    res.sendStatus(204)
                }
            })
        } else {
            res.status(404).send({ message: "Game não encontrado para ser deletado" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar o game" })
    }
}

const updateGame = (req, res) => {
    try {
        const gameId = req.params.id
        const gameToUpdate = req.body //Pego o corpo da requisição com as alterações

        const gameFound = games.find(game => game.id == gameId) // separo o game que irei atualizar
        const gameIndex = games.indexOf(gameFound) // separo o indice do game no array de games

        if (gameIndex >= 0) { // verifico se o game existe no array de games
            games.splice(gameIndex, 1, gameToUpdate) // atualizando o array de games com os novos dados

            fs.writeFile("./src/models/games.json", JSON.stringify(games), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const gameUpdated = games.find(game => game.id == gameId) // separo o game que modifiquei no array
                    res.status(200).send(gameUpdated) // envio o game modificado como resposta
                }
            })
        } else {
            res.status(404).send({ message: "Game não encontrado para ser atualizado" })
        }

    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const updateLiked = (req, res) => {
    try {
        const gameId = req.params.id
        const liked = req.body.liked
        const gameFound = games.find(game => game.id == gameId) // encontrando o game
        const gameIndex = games.indexOf(gameFound) // identifico o índice do game no meu array

        if (gameIndex >= 0) { // verifico se o game existe no array de games
            gameFound.liked = liked //atualizamos o objeto com o novo nome
            games.splice(gameIndex, 1, gameFound) // atualizando o array de games com o game atualizado

            fs.writeFile("./src/models/games.json", JSON.stringify(games), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const gamepdated = games.find(game => game.id == gameId) // separo o game que modifiquei no array
                    res.status(200).send(gamepdated) // envio o game modificado como resposta
                }
            })
        } else {
            res.status(404).send({ message: "Game não encontrado para registrar o like." })
        }

    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const getAllGames = (req, res) => {
    const console = req.query.console // puxamos a informação de console (ex: nintendo64) da nossa query string
    const beforeLaunchYear = req.query.beforeLaunchYear // puxamos a informação de ano de lançamento que queremos usar para filtrar antes do ano tal, por exemplo, poderia ser o valor 2000
    let allgames = games
    if (console) { // se eu tiver passado a query string com o artista na hora de fazer a request...
        allgames = games.filter(game => game.consoles.includes(console)) // encontro todas as games do artista
    }
    if (beforeLaunchYear) {
        const gameAfterLaunchYear = games.filter(game => game.launchYear > beforeLaunchYear) // encontro todas as games lançadas após o ano que utilizei no filtro.
        if (console) { // o filtro de animal foi informado?
            allgames = gameAfterLaunchYear.filter(game => allgames.includes(game)) // encontro a interseção das games filtradas por artista e ano de lançamento posterior
        } else {
            allgames = gameAfterLaunchYear
        }
    }
    res.status(200).send(allgames) // retorna todas as games filtradas ou nao
}

const getGame = (req, res) => {
    const gameId = req.params.id
    const gameFound = games.find(game => game.id == gameId)
    if (gameFound) {
        res.status(200).send(gameFound)
    } else {
        res.status(404).send({ message: "Game não encontrado" })
    }
}

module.exports = {
    createGame,
    deleteGame,
    updateLiked,
    updateGame,
    getAllGames,
    getGame,
}