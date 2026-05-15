# Presentaciones con React

Este proyecto mantiene `reveal.js` como motor de presentacion y usa `@revealjs/react` para renderizar cada deck desde React.

## Flujo actual

- La ruta `/` muestra un menu inicial con las presentaciones disponibles.
- Cada deck vive dentro de `react/demo/src/presentations/<slug>/`.
- El archivo `react/demo/src/presentations/catalog.ts` define que presentaciones se muestran en el menu.
- Las rutas activas quedan asi:
  - `/`
  - `/presentations/ppt1`
  - `/presentations/ppt2`
  - `/presentations/ppt3`

## Estructura recomendada

```txt
react/demo/src/
  components/
    PresentationMenu.tsx
    PresentationRouter.tsx
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
```

## Como agregar una nueva presentacion

1. Crear una carpeta nueva dentro de `react/demo/src/presentations/`.
2. Agregar su `Presentation.tsx` y, si hace falta, un `styles.css`.
3. Importarla en `react/demo/src/presentations/catalog.ts`.
4. Registrar su `slug` y `title` dentro del arreglo `presentations`.

Ejemplo de carpeta:

```txt
react/demo/src/presentations/ppt4/
  Presentation.tsx
  styles.css
```

## Verificacion

Para validar que todo siga funcionando:

```bash
npm run --prefix react/demo build
```

Para comprobarlo manualmente, levanta la app con `npm run dev` y abre `http://localhost:5173/`.
