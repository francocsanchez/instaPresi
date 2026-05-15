# instaPresi

Este proyecto usa `reveal.js` como motor de slides y una app React como punto de entrada para navegar un catalogo de presentaciones.

El flujo actual ya esta preparado para:

- mostrar un menu inicial en `/`
- abrir cada deck desde su propia ruta
- mantener cada presentacion aislada en su propia carpeta
- crear nuevas presentaciones desde consola con `npm run create:ppt`

## Base del proyecto

El repositorio parte de `reveal.js`, el framework open source de presentaciones HTML creado por Hakim El Hattab, y suma una capa propia en React con `@revealjs/react`.

## Flujo actual

1. Entrar a `/`
2. Ver el listado de presentaciones disponibles
3. Elegir una opcion
4. Abrir la presentacion correspondiente en Reveal.js

## Estructura principal

La parte activa del proyecto vive dentro de `react/demo/src/`.

```txt
react/demo/src/
  components/
    PresentationMenu.tsx
    PresentationRouter.tsx
    menu.css
  data/
    presentations.ts
  presentations/
    ppt1/
      Presentation.tsx
      styles.css
    ppt2/
      Presentation.tsx
      styles.css
    ppt3/
      Presentation.tsx
      styles.css
  utils/
    routing.ts
  App.tsx
  main.tsx
```

## Como levantar el proyecto

Instalacion:

```bash
npm install
```

Modo desarrollo:

```bash
npm run dev
```

Build de produccion:

```bash
npm run build
```

La app de desarrollo abre en:

```txt
http://localhost:5173/
```

## Crear una nueva presentacion

La forma recomendada de dar de alta un deck nuevo es:

```bash
npm run create:ppt
```

El comando pide por consola:

- titulo o nombre de la presentacion
- fecha
- autor
- categorias separadas por coma

Con esos datos el script:

- genera un slug en minusculas, con guiones y sin caracteres especiales
- valida que no exista ya una carpeta con ese slug
- crea una carpeta nueva dentro de `react/demo/src/presentations/<slug>/`
- genera `Presentation.tsx`, `styles.css` y `data.ts`
- agrega automaticamente la presentacion al catalogo en `react/demo/src/data/presentations.ts` cuando detecta la estructura esperada

Ejemplo de resultado:

```txt
react/demo/src/presentations/panel-posventa-camiones-2026/
  data.ts
  Presentation.tsx
  styles.css
```

La plantilla inicial incluye:

- slide de portada con titulo, autor, fecha y categorias
- slide de agenda
- slide de desarrollo con cards placeholder
- slide de cierre

Si el slug ya existe, el script muestra error y no sobrescribe archivos.

## Catalogo y menu

El menu inicial esta separado de la logica de cada deck.

- [App.tsx](C:/apps/instaPresi/react/demo/src/App.tsx) decide si mostrar el menu o una presentacion
- [PresentationMenu.tsx](C:/apps/instaPresi/react/demo/src/components/PresentationMenu.tsx) renderiza la pantalla inicial
- [PresentationRouter.tsx](C:/apps/instaPresi/react/demo/src/components/PresentationRouter.tsx) resuelve que deck cargar
- [presentations.ts](C:/apps/instaPresi/react/demo/src/data/presentations.ts) contiene el catalogo de presentaciones

## Alta manual

Si alguna vez necesitas crear un deck sin usar el script, la estructura minima esperada sigue siendo una carpeta propia dentro de `react/demo/src/presentations/` y un registro en `react/demo/src/data/presentations.ts`.

## Que mantiene Reveal.js

Aunque la entrada del proyecto esta controlada por React, Reveal.js sigue siendo la base de cada presentacion y mantiene capacidades como:

- navegacion entre slides
- controles
- barra de progreso
- stacks verticales
- fragmentos
- transiciones
- configuracion propia por deck

## Archivos importantes

- [package.json](C:/apps/instaPresi/package.json): scripts principales del proyecto
- [create-ppt.js](C:/apps/instaPresi/scripts/create-ppt.js): generador de nuevas presentaciones
- [react/demo/package.json](C:/apps/instaPresi/react/demo/package.json): app React principal
- [presentations.ts](C:/apps/instaPresi/react/demo/src/data/presentations.ts): catalogo de presentaciones
- [README_PRESENTACIONES.md](C:/apps/instaPresi/README_PRESENTACIONES.md): guia breve centrada en el flujo de decks

## Creditos

Este proyecto utiliza `reveal.js` como base tecnica y respeta su licencia MIT.

- Proyecto original: [reveal.js](https://github.com/hakimel/reveal.js)
- Sitio oficial: [revealjs.com](https://revealjs.com/)
