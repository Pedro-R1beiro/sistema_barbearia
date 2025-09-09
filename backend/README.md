# 📌 Sistema de Agendamentos Barbearia – Backend
O Sistema de Agendamentos para Barbearia é uma aplicação desenvolvida para gerenciar de forma prática e organizada os horários entre clientes e profissionais. O backend do sistema foi projetado para ser seguro, escalável e de fácil integração com o frontend, fornecendo uma API estruturada que centraliza toda a lógica de autenticação, comunicação com o banco de dados, validação e tratamento de informações.
<br><br>

## 💻 Principais características técnicas
O backend é desenvolvido em PHP, estruturado seguindo o padrão MVC (Model-View-Controller). Ele expõe uma API RESTful para ser consumida pelo frontend do cliente e do profissional.

### 🔐 Segurança
- **Autenticação JWT:** Garantindo segurança na comunicação e proteção das rotas.
- **CORS** configurado para permitir requisições de diferentes origens.
- **Tratamento de erros** e envio de **respostas personalizadas em JSON**, com **códigos HTTP semânticos** e mensagens explicativas.
- **Validação de dados** enviados pelo frontend para assegurar integridade das informações.
- **Proteção contra SQL Injection**, utilizando consultas preparadas e boas práticas.

### 🧪 Testes e Qualidade
- **Testes unitários com PHPUnit**, garantindo maior confiabilidade e manutenção da aplicação.
- **Padronização de respostas**, todas as interações retornam objetos JSON consistentes, facilitando o consumo pelo frontend.
- **Logs e mensagens explicativas**.

### 📖 Documentação
- **Swagger UI integrado:** Permite explorar todos os endpoints da API, visualizar parâmetros, tipos de resposta e testar requisições em tempo real.

## 🚀 Configuração Inicial

1. Instalar dependências:
``` bash
composer install
```

2. Configurar o ambiente:
    - Renomear .env.example para .env.<br>
    - Ajustar variáveis conforme o ambiente de execução.

3. Criar o banco de dados:<br>
Acesse `app/config/createDatabase.sql`.

4. Testar models:
``` bash
vendor\bin\phpunit Tests\Unit
```

5. Acessar a documentação da API:<br>
    - Abrir no navegador `app/documentation/index.php`.
