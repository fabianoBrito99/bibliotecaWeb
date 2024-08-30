# Use a imagem oficial do MySQL
FROM mysql:8.0

# Defina a senha do root para o MySQL
ENV MYSQL_ROOT_PASSWORD=root

# Crie o banco de dados inicial
ENV MYSQL_DATABASE=bibliota_web

# Copie o script SQL para o container e execute-o ao inicializar
COPY biblioteca_web.sql /docker-entrypoint-initdb.d/
