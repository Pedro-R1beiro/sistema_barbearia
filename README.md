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
- Validar Email

## Login (Client)

### Caminho para Login
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

### Caminho para Signup
```http
POST /backend/client/signup
```

### Formato de dados esperado:
```json
{
  'name': 'User Name', // Deve conter entre 3 e 30 caracteres
  'email': 'user@gmail.com', // Deve conter menos que 50 caracteres
  'password': '12345678', // Deve conter no mínimo 8 caracteres
  'phone': '(xx) xxxxx-xxxx'
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
- 201: Conta criada e e-mail de validação enviado
- 202: Conta criada, porém não foi possível enviar o e-mail de validação
- 400: Dados Inválidos
- 409: E-mail já cadastrado
- 500: Erro ao cadastrar no banco de dados

