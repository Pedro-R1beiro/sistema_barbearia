# Documetation
- [Client](#client-documentation)
- [Professional](#professional-documentation)

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
  'email': 'user@gmail.com',
  'password': '12345678' // Password deve conter no mínimo 8 caracteres
}
```

### Resposta do Servidor:
```json
{
  'status': 'success' | 'error',
  'message': 'Mensagem Explicativa'
}
// Mensagem em caso de sucesso:
'message': {
    'email': 'user@gmail.com,
    'code': // Código único do usuário
}
```
### Juntamente com o json será retornado o código http
- 200: Login efetuado com Sucesso
- 400: Dados Inválidos
- 401: E-mail ou senha incorretos
