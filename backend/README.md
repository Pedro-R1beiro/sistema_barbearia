# Sistema de Agendamentos Barbearia – Backend
O Sistema de Agendamentos para Barbearia é uma aplicação desenvolvida para gerenciar de forma prática e organizada os horários entre clientes e profissionais. O backend do sistema foi projetado para ser seguro, escalável e de fácil integração com o frontend, fornecendo uma API estruturada que centraliza toda a lógica de autenticação, comunicação com o banco de dados, validação e tratamento de informações.
<br><br>

## 💻 Estrutura e Tecnologias
O backend é desenvolvido em PHP, estruturado seguindo o padrão MVC (Model-View-Controller). Ele expõe uma API RESTful para ser consumida pelo frontend do cliente e do profissional.

### Principais características técnicas:
- **Autenticação JWT:** Garantindo segurança na comunicação e proteção das rotas.
- **CORS** configurado para permitir requisições de diferentes origens.
- **Tratamento de erros** e envio de **respostas personalizadas em JSON**, com **código HTTP** e mensagens explicativas.
- **Validação de dados** enviados pelo frontend para assegurar integridade das informações.
- **Proteção contra SQL Injection**, utilizando consultas preparadas e boas práticas.
- **Testes unitários com PHPUnit**, garantindo maior confiabilidade e manutenção da aplicação.
- **Documentação das rotas via Swagger**, incluindo métodos, parâmetros, respostas e exemplos de uso.

### Estrutura do Projeto
`public/index.php` → Ponto de entrada da API e configuração do CORS.

`app/documentation/index.php` → Acesso à documentação Swagger da API.

`app/config/createDatabase.sql` → Script para criação do banco de dados.

`.env.example` → Arquivo de configuração de ambiente. Para uso, basta renomear para .env e ajustar as variáveis:

## ⚙ Configuração Inicial

1. Instalar dependências:<br>
`composer install`

2. Configurar o ambiente:<br>
Renomear .env.example para .env.<br>
Ajustar variáveis conforme o ambiente de execução.

3. Criar o banco de dados:<br>
Executar o script app/config/createDatabase.sql.

4. Acessar a documentação da API:<br>
Abrir app/documentation/index.php no navegador.

## Uso

### O sistema é dividido em duas áreas principais:

>[!NOTE]
>**Área do Cliente:** Permite que clientes criem, visualizem e gerenciem seus agendamentos.
>
>**Área do Profissional:** Permite que profissionais gerenciem horários, confirmem atendimentos e visualizem agendamentos de seus clientes.

Todas as interações com a API retornam respostas em JSON, com mensagens descritivas e códigos HTTP correspondentes, garantindo clareza no consumo do frontend.
