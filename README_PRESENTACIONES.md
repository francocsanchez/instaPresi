# Presentaciones con React

Este proyecto mantiene `reveal.js` como motor de presentacion y usa `@revealjs/react` para renderizar cada deck desde React.

## Flujo actual

- La ruta `/` muestra un menu inicial con las presentaciones disponibles.
- Cada deck vive dentro de `react/demo/src/presentations/<slug>/`.
- El archivo `react/demo/src/data/presentations.ts` define que presentaciones se muestran en el menu.
- La forma recomendada de crear una nueva presentacion es `npm run create:ppt`.

## Estructura recomendada

```txt
react/demo/src/
  components/
    PresentationMenu.tsx
    PresentationRouter.tsx
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
```

## Como agregar una nueva presentacion

La opcion recomendada es ejecutar:

```bash
npm run create:ppt
```

El comando pide:

- titulo
- fecha
- autor
- categorias separadas por coma

Y genera automaticamente:

1. una carpeta nueva dentro de `react/demo/src/presentations/`
2. el archivo `Presentation.tsx`
3. el archivo `styles.css`
4. el archivo `data.ts`
5. el registro en `react/demo/src/data/presentations.ts`

Ejemplo de carpeta:

```txt
react/demo/src/presentations/ppt4/
  data.ts
  Presentation.tsx
  styles.css
```

La plantilla inicial deja lista:

- portada con titulo, autor, fecha y categorias
- slide de agenda
- slide de contenido con placeholders
- slide de cierre

Si ya existe una carpeta con el mismo slug, el script aborta y no sobrescribe nada.

## Alta manual

Si no quieres usar el script, todavia puedes:

1. crear la carpeta dentro de `react/demo/src/presentations/`
2. agregar `Presentation.tsx` y los archivos auxiliares que necesites
3. importar el componente en `react/demo/src/data/presentations.ts`
4. registrar la metadata dentro del arreglo `presentations`

## Verificacion

Para validar que todo siga funcionando:

```bash
npm run build
```

Para comprobarlo manualmente, levanta la app con `npm run dev` y abre `http://localhost:5173/`.
