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
|Conta|Agendar Horário|
|--------|-------------|
|[Login](#login-client)|[Listar Agendamentos](#listar-agendamentos-client)|
|[Signup](#signup-client)|
|[Validar Email](#validar-email-client)|
|[Deletar Conta](#deletar-conta-client)|
|[Alterar Informações](#alterar-informações-client)|
|[Alterar Senha](#alterar-senha-client)|
|[Enviar Email de Recuperação](#enviar-email-de-recuperação-client)|
|[Recuperar Senha](#recuperar-senha-client)|

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
    'validationEmail': 'Mensagem informando se o e-mail de validação foi enviado ou não',
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
  'name': ,
  'email': ,
  'phone': ,
  'senha': // Deve ser a senha atual, para conseguir alterar as outras informações
}
```

### Códigos http
- 200: Dados Alterados
- 400: Dados inválidos
- 404: Nenhuma conta encontrada com o Id salvo nos cookies
- 500: Erro ao alterar no banco de dados
  
## Alterar Senha (Client)

### Caminho
```http
PATCH /backend/client/chagePassword
```

### Formato de dados esperado:
```json
{
  'currentPassword': ,// Senha atual
  'newPassword': // Nova senha
}
```

### Códigos http
- 200: Senha alterada com sucesso
- 400: Valores inválidos ou senha atual incorreta
- 404: Nenhuma conta encontrada com o Id salvo nos cookies
- 500: Erro ao alterar no banco de dados

## Enviar Email de Recuperação (Client)

### Caminho
```http
POST /backend/client/sendRecoveryEmail
```

### Formato de dados esperado:
```json
{
  'recoveryScreen': , // Link da tela para recuperção que será enviado para o email
  'email': // opcional caso o usuário esteja logado, caso não, obrigatório
}
```

### Códigos http
- 200: E-mail enviado
- 400: E-mail inválido
- 404: Nenhuma conta econtrada com o Id salvo nos cookies
- 500: Erro ao enviar o e-mail

## Recuperar Senha (Client)

### Caminho
```http
PATCH /backend/client/resetPassword
```

### Formato de dados esperado:
```json
{
  'code': , // Código único do usuário que estará na url que foi enviada para o e-mail do usuário
  'newPassword': // Nova senha
}
```

### Códigos http
- 200: Senha alterada com sucesso
- 400: Valores inválidos ou senha atual igual à atual
- 404: Nenhuma conta encontrada com o código informado
- 500: Erro ao alterar no banco de dados

## Listar Agendamentos (Client)

### Caminho
```http
GET /backend/client/getAppointment
```

### Formato de dados esperado:
```http
/backend/client/getAppointment?filter=
```
### Filtros:
- today: Todos agendamentos para hoje
- nearby: Todos depois de hoje
- history: Todos antes de hoje
- next: Próximo agendamento
- last: Último agendamento

### Mensagem em caso de sucesso:
```json
'message': {
    'id': 1,
    'date': '2025-05-11',
    'startTime': '08:00:00',
    'endTime': '08:30:00',
    'professionalName': 'Nome do Barbeiro',
    'clientName': 'Nome do Cliente',
    'serviceName': 'Nome do Serviço',
    'servicePrice': '15.00'
}
```
### Códigos http
- 200: Sucesso
- 400: Filtro Inválido
- 409: Nenhum agendamento encontrado
