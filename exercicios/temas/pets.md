<h1 align="center">
    <br>
    <p align="center">Pets<p>
</h1>

# Let's do this

## Tema

Você já parou pra pensar se tem pet shop perto da sua casa que atenda as coisas fofas das nossas vidas?
Por exemplo, perto da minha casa só tem uma veterinária que atende gatinhos =/

---

### Pets

```json
[
    {
        "id": 1,
        "nomeFantasia": "Pet Shop 1",
        "endereco": "Avenida Paulista, 1273 - São Paulo",
        "telefone": "11 12345-6789",
        "atende": ["cães", "gatos"]
    },
    {
        "id": 2,
        "nomeFantasia": "Pet Shop 2",
        "endereco": "Niterói, 1273 - Rio de Janeiro",
        "telefone": "11 98765-4321",
        "atende": ["cães", "papagaio"] 
    }
]
```

---

#### Contratos que deverão ser entregues

| Verbo        | Recurso      | Descrição                         |
| ------------ | ------------ | --------------------------------- |
| GET          | `/pets`      | Retorna todos os pets             |
| GET          | `/pets/:id`  | Retorna apenas um pet específico  |
| POST         | `/pets`      | Cadastrar um pet                  |
| PUT          | `/pets/:id`  | Atualizar um pet específico por inteiro       |
| DELETE       | `/pets/:id`  | Deletar um pet específico         |
| PATCH        | `/pets/:id`  | Atualizar apenas um atributo de um pet específico (ex: Nome Fantasia ou Endereço ou Telefone ou Atende, fica ao seu critério)      |

---

#### Contratos para ir ao infinito e além

- [ ] Criar uma rota com filtro, para mostrar somente pets que atendem ou cães, ou gatos, etc
- [ ] Mostrar somente pets de São Paulo

---
