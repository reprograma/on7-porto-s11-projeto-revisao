const { Router } = require('express')

const clienteController = require('../src/controllers/cliente')
const contaController = require('../src/controllers/conta')
const router = Router()

router.post('/contas-clientes', clienteController.criarConta)
router.get('/contas-clientes/:nome', clienteController.pesquisarConta)
router.get("/contas-clientes/:id", clienteController.pesquisarId)
router.delete('/contas-clientes/:id', clienteController.deletarConta)
router.patch('/contas-clientes/:id/saque', contaController.efetuarSaque)
router.patch('/contas-clientes/:id', clienteController.atualizarConta)


module.exports = router