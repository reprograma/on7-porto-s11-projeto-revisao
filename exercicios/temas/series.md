<h1 align="center">
    <br>
    <p align="center">Series<p>
</h1>

# Let's do this

## Tema

Durante a aula, fizemos juntas uma api para controlar os filmes que queremos assistir. Que tal fazermos uma para controlar nossas séries? Nessa api queremos poder cadastrar séries, cada uma com inúmeras temporadas e cada temporada com uma lista de episódios.

---

### Series

```json
[
    {
        "id": 1,
        "name": "Hanna",
        "genre": "Aventura",
        "synopsis": "Um suspense bem elaborado e um drama sobre o amadurecimento, HANNA segue a jonada de uma jovem (...)",
        "liked": true,
        "seasons": [
            {
                "id": 1,
                "code": "season01",
                "episodes": [
                    {
                        "id": 1,
                        "code": "ep01",
                        "name": "Episódio 1",
                        "watched": true
                    },
                    {
                        "id": 2,
                        "code": "ep02",
                        "name": "Episódio 2",
                        "watched": false
                    },
                    {
                        "id": 3,
                        "code": "ep03",
                        "name": "Episódio 3",
                        "watched": false
                    }
                ]
            },
            {
                "id": 2,
                "code": "season02",
                "episodes": [
                    {
                        "id": 1,
                        "code": "ep01",
                        "name": "Episódio 1",
                        "watched": false
                    },
                    {
                        "id": 2,
                        "code": "ep02",
                        "name": "Episódio 2",
                        "watched": false
                    },
                    {
                        "id": 3,
                        "code": "ep03",
                        "name": "Episódio 3",
                        "watched": false
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "name": "Friends",
        "genre": "Comédia",
        "synopsis": "Seis jovens são unidos por laços familiares românticos e, principalmente, de amizade, enquanto (...)",
        "liked": false,
        "seasons": [
            {
                "id": 1,
                "code": "season01",
                "episodes": [
                    {
                        "id": 1,
                        "code": "ep01",
                        "name": "Aquele onde tudo começa",
                        "watched": true
                    },
                    {
                        "id": 2,
                        "code": "ep02",
                        "name": "Aquele com o Ultrassom",
                        "watched": false
                    },
                    {
                        "id": 3,
                        "code": "ep03",
                        "name": "Aquele com o Dedão",
                        "watched": true
                    },
                    {
                        "id": 4,
                        "code": "ep04",
                        "name": "Aquele com o George",
                        "watched": false
                    }
                ]
            },
            {
                "id": 2,
                "code": "season02",
                "episodes": [
                    {
                        "id": 1,
                        "code": "ep01",
                        "name": "Aquele com a nova namorada",
                        "watched": false
                    },
                    {
                        "id": 2,
                        "code": "ep02",
                        "name": "Aquele do leite materno",
                        "watched": false
                    }
                ]
            }
        ]
    }
]
```

---

#### Contratos que deverão ser entregues

| Verbo        | Recurso                | Descrição                             |
| ------------ | ---------------------- | ------------------------------------- |
| GET          | `/series`              | Retornar todas as séries              |
| GET          | `/series/:id`          | Retornar apenas uma série específica  |
| POST         | `/series`              | Cadastrar nova série                  |
| PUT          | `/series/:id`          | Atualizar uma série específica        |
| DELETE       | `/series/:id`          | Deletar uma série específica          |
| PATCH        | `/series/:id/liked`    | Atualizar se gostou da série ou não   |

---

#### Contratos para ir ao infinito e além

Nossa API de séries contém várias temporadas e essas contém vários episódios. Podemos criar mais algumas rotas para trabalhar com essas temporadas e episódios:

| Verbo        | Recurso                | Descrição                             |
| ------------ | ---------------------- | ------------------------------------- |
| POST         | `/series/:id/season/:seasonId/episode` | Cadastrar novo episódio na temporada, onde :id é o id da série e :seasonId é o id da temporada |
| POST         | `/series/:id/season`                   | Cadastrar nova temporada na série, onde o :id é o id da série |
| DELETE       | `/series/:id/season/:seasonId`         | Deletar uma temporada específica, onde :id é o id da série e :seasonId é o id da temporada |
| DELETE       | `/series/:id/season/:seasonId/episode/:episodeId` | Deletar um episódio específico na temporada, onde :id é o id da série, :seasonId é o id da temporada e :episodeId é o id do episódio |
| PATCH        | `/series/:id/season/:seasonId/episode/:episodeId/watched` | Atualizar se o episódio foi assistido ou não, onde :id é o id da série, :seasonId é o id da temporada e :episodeId é o id do episódio |

---