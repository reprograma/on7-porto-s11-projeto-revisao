const express = require("express")
const router = express.Router()
const controller = require("../controllers/petsController")

// post - criacao
router.post("/", controller.createPet)

// delete - remoção
router.delete("/:id", controller.deletePet)

// put e patch - alteração
router.put("/:id", controller.updatePet)
router.patch("/:id/name", controller.updateName)

// get - recuperação
router.get("/", controller.getAllPets)
router.get("/:id", controller.getPet)

module.exports = router;
