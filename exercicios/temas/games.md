<h1 align="center">
    <br>
    <p align="center">Games<p>
</h1>

# Let's do this

## Games

Que tal controlarmos nossos jogos e as fases que já conseguimos passar?

---

### Games

```json
[
    {
        "id": 1,
        "title": "Fall Guys",
        "launchYear": "2020",
        "consoles": ["ps4"],
        "liked": true,
        "stages": [
            {
                "id": 1,
                "name": "Loucura nas Alturas",
                "done": true
            },
            {
                "id": 2,
                "name": "Gangorra",
                "done": false
            }
        ]
    },
    {
        "id": 2,
        "title": "Mario Kart",
        "launchYear": "1992",
        "consoles": ["superNintendo", "nintendo64", "nintendoSwitch"],
        "liked": false,
        "stages": [
            {
                "id": 1,
                "name": "Ghost Valley",
                "done": false
            },
            {
                "id": 2,
                "name": "Baby Park",
                "done": true
            }
        ]
    },
    {
        "id": 3,
        "title": "Super Smash Bross",
        "launchYear": "1999",
        "consoles": ["nintendo64", "nintendoSwitch"],
        "liked": true,
        "stages": [
            {
                "id": 1,
                "name": "Zelda",
                "done": false
            },
            {
                "id": 2,
                "name": "Pokemon",
                "done": true
            },
            {
                "id": 3,
                "name": "Kirby",
                "done": false
            }
        ]
    }
]
```

---

#### Contratos que deverão ser entregues

| Verbo        | Recurso             | Descrição                          |
| ------------ | --------------------| -----------------------------------|
| GET          | `/games`            | Retornar todos os jogos            |
| GET          | `/games/:id`        | Retornar apenas um jogo específico |
| POST         | `/games`            | Cadastrar novo jogo                |
| PUT          | `/games/:id`        | Atualizar um jogo específico       |
| DELETE       | `/games/:id`        | Deletar uma jogo específico        |
| PATCH        | `/games/:id/liked`  | Atualizar se gostou do jogo ou não |

---

#### Contratos para ir ao infinito e além

- [ ] Criar uma rota com filtro, para mostrar somente jogos que existem para o console nintendo64
- [ ] Mostrar somente jogos mais antigos, lançados antes dos anos 2000.
- [ ] Criar uma rota PATCH para setar "done" true ou false, informando dessa maneira, se já passou da fase do jogo ou não.

---
