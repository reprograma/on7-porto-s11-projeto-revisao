const series = require("../models/series.json")
const fs = require("fs")

const createSerie = (req, res) => {
    const { id, name, genre, synopsis, liked, seasons } = req.body
    series.push({ id, name, genre, synopsis, liked, seasons })
    fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) { // gravando a serie no array de series
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const serieFound = series.find(serie => serie.id == id) // recupero a serie que foi criei no array de series      
            res.status(201).send(serieFound)
        }
    })
}

const addSeason = (req, res) => {
    try {
        const serieId = req.params.id
        const serieToUpdate = series.find((serie) => serie.id == serieId) // encontrando a serie que vou adicionar a temporada
        if (serieToUpdate) { // verifico se a serie existe no array de series
            const { id, code, episodes } = req.body // temporada para adicionar
            serieToUpdate.seasons.push({ id, code, episodes }) // adicionando uma nova temporada
            fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) { // gravando a serie no array de series
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const serieUpdated = series.find(serie => serie.id == serieId) // separo a serie que adicionei a temporada
                    res.status(201).send(serieUpdated) // envio a serie com a nova temporada como resposta
                }
            })
        } else {
            res.status(404).send({ message: "Série não encontrada para adicionar temporada" })
        }
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const addEpisode = (req, res) => {
    try {
        const serieId = req.params.id
        const serieToUpdate = series.find(serie => serie.id == serieId) // encontrando a série que vou adicionar o episódio da temporada
        if (serieToUpdate) { // verifico se a serie existe no array de series
            const seasonId = req.params.seasonId
            const seasonToUpdate = serieToUpdate.seasons.find(season => season.id == seasonId) // encontrando a temporada que vou adicionar o episódio
            if (seasonToUpdate) { // verifico se a temporada existe no array de series
                const { id, code, name, watched } = req.body
                seasonToUpdate.episodes.push({ id, code, name, watched }) // adicionando novo episódio a temporada
                fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) { // gravando a serie no array de series
                    if (err) {
                        res.status(500).send({ message: err })
                    } else {
                        console.log("Arquivo atualizado com sucesso!")
                        const serieUpdated = series.find(serie => serie.id == serieId) // separo a serie que adicionei o episódio na temporada
                        res.status(201).send(serieUpdated) // envio a serie com o novo episódio na temporada como resposta
                    }
                })
            } else {
                res.status(404).send({ message: "Temporada não encontrada para adicionar episódio" })
            }
        } else {
            res.status(404).send({ message: "Série não encontrada para adicionar episódio" })
        }
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const deleteSerie = (req, res) => {
    try {
        const serieId = req.params.id
        const serieFound = series.find(serie => serie.id == serieId) // encontro a serie pelo id
        const serieIndex = series.indexOf(serieFound) // identifico o índice da série no meu array
        if (serieIndex >= 0) { // verifico se a serie existe no array de series
            series.splice(serieIndex, 1) // removo a série pelo índice
            fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) { // gravando a serie no array de series
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    res.sendStatus(204)
                }
            })
        } else {
            res.status(404).send({ message: "Série não encontrada para ser deletada" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar a série" })
    }
}

const deleteSeason = (req, res) => {
    try {
        const serieId = req.params.id
        const serieFound = series.find(serie => serie.id == serieId) // encontro a serie pelo id
        if (serieFound) { // verifico se a serie existe no array de series
            const seasonId = req.params.seasonId
            const seasonToDelete = serieFound.seasons.find(season => season.id == seasonId) // encontro a temporada pelo id
            const seasonIndex = serieFound.seasons.indexOf(seasonToDelete) // identifico o índice da temporada no meu array de série
            if (seasonIndex >= 0) { // verifico se a temporada existe no array de series
                serieFound.seasons.splice(seasonIndex, 1) // removo a temporada da série pelo índice
                fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) { // gravando a serie no array de series
                    if (err) {
                        res.status(500).send({ message: err })
                    } else {
                        console.log("Arquivo atualizado com sucesso!")
                        res.sendStatus(204)
                    }
                })
            } else {
                res.status(404).send({ message: "Temporada não encontrada para ser deletada" })
            }
        } else {
            res.status(404).send({ message: "Série não encontrada para deletar temporada" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar a temporada" })
    }
}

const deleteEpisode = (req, res) => {
    try {
        const serieId = req.params.id
        const serieFound = series.find(serie => serie.id == serieId) // encontro a serie pelo id

        if (serieFound) { // verifico se a serie existe no array de series
            const seasonId = req.params.seasonId
            const seasonFound = serieFound.seasons.find(season => season.id == seasonId) // encontro a temporada pelo id

            if (seasonFound) { // verifico se a temporada existe no array de series
                const episodeId = req.params.episodeId
                const episodeToDelete = seasonFound.episodes.find(episode => episode.id == episodeId) // encontro o episódio pelo id
                const episodeIndex = seasonFound.episodes.indexOf(episodeToDelete) // identifico o índice do episódio no meu array de seasons

                if (episodeIndex >= 0) { //verifico se o episódio existe no array de episódios
                    seasonFound.episodes.splice(episodeIndex, 1) // removo o episódio da temporada pelo índice
                    fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) { // gravando a serie no array de series
                        if (err) {
                            res.status(500).send({ message: err })
                        } else {
                            console.log("Arquivo atualizado com sucesso!")
                            res.sendStatus(204)
                        }
                    })
                } else {
                    res.status(404).send({ message: "Episódio não encontrado para ser deletado" })
                }
            } else {
                res.status(404).send({ message: "Temporada não encontrada para ter episódio deletado" })
            }
        } else {
            res.status(404).send({ message: "Série não encontrada para deletar episódio na temporada" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar episódio" })
    }
}

const updateSerie = (req, res) => {
    try {
        const serieId = req.params.id
        const serieFound = series.find(serie => serie.id == serieId) // separo a serie que irei atualizar
        const serieIndex = series.indexOf(serieFound) // separo o indice da serie no array de series

        if (serieIndex >= 0) { // verifico se a serie existe no array de series
            const serieToUpdate = req.body //Pego o corpo da requisição com as alterações
            series.splice(serieIndex, 1, serieToUpdate) // atualizando serie com os novos dados
            fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) { // gravando a serie no array de series
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const serieUpdated = series.find(serie => serie.id == serieId) // separo a serie que modifiquei no array
                    res.status(200).send(serieUpdated) // envio a serie modificada como resposta
                }
            })
        } else {
            res.status(404).send({ message: "Série não encontrada para ser atualizada" })
        }
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const updateLike = (req, res) => {
    try {
        const serieId = req.params.id
        const serieFound = series.find(serie => serie.id == serieId) // separo a serie que irei atualizar
        const serieIndex = series.indexOf(serieFound) // separo o indice da serie no array de series

        if (serieIndex >= 0) { // verifico se a serie existe no array de series
            const liked = req.body.liked
            serieFound.liked = liked
            series.splice(serieIndex, 1, serieFound) // atualizando serie com os novos dados
            fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) { // gravando a serie no array de series
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const serieUpdated = series.find(serie => serie.id == serieId) // separo a serie que modifiquei no array
                    res.status(200).send(serieUpdated) // envio a serie modificada como resposta
                }
            })
        } else {
            res.status(404).send({ message: "Série não encontrada para ser atualizada" })
        }
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const updateEpisodeWatchedStatus = (req, res) => {
    try {
        const serieId = req.params.id
        const serieFound = series.find(serie => serie.id == serieId) // encontrando a serie

        if (serieFound) { // verifico se a serie existe no array de series
            const seasonId = req.params.seasonId
            const seasonFound = serieFound.seasons.find(season => season.id == seasonId) // encontrando a temporada

            if (seasonFound) { // verifico se a temporada existe no array de series
                const episodeId = req.params.episodeId
                const episodeToUpdate = seasonFound.episodes.find(episode => episode.id == episodeId) // encontrando o episódio a ser atualizado
                const episodeIndex = seasonFound.episodes.indexOf(episodeToUpdate) // identifico o índice do episodio no meu array de episódios da temporada

                if (episodeIndex >= 0) { //verifico se o episódio existe no array de episódios
                    const watched = req.body.watched
                    episodeToUpdate.watched = watched //atualizamos o objeto com o novo status informando se foi assistido ou não
                    seasonFound.episodes.splice(episodeIndex, 1, episodeToUpdate) // removo o episodio pelo índice substituindo pelo novo
                    fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) { // gravando a serie no array de series
                        if (err) {
                            res.status(500).send({ message: err })
                        } else {
                            console.log("Arquivo atualizado com sucesso!")
                            const serieUpdated = series.find(serie => serie.id == serieId) // separo a serie que modifiquei no array
                            res.status(200).send(serieUpdated) // envio a serie modificada como resposta
                        }
                    })
                } else {
                    res.status(404).send({ message: "Episódio não encontrado para ter status de assistido alterado" })
                }
            } else {
                res.status(404).send({ message: "Temporada não encontrada ter episódio com status de assistido alterado" })
            }
        } else {
            res.status(404).send({ message: "Série não encontrada para modificar status de assistido do episódio" })
        }
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const getAllSeries = (req, res) => {
    console.log(req.url)
    res.status(200).send(series)
}

const getSerie = (req, res) => {
    const serieId = req.params.id
    const serieFound = series.find(serie => serie.id == serieId)
    if (serieFound) {
        res.status(200).send(serieFound)
    } else {
        res.status(404).send({ message: "Série não encontrada" })
    }
}

module.exports = {
    addEpisode,
    addSeason,
    createSerie,
    deleteSerie,
    deleteSeason,
    deleteEpisode,
    updateSerie,
    updateLike,
    updateEpisodeWatchedStatus,
    getSerie,
    getAllSeries
}