# 📌 CRMPro API

API oficial do **CRMPro**, um sistema de gerenciamento de relacionamento com clientes voltado para automação de vendas, gestão de clientes e produtos com integração segura.

> ⚠️ **Uso restrito.** Este software é proprietário e protegido por direitos autorais. Consulte a seção [Licença](#-licença) para mais detalhes.

---
## 🛠️ Requisitos

- Node.js (v16 ou superior)
- MySQL (banco de dados relacional)

---

## ⚙️ Instalação

1. Clone este repositório:
   ```sh
      git clone <URL_DO_REPOSITORIO>
   ```
2. Instale as dependências:
   ```sh
      npm install
   ```
3. Crie o arquivo .env em src/ com:
   ```env
      USER_SMTP=""
      EMAIL_ADDRESS=""
      PASSWORD_SMTP=""
      HOT_SMTP= ""
      PORT_SMTP=

      DB_HOST=""
      DB_USER=""
      DB_PASSWORD=""
      DB_NAME=""
      DB_PORT=""

      WAAPI_API_TOKEN=
   ```
4. Configure o knexfile.js com as credenciais do seu banco de dados MySQL.
    ```js
    module.exports = {
      client: 'mysql',
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306
      },
      migrations: {
        directory: './src/connection/migrations'
      },
      seeds: {
        directory: './src/connection/seeds'
      }
    };
   ```

## Execução

- Modo de desenvolvimento:
  ```sh
  npm run dev
  ```

- Modo de produção:
  ```sh
  npm start
  ```

## 🧪 Endpoints principais

### 🔐 Autenticação

- **POST /login**
  - Request Body:
    ```json
    {
      "user": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "token": "string"
    }
    ```

### 👤 Usuários

- **POST /users**
  - Request Body:
    ```json
    {
      "nome": "string",
      "telefone": "string",
      "email": "string",
      "user": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "id": "number"
    }
    ```

### 👥 Clientes

- **POST /clients**
  - Request Body:
    ```json
    {
      "nome": "string",
      "sexo": "string",
      "email": "string",
      "telefone": "string",
      "id_user": "number"
    }
    ```
  - Response:
    ```json
    {
      "id": "number"
    }
    ```

### 📦 Produtos

- **POST /products**
  - Request Body:
    ```json
    {
      "modelo": "string",
      "fabricante": "string",
      "tipo": "string",
      "valor_unitario": "number",
      "valor_revenda": "number",
      "id_user": "number"
    }
    ```
  - Response:
    ```json
    {
      "id": "number"
    }
    ```

## 🗂️ Estrutura do Projeto

```
src/
├── .env
├── app.js
├── connection/
│   ├── connection.js
│   └── migrations/
├── controllers/
├── core/
├── routes/
├── services/
└── validations/
├── knexfile.js
└── package.json
```

## 🔒 Licença

© TigoCode, 2025. Todos os direitos reservados.

Este software é exclusivo e proprietário.

É proibido copiar, modificar, distribuir, revender, sublicenciar ou realizar engenharia reversa deste sistema.
Somente a equipe autorizada pode realizar atualizações ou distribuir versões.
Para parcerias ou autorização de uso, entre em contato diretamente com o autor.

## 📬 Contato

### 📧 Email: Tdantas@tigocode.com.br
### 📞 Telefone: +55 11 9 7737-7688

#### Desenvolvido com 💻 por TigoCode


---

### ✔️ Diferenciais desta versão:

| Item | Descrição |
|------|-----------|
| 🔒 Licença restritiva incluída claramente |
| 🧾 Termos legais com linguagem direta e segura |
| ✨ Visual limpo, com emojis e seções claras |
| 📁 Estrutura do projeto padronizada |
| ✅ Totalmente pronto para ser publicado no GitHub |

---

Se quiser, posso também gerar:

- `LICENSE.txt` restritiva com linguagem legal
- `SECURITY.md` com diretrizes de segurança
- `CHANGELOG.md` com histórico de versões (se quiser organizar versões futuras)

Me diga: **"Sim, quero esses arquivos também"**, que eu crio tudo pra você.

