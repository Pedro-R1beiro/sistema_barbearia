# Documetation
- [Client](#client-documentation)
- [Professional](#professional-documentation)

### Todas as respostas do servidor seguem o formato padrão abaixo.
```json
{
  "status": "success" | "error",
  "message": "Mensagem Explicativa"
}
```
> Em casos de sucesso, o conteúdo da mensagem (message) pode variar conforme a operação realizada. Sempre que houver uma mensagem específica relevante, ela será explicitamente descrita na documentação do endpoint correspondente.
> Em cada endpoint também terá os códigos http que podem ser retornados e o que cada um deles pode significar.

# CORS (Cross-Origin Resource Sharing)
Para permitir que aplicações frontend hospedadas em domínios diferentes consumam esta API, o CORS (Cross-Origin Resource Sharing) foi habilitado. A configuração atual permite requisições de qualquer origem (__Access-Control-Allow-Origin: *__) e aceita os métodos HTTP __GET__, __POST__, __PATCH__, __DELETE__ e __OPTIONS__. 
Para testar o CORS, basta acessar qualquer rota dentro da API (Até mesmo uma que não exista) usando o método __OPTIONS__.

# Client Documentation
|Conta|Agendar Horário|
|--------|-------------|
|[Login](#login-client)|[Horários Disponíveis](#horários-disponíveis-client)|
|[Logout](#logout-client)|[Registrar Agendamento](#registrar-agendamento)|
|[Signup](#signup-client)|[Listar Agendamentos](#listar-agendamentos-client)|
|[Validar Email](#validar-email-client)|[Cancelar Agendamento](#cancelar-agendamento-client)|
|[Deletar Conta](#deletar-conta-client)|[Selecionar Serviços Disponíveis](#selecionar-serviços-disponíveis-client)|
|[Alterar Informações](#alterar-informações-client)|
|[Informações da Conta](#informações-da-conta-client)|
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
  "email": "user@gmail.com", // Deve conter menos que 50 caracteres
  "password": "12345678" // Deve conter no mínimo 8 caracteres
}
```

### Mensagem em caso de sucesso:
```json
"message": {
    "email": "user@gmail.com",
    "code": // Código único do usuário
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
  "name": "User Name", // Deve conter entre 3 e 30 caracteres
  "email": "user@gmail.com", // Deve conter menos que 50 caracteres
  "password": "12345678", // Deve conter no mínimo 8 caracteres
  "phone": "(xx) xxxxx-xxxx",
  "validationScreen": "url/validationScreen.com.br" // Url da tela para validar e-mail
}
```

### Mensagem em caso de sucesso:
```json
"message": {
    "validationEmail": "Mensagem informando se o e-mail de validação foi enviado ou não",
    "email": "user@gmail.com"
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
  "code": // Código único do usuário que estará na url que foi enviada para o e-mail do usuário
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
  "name": ,
  "email": ,
  "phone": ,
  "password": // Deve ser a senha atual, para conseguir alterar as outras informações
}
```
<sub>Pode ser apenas uma informação (Name ou email ou phone). Único parâmetro obrigatório é a senha atual e ao menos uma informação pra alterar.</sub>

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
  "currentPassword": ,// Senha atual
  "newPassword": // Nova senha
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
  "recoveryScreen": , // Link da tela para recuperção que será enviado para o email
  "email": // opcional caso o usuário esteja logado, caso não, obrigatório
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
  "code": , // Código único do usuário que estará na url que foi enviada para o e-mail do usuário
  "newPassword": // Nova senha
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
/backend/client/getAppointment?filter=&status=
```
### Status:
- booked (Marcado)
- completed (Concluído)
- canceled (Cancelado)

<sub>Caso queira adicionar mais de um status, separe-os por vírgula (Ex.: status=booked,canceled)</sub>

### Filtros:
- today: Todos agendamentos para hoje
- nearby: Todos depois de hoje
- history: Todos antes de hoje
- next: Próximo agendamento
- last: Último agendamento

### Default:
Caso não seja enviado nenhum status, ele retornará todos (booked, completed, canceled).
Caso não seja enviado nehum filtro, ele retornará todos agendamentos registrados.

### Mensagem em caso de sucesso:
```json
"message": {
    "id": 1,
    "date": "2025-05-11",
    "startTime": "08:00:00",
    "endTime": "08:30:00",
    "created_at": {
                "date": "2025-06-03",
                "time": "20:24:42"
            },
    "professionalName": "Nome do Barbeiro",
    "clientName": "Nome do Cliente",
    "serviceName": "Nome do Serviço",
    "servicePrice": "15.00"
}
```
### Códigos http
- 200: Sucesso
- 204: Nenhum agendamento encontrado
- 400: Filtro Inválido
- 500: Erro interno

## Cancelar Agendamento (Client)

### Caminho
```http
PATCH /backend/client/cancelAppointment
```

### Formato de dados esperado:
```http
/backend/client/cancelAppointment?id=
```

### Códigos http
- 204: Agendamento cancelado
- 400: Id não informado ou inválido
- 403: Tentativa de excluir agendamento de outra pessoa
- 404: Nenhum agendamento com este Id
- 422: Agendamento já começou ou está no passado, não pode ser excluído
- 500: Erro ao deletar do banco de dados

## Horários Disponíveis (Client)

### Caminho
```http
GET /backend/client/availableTimeSlots
```

### Formato de dados esperado:
```http
/backend/client/availableTimeSlots?date=&service=
```
<sub>Date no formato Y-m-d (Ex.: 2025-05-21). Service deve ser um número, caso tenha mais de um id, separe-os por vírgula (Ex.: 1 ou 1,4,2)</sub>

### Mensagem em caso de sucesso:
```json
"message": [
        {
            "id": 1,
            "name": "Nome do Professional",
            "email": "professiona@gmail.com",
            "phone": "00111114444",
            "status": "day_off" || "on_vacation" || "not_working" || "fully_booked" || "available",
            "timeSlot": [
                "08:00",
                "08:30",
                "09:00",
                "09:30",
                "10:00",
                "11:30",
                "13:00",
                "13:30",
                "14:00",
                "14:30",
                "15:00",
                "15:30",
                "16:00"
            ]
        },
        {
            "id": 2,
            "name": "Nome do Professional 2",
            "email": "professiona2@gmail.com",
            "phone": "00111115555",
            "timeSlot": []
        }
    ]
```
### Significado de cada status:
- day_off 	=> O barbeiro folga regularmente nesse dia.
- on_vacation => O barbeiro está de férias nesse dia.
- not_working => Não há expediente nesse dia (por escala).
- fully_booked => Todos os horários foram preenchidos.
- available => Existem horários disponíveis.

### Códigos http
- 200: Sucesso
- 400: Valores Inválidos
- 409: Erro Interno

## Registrar Agendamento

### Caminho
```http
POST /backend/client/registerAppointment
```

### Formato de dados esperado:
```json
{
    "startTime": "11:30",
    "date": "2025-05-19",
    "idProfessional": "1",
    "service": "1,2,3,4,5"
}
```
<sub>StarTime deve ser no formato H:i (Ex.: 11:30). Date no formato Y-m-d (Ex.: 2025-05-19). Service deve ser um número, caso tenha mais de um id, separe-os por vírgula (Ex.: 1 ou 1,4,2)</sub>

### Códigos http
- 201: Agendamento registrado com sucesso
- 400: Dados Inválidos
- 500: Erro interno

## Logout (Client)

### Caminho
```http
POST /backend/client/logout
```

### Códigos http
- 204: Logout bem sucedido
- 500: Erro interno

## Selecionar Serviços Disponíveis (Client)

### Caminho
```http
GET /backend/client/getServices
```

### Mensagem em caso de sucesso:
```json
"message": [
        {
            "id": 1,
            "name": "Serviço 1",
            "price": "15.00",
            "duration": 30,
            "active": 1
        },
        {
            "id": 2,
            "name": "Serviço 1",
            "price": "20.00",
            "duration": 45,
            "active": 1
        },
]
```

### Códigos http
- 200: Serviços encontrados
- 204: Nenhum serviço encontrado
- 500: Erro interno

## Informações da Conta (Client)

### Caminho
```http
GET /backend/client/accountInformation
```

### Mensagem em caso de sucesso:
```json
"message": [
        "name": "User Name",
        "email": "user@gmail.com",
        "phone": "(xx) xxxxx-xxxx"
]
```

### Códigos http
- 200: Informações da Conta
- 500: Erro interno
