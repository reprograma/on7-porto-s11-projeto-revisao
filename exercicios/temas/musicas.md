<h1 align="center">
    <br>
    <p align="center">Músicas<p>
</h1>

# Let's do this

## Tema

Que tal montarmos nossa própria playlist de músicas? Na nossa playlist poderemos favoritar nossas músicas e ver quais artistas tocam a música.

---

### Músicas

```json
[
    {
        "id": 1,
        "title": "Evidências",
        "duration": "04:39",
        "launchYear": "1990",
        "favorited" : true,
        "artists": ["Chitãozinho","Chororó"]
    },
    {
        "id": 2,
        "title": "A Lenda",
        "duration": "04:31",
        "launchYear": "2000",
        "favorited" : true,
        "artists": ["Sandy","Júnior"]
    },
    {
        "id": 3,
        "title": "Me Espera",
        "duration": "03:50",
        "launchYear": "2016",
        "favorited" : true,
        "artists": ["Tiago Iorc","Sandy"]
    }
]
```

---

#### Contratos que deverão ser entregues

| Verbo        | Recurso                  | Descrição                              |
| ------------ | ------------------------ | -------------------------------------- |
| GET          | `/musics`                | Retornar todas as músicas              |
| GET          | `/musics/:id`            | Retornar apenas uma música específica  |
| POST         | `/musics`                | Cadastrar nova música                  |
| PUT          | `/musics/:id`            | Atualizar uma música específica        |
| DELETE       | `/musics/:id`            | Deletar uma música específica          |
| PATCH        | `/musics/:id/favorited`  | Favoritar/desfavoritar música          |

---

#### Contratos para ir ao infinito e além

- [ ] Criar uma rota com filtro, para mostrar somente músicas da Sandy.
- [ ] Mostrar somente músicas mais novas, lançadas depois de 2010.

---