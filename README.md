# Documetation
- [Client](#client-documentation)
- [Professional](#professional-documentation)

### Todas as respostas do servidor seguem o formato padrão abaixo.
```json
{
  'status': 'success' | 'error',
  'message': 'Mensagem Explicativa'
}
```
> Em casos de sucesso, o conteúdo da mensagem (message) pode variar conforme a operação realizada. Sempre que houver uma mensagem específica relevante, ela será explicitamente descrita na documentação do endpoint correspondente.
> Em cada endpoint também terá os códigos http que podem ser retornados e o que cada um deles pode significar.

# Client Documentation
- [Login](#login-client)
- [Signup](#signup-client)
- [Validar Email](#validar-email-client)
- [Deletar Conta](#deletar-conta-client)
- [Alterar Informações](#alterar-informações-client)

## Login (Client)

### Caminho
```http
POST /backend/client/login
```

### Formato de dados esperado:
```json
{
  'email': 'user@gmail.com', // Deve conter menos que 50 caracteres
  'password': '12345678' // Deve conter no mínimo 8 caracteres
}
```

### Mensagem em caso de sucesso:
```json
'message': {
    'email': 'user@gmail.com,
    'code': // Código único do usuário
}
```
### Códigos http
- 200: Login efetuado com Sucesso
- 400: Dados Inválidos
- 401: E-mail ou senha incorretos

## Signup (Client)

### Caminho
```http
POST /backend/client/signup
```

### Formato de dados esperado:
```json
{
  'name': 'User Name', // Deve conter entre 3 e 30 caracteres
  'email': 'user@gmail.com', // Deve conter menos que 50 caracteres
  'password': '12345678', // Deve conter no mínimo 8 caracteres
  'phone': '(xx) xxxxx-xxxx',
  'validationScreen': 'url/validationScreen.com.br' // Url da tela para validar e-mail
}
```

### Mensagem em caso de sucesso:
```json
'message': {
    'validationEmail' = 'Mensagem informando se o e-mail de validação foi enviado ou não'
    'email': 'user@gmail.com
}
```
### Códigos http
- 200: Conta criada, porém não foi possível enviar o e-mail de validação
- 201: Conta criada e e-mail de validação enviado
- 400: Dados Inválidos
- 409: E-mail já cadastrado
- 500: Erro ao cadastrar no banco de dados

## Validar Email (Client)

### Caminho
```http
PATCH /backend/client/validateEmail
```

### Formato de dados esperado:
```json
{
  'code': // Código único do usuário que estará na url que foi enviada para o e-mail do usuário
}
```

### Códigos http
- 200: E-mail validado
- 400: Sem código para validar
- 404: Nenhuma conta registrada com esse código
- 500: Erro ao atualizar no banco de dados

## Deletar Conta (Client)

### Caminho
```http
DELETE /backend/client/delete
```

### Formato de dados esperado:
```json
{
  'id': 1
}
```

### Códigos http
- 204: Conta deletada
- 404: Nenhuma conta encontrada com o Id salvo nos cookies
- 500: Erro ao deletar do banco de dados
  
## Alterar Informações (Client)

### Caminho
```http
PATCH /backend/client/chageInfo
```

### Formato de dados esperado:
```json
{
  'name':
  'email':
  'phone':
  'senha': // Deve ser a senha atual, para conseguir alterar as outras informações
}
```

### Códigos http
- 204: Dados Alterados
- 400: Dados inválidos
- 404: Nenhuma conta encontrada com o Id salvo nos cookies
- 500: Erro ao alterar no banco de dados
