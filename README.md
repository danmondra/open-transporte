# Open Transporte

## Levantar la base de datos con Docker Compose

Este proyecto incluye un archivo `docker-compose.yml` para levantar una base de datos PostgreSQL.

### Variables de entorno
Debes crear un archivo `.env` en la raíz del proyecto.  
Ya tienes un archivo `.env-template` que contiene credenciales de prueba y el formato correcto.  
Solo copia su contenido y pégalo en un nuevo archivo `.env`:

```bash
cp .env-template .env
```

### Levantar el contenedor

Ejecuta el siguiente comando en la raíz del proyecto:

```bash
docker compose up -d
```

La base de datos quedará disponible en localhost:<POSTGRES_PORT>.
