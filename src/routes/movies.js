const express = require("express")
const router = express.Router()
const controller = require("../controllers/movieController")

//http://localhost:3000/movies
// GET retorna todos os meus filmes
router.get("/", controller.getAllMovies)

//http://localhost:3000/movies
// POST adicionar um novo filme
router.post("/", controller.createMovie)

//http://localhost:3000/movies/:id
// GET by id retornar um filme especifico daquele id
router.get("/:id", controller.getMovie)

//http://localhost:3000/movies/:id
// PUT altera integralmente o meu filme
router.put("/:id", controller.updateMovie)

//http://localhost:3000/movies/:id/watched
// PATCH alterar o watched informando se o filme foi assistido ou nao
router.patch("/:id/watched", controller.updateWatchedStatus)

// DELETE para deletar o meu filme do meu array
router.delete("/:id", controller.deleteMovie)

module.exports = router