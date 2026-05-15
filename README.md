# instaPresi

Este proyecto es un clon/base de `reveal.js` adaptado para un flujo propio de presentaciones en React.

Tomamos `reveal.js` como motor principal de slides y navegación, pero el proyecto actual ya no se usa como la demo original del framework. Hoy está preparado para trabajar con:

- React como capa de interfaz
- `@revealjs/react` para renderizar cada presentación
- un menú inicial en `/` para elegir qué presentación abrir
- una estructura ordenada para agregar nuevas presentaciones fácilmente

## Base del proyecto

El repositorio parte de `reveal.js`, el framework open source de presentaciones HTML creado por Hakim El Hattab.

Sobre esa base se armó una implementación propia para que:

- al entrar a `localhost` se vea primero un menú
- cada presentación viva en su propia carpeta
- Reveal.js siga funcionando dentro de cada deck
- el proyecto quede listo para escalar con nuevas presentaciones

## Estado actual

Actualmente la app principal funciona desde React y muestra primero un menú de presentaciones.

Flujo de uso:

1. Entrar a `/`
2. Ver el listado de presentaciones disponibles
3. Hacer click en una opción
4. Abrir la presentación correspondiente en Reveal.js

Rutas actuales:

- `/`
- `/presentations/ppt1`
- `/presentations/ppt2`
- `/presentations/ppt3`

## Estructura principal

La parte activa del proyecto está organizada dentro de `react/demo/src/`.

```txt
react/demo/src/
  components/
    PresentationMenu.tsx
    PresentationRouter.tsx
    menu.css
  presentations/
    catalog.ts
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

## Cómo levantar el proyecto

Instalación:

```bash
npm install
```

Modo desarrollo:

```bash
npm run dev
```

Build de producción:

```bash
npm run build
```

La app de desarrollo abre en:

```txt
http://localhost:5173/
```

## Cómo funciona el menú

El menú inicial está separado de la lógica de cada presentación.

- [react/demo/src/App.tsx](C:\apps\instaPresi\react\demo\src\App.tsx) decide si mostrar el menú o una presentación
- [react/demo/src/components/PresentationMenu.tsx](C:\apps\instaPresi\react\demo\src\components\PresentationMenu.tsx) renderiza la pantalla inicial
- [react/demo/src/components/PresentationRouter.tsx](C:\apps\instaPresi\react\demo\src\components\PresentationRouter.tsx) resuelve qué deck cargar
- [react/demo/src/presentations/catalog.ts](C:\apps\instaPresi\react\demo\src\presentations\catalog.ts) contiene la lista configurable de presentaciones

## Cómo agregar una nueva presentación

Para sumar una nueva PPT:

1. Crear una carpeta nueva dentro de `react/demo/src/presentations/`
2. Agregar el componente `Presentation.tsx`
3. Agregar `styles.css` si la presentación necesita estilos propios
4. Importarla en `react/demo/src/presentations/catalog.ts`
5. Registrar su `slug`, `title` y `component`

Ejemplo:

```txt
react/demo/src/presentations/ppt4/
  Presentation.tsx
  styles.css
```

Ejemplo de registro en el catálogo:

```ts
{
	slug: 'ppt4',
	title: 'PPT 4',
	component: Ppt4Presentation,
}
```

## Qué mantiene Reveal.js

Aunque la entrada del proyecto ahora está controlada por React, Reveal.js sigue siendo la base de cada presentación y conserva sus capacidades principales, por ejemplo:

- navegación entre slides
- controles
- barra de progreso
- stacks verticales
- fragmentos
- transiciones
- configuración propia por deck

## Archivos importantes

- [package.json](C:\apps\instaPresi\package.json): scripts principales del proyecto
- [react/demo/package.json](C:\apps\instaPresi\react\demo\package.json): app React que sirve como frontend principal
- [react/demo/src/presentations/catalog.ts](C:\apps\instaPresi\react\demo\src\presentations\catalog.ts): listado de presentaciones
- [README_PRESENTACIONES.md](C:\apps\instaPresi\README_PRESENTACIONES.md): guía breve centrada en la estructura de presentaciones

## Créditos

Este proyecto utiliza `reveal.js` como base técnica y respeta su licencia MIT.

- Proyecto original: [reveal.js](https://github.com/hakimel/reveal.js)
- Sitio oficial: [revealjs.com](https://revealjs.com/)
