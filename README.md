
# API de cadastro de clientes

O projeto é uma simples API de cadastro de clientes, capaz de registrar, consultar individualmente ou retornar uma lista de clientes por meio de uma query fornecida. As informações a serem armazenadas são: nome, CPF e data de nascimento. O programa possui a funcionalidade de validar o CPF com base nos dois dígitos verificadores, além de aceitar a inserção tanto com ou sem máscara. API desenvolvida com base nos melhores padrões de projeto, evitando acoplamento e isolando as funcionalidades, assim facilitando sua manutenção e reutilização.


## Stack utilizada

**Arquitetura:** MVC

**Back-end:** Node.js, Express, MongoDB

**Testes:** Jest

## Documentação da API

#### Cadastra um novo cliente

```http
  POST /customer/create
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome da pessoa a ser cadastrada |
| `cpf` | `string` | **Obrigatório**. CPF (999.999.999-00 ou  99999999900) |
| `birthdate` | `string` | **Obrigatório**. Data de nascimento (YYYY-MM-DD) |

#### Retorna um cliente a partir de um CPF fornecido

```http
  POST /customer/findonebycpf
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `cpf` | `string` | **Obrigatório**. CPF (999.999.999-00 ou  99999999900) |

#### Retorna umas lista de clientes utilizando paginação

```http
  POST /customer/findallinrange?start=&end=
```

| Query   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `start` | `int` | **Opcional**. Onde a listagem começa (valor padrão: 0)|
| `end` | `int` | **Opcional**. Onde a listagem termina (valor padrão: 9)|






## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URI` = "<URI-DE-CONEXÃO-COM-O-MONGODB>"



## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/jonathanoliveirarocha/api-cadastro-de-clientes
```

Entre no diretório do projeto

```bash
  cd api-cadastro-de-clientes
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```


## Referência

 - [Algoritmo de Validação do CPF](https://www.macoratti.net/alg_cpf.htm#:~:text=O%20algoritmo%20de%20valida%C3%A7%C3%A3o%20do,%3A%20111.444.777-05)
