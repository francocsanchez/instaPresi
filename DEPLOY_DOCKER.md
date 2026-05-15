# Deploy con Docker

Este proyecto no usa backend ni base de datos. La app que se publica es la SPA de React/Vite ubicada en `react/demo`, construida desde la raiz para respetar la dependencia local con `reveal.js`.

## Construccion local

```bash
docker build -t instapresi-frontend .
```

## Ejecucion local

```bash
docker run -p 8081:80 instapresi-frontend
```

La aplicacion quedara disponible en `http://localhost:8081`.

## Uso con Docker Compose

```bash
docker compose up -d
```

Esto levanta un unico servicio:

- `instapresi-frontend`

El puerto publicado es `8081` para no pisar el frontend de intraNIC, que ya usa `8080`.

## Despliegue en Portainer

Usar la imagen publicada en GitHub Container Registry:

`ghcr.io/francocsanchez/instapresi-frontend:latest`

Flujo esperado:

1. Hacer push a `main`.
2. GitHub Actions construye y publica la imagen en GHCR.
3. En Portainer, recrear el contenedor para que tome la ultima version de `latest`.

## Notas de build

- El build correcto se ejecuta desde la raiz con `npm run build`.
- Eso recompila `reveal.js` y luego genera la SPA en `react/demo/dist`.
- No se detectaron variables de entorno `VITE_`, por lo que no hace falta pasar variables al build en este estado.
- `.dockerignore` excluye `dist` y `react/demo/dist` porque ambos se regeneran dentro del contenedor durante `npm run build`.
