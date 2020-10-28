const pets = require("../models/pets.json")
const fs = require("fs")

const createPet = (req, res) => {
    const { id, nomeFantasia, endereco, telefone, atende } = req.body
    pets.push({ id, nomeFantasia, endereco, telefone, atende })
    fs.writeFile("./src/models/pets.json", JSON.stringify(pets), 'utf8', function (err) { // gravando novo pet no array de pets
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const petFound = pets.find(pet => pet.id == id) // recupero o pet que foi criado no array de pets      
            res.status(200).send(petFound)
        }
    })
}

const deletePet = (req, res) => {
    try {
        const petId = req.params.id
        const petFound = pets.find(pet => pet.id == petId) // encontro o pet pelo id
        const petIndex = pets.indexOf(petFound) // identifico o índice do pet no meu array

        if (petIndex >= 0) { // verifico se o pet existe no array de pets
            pets.splice(petIndex, 1) // removo o pet pelo índice
            fs.writeFile("./src/models/pets.json", JSON.stringify(pets), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Pet deletado com sucesso do arquivo!")
                    res.sendStatus(204)
                }
            })
        } else {
            res.status(404).send({ message: "Pet não encontrado para ser deletado" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar o pet" })
    }
}

const updatePet = (req, res) => {
    try {
        const petId = req.params.id
        const petToUpdate = req.body //Pego o corpo da requisição com as alterações

        const petFound = pets.find(pet => pet.id == petId) // separo o pet que irei atualizar
        const petIndex = pets.indexOf(petFound) // separo o indice do pet no array de pets

        if (petIndex >= 0) { // verifico se o pet existe no array de pets
            pets.splice(petIndex, 1, petToUpdate) // atualizando o array de pets com os novos dados

            fs.writeFile("./src/models/pets.json", JSON.stringify(pets), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const petUpdated = pets.find(pet => pet.id == petId) // separo o pet que modifiquei no array
                    res.status(200).send(petUpdated) // envio o pet modificado como resposta
                }
            })
        } else {
            res.status(404).send({ message: "Pet não encontrado para ser atualizado" })
        }

    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const updateName = (req, res) => {
    try {
        const petId = req.params.id
        const nomeFantasia = req.body.nomeFantasia
        const petFound = pets.find(pet => pet.id == petId) // encontrando o pet
        const petIndex = pets.indexOf(petFound) // identifico o índice do pet no meu array

        if (petIndex >= 0) { // verifico se o pet existe no array de pets
            petFound.nomeFantasia = nomeFantasia //atualizamos o objeto com o novo nome
            pets.splice(petIndex, 1, petFound) // atualizando o array de pets com o pet atualizado

            fs.writeFile("./src/models/pets.json", JSON.stringify(pets), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Arquivo atualizado com sucesso!")
                    const petpdated = pets.find(pet => pet.id == petId) // separo o pet que modifiquei no array
                    res.status(200).send(petpdated) // envio o pet modificado como resposta
                }
            })
        } else {
            res.status(404).send({ message: "Pet não encontrado para modificar o nome." })
        }

    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const getAllPets = (req, res) => {
    const animal = req.query.animal // puxamos a informação de animal da nossa query string
    const estado = req.query.estado // puxamos a informação de estado da nossa query string
    let allPets = pets
    if (animal) { // se eu tiver passado a query string com o animal na hora de fazer a request...
        allPets = pets.filter(pet => pet.atende.includes(animal)) // encontro todos os pets que atende o animal
    }
    if (estado) {
        const petByEstado = pets.filter(pet => pet.endereco.includes(estado)) // encontro todos os pets que possuem o estado no endereco
        if (animal) { // o filtro de animal foi informado?
            allPets = petByEstado.filter(pet => allPets.includes(pet)) // encontro a interseção dos pets filtrados por animal e endereco
        } else {
            allPets = petByEstado
        }
    }
    res.status(200).send(allPets) // retorna todos os pets filtrados ou nao
}

const getPet = (req, res) => {
    const petId = req.params.id
    const petFound = pets.find(pet => pet.id == petId)
    if (petFound) {
        res.status(200).send(petFound)
    } else {
        res.status(404).send({ message: "Pet não encontrado" })
    }
}

module.exports = {
    createPet,
    deletePet,
    updateName,
    updatePet,
    getAllPets,
    getPet,
}