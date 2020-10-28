const express = require("express")
const router = express.Router()
const controller = require("../controllers/gamesController")

// post - criacao
router.post("/", controller.createGame)

// delete - remoção
router.delete("/:id", controller.deleteGame)

// put e patch - alteração
router.put("/:id", controller.updateGame)
router.patch("/:id/liked", controller.updateLiked)

// get - recuperação
router.get("/", controller.getAllGames)
router.get("/:id", controller.getGame)

module.exports = router;
