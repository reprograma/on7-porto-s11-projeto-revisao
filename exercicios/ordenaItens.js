const run = () => {
    const itens = []
    itens.push({ nome: "Televisão", preco: 4000 }) //0 
    itens.push({ nome: "Máquina de Lavar Roupa", preco: 2500 }) //1
    itens.push({ nome: "Microondas", preco: 450 }) //2
    itens.push({ nome: "Cama", preco: 2500 }) //3
    itens.push({ nome: "Fogão", preco: 1600 }) //4
    // tamanho -> 5
    const maisBarato = buscaMenor(itens, 0, itens.length - 1)
    console.log(maisBarato)
    console.log(`O ${itens[maisBarato].nome} é o mais barato, e custa ${itens[maisBarato].preco}`)
}

const buscaMenor = (itens, inicio, termino) => {
    let maisBarato = inicio
    // microondas
    for (let atual = 0; atual <= termino; atual++) {
        if (itens[atual].preco < itens[maisBarato].preco) {
            maisBarato = atual
        }
    }
    return maisBarato
}

run()