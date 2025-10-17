# Imagem base PHP + Apache
FROM php:8.3-apache

# Instala extensões necessárias para o MySQL e Composer
RUN docker-php-ext-install pdo pdo_mysql

# Habilita o mod_rewrite do Apache
RUN a2enmod rewrite

# Define diretório de trabalho
WORKDIR /var/www/html

# Copia os arquivos do projeto
COPY . /var/www/html

# Copia o arquivo de configuração de host virtual (para reescrita e API)
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
</Directory>' > /etc/apache2/conf-available/project.conf && \
    a2enconf project

# Instala o Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Expõe a porta padrão do Apache
EXPOSE 80