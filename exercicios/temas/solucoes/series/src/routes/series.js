const express = require("express")
const router = express.Router()
const controller = require("../controllers/serieController")

// post - criacao
router.post("/", controller.createSerie)
router.post("/:id/season/:seasonId/episode", controller.addEpisode) // extra
router.post("/:id/season", controller.addSeason) // extra

// delete - remoção
router.delete("/:id", controller.deleteSerie)
router.delete("/:id/season/:seasonId", controller.deleteSeason) // extra
router.delete("/:id/season/:seasonId/episode/:episodeId", controller.deleteEpisode) // extra

// put e patch - alteração
router.put("/:id", controller.updateSerie)
router.patch("/:id/liked", controller.updateLike)
router.patch("/:id/season/:seasonId/episode/:episodeId/watched", controller.updateEpisodeWatchedStatus) // extra

// get - recuperação
router.get("/", controller.getAllSeries)
router.get("/:id", controller.getSerie)

module.exports = router;
