const express = require("express")
const router = express.Router()
const controller = require("../controllers/musicsController")

// post - criacao
router.post("/", controller.createMusic)

// delete - remoção
router.delete("/:id", controller.deleteMusic)

// put e patch - alteração
router.put("/:id", controller.updateMusic)
router.patch("/:id/favorited", controller.updateFavorited)

// get - recuperação
router.get("/", controller.getAllMusics)
router.get("/:id", controller.getMusic)

module.exports = router;
