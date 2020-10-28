const musics = require("../models/musics.json")
const fs = require("fs")

const createMusic = (req, res) => {
    const { id, title, duration, launchYear, favorited, artists } = req.body
    musics.push({ id, title, duration, launchYear, favorited, artists })
    fs.writeFile("./src/models/musics.json", JSON.stringify(musics), 'utf8', function (err) { // gravando nova música no array de músicas
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const musicFound = musics.find(music => music.id == id) // recupero a música que foi criada no array de músicas      
            res.status(200).send(musicFound)
        }
    })
}

const deleteMusic = (req, res) => {
    try {
        const musicId = req.params.id
        const musicFound = musics.find(music => music.id == musicId) // encontro a música pelo id
        const musicIndex = musics.indexOf(musicFound) // identifico o índice da música no meu array

        if (musicIndex >= 0) { // verifico se a música existe no array de músicas
            musics.splice(musicIndex, 1) // removo o music pelo índice
            fs.writeFile("./src/models/musics.json", JSON.stringify(musics), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Música deletada com sucesso do arquivo!")
                    res.sendStatus(204)
                }
            })
        } else {
            res.status(404).send({ message: "Música não encontrada para ser deletada" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar a música" })
    }
}

const updateMusic = (req, res) => {
    try {
        const musicId = req.params.id
        const musicToUpdate = req.body //Pego o corpo da requisição com as alterações

        const musicFound = musics.find(music => music.id == musicId) // separo a música que irei atualizar
        const musicIndex = musics.indexOf(musicFound) // separo o indice da música no array de músicas

        if (musicIndex >= 0) { // verifico se a música existe no array de músicas
            musics.splice(musicIndex, 1, musicToUpdate) // atualizando o array de músicas com os novos dados

            fs.writeFile("./src/models/musics.json", JSON.stringify(musics), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const musicUpdated = musics.find(music => music.id == musicId) // separo a música que modifiquei no array
                    res.status(200).send(musicUpdated) // envio a música modificada como resposta
                }
            })
        } else {
            res.status(404).send({ message: "Música não encontrada para ser atualizada" })
        }

    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const updateFavorited = (req, res) => {
    try {
        const musicId = req.params.id
        const favorited = req.body.favorited
        const musicFound = musics.find(music => music.id == musicId) // encontrando a música
        const musicIndex = musics.indexOf(musicFound) // identifico o índice da música no meu array

        if (musicIndex >= 0) { // verifico se a música existe no array de músicas
            musicFound.favorited = favorited //atualizamos o objeto com o novo nome
            musics.splice(musicIndex, 1, musicFound) // atualizando o array de músicas com a música atualizada

            fs.writeFile("./src/models/musics.json", JSON.stringify(musics), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const musicpdated = musics.find(music => music.id == musicId) // separo a música que modifiquei no array
                    res.status(200).send(musicpdated) // envio a música modificada como resposta
                }
            })
        } else {
            res.status(404).send({ message: "Música não encontrada para modificar o nome." })
        }

    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const getAllMusics = (req, res) => {
    const artist = req.query.artist // puxamos a informação de artista (ex: Sandy) da nossa query string
    const afterLaunchYear = req.query.afterLaunchYear // puxamos a informação de ano de lançamento que queremos usar para filtrar após ano tal, por exemplo, poderia ser o valor 2010
    let allmusics = musics
    if (artist) { // se eu tiver passado a query string com o artista na hora de fazer a request...
        allmusics = musics.filter(music => music.artists.includes(artist)) // encontro todas as músicas do artista
    }
    if (afterLaunchYear) {
        const musicAfterLaunchYear = musics.filter(music => music.launchYear > afterLaunchYear) // encontro todas as músicas lançadas após o ano que utilizei no filtro.
        if (artist) { // o filtro de animal foi informado?
            allmusics = musicAfterLaunchYear.filter(music => allmusics.includes(music)) // encontro a interseção das músicas filtradas por artista e ano de lançamento posterior
        } else {
            allmusics = musicAfterLaunchYear
        }
    }
    res.status(200).send(allmusics) // retorna todas as músicas filtradas ou nao
}

const getMusic = (req, res) => {
    const musicId = req.params.id
    const musicFound = musics.find(music => music.id == musicId)
    if (musicFound) {
        res.status(200).send(musicFound)
    } else {
        res.status(404).send({ message: "Música não encontrada" })
    }
}

module.exports = {
    createMusic,
    deleteMusic,
    updateFavorited,
    updateMusic,
    getAllMusics,
    getMusic,
}