# Presentaciones con React

Este proyecto mantiene `reveal.js` como motor de presentacion y usa el paquete oficial `@revealjs/react` para construir slides con componentes React.

## Como levantar el proyecto

1. Instala dependencias del repo principal:

```bash
npm install
```

2. Instala las dependencias de React:

```bash
npm install --prefix react
npm install --prefix react/demo
```

3. Inicia la experiencia principal de presentaciones React:

```bash
npm run dev
```

4. Si necesitas levantar la demo HTML clasica de reveal.js, usa:

```bash
npm run dev:core
```

## Estructura para una nueva presentacion

Crea una carpeta nueva dentro de `react/demo/src/presentations/`:

```txt
react/demo/src/presentations/nueva-presentacion/
  Presentation.tsx
  styles.css
  assets/
```

Ejemplo minimo:

```tsx
import { Deck, Slide } from '@revealjs/react';
import 'reveal.js/reveal.css';
import 'reveal.js/theme/black.css';
import './styles.css';

export default function Presentation() {
	return (
		<Deck config={{ hash: true }}>
			<Slide>
				<h1>Nueva presentacion</h1>
			</Slide>
		</Deck>
	);
}
```

## Donde colocar imagenes y recursos

- Guarda imagenes, videos o archivos auxiliares en `react/demo/src/presentations/<nombre>/assets/`.
- Importalos desde `Presentation.tsx` como cualquier recurso de Vite/React.

## Como importar estilos propios

- Cada presentacion puede importar su propio `styles.css`.
- Los estilos base de reveal.js y el tema se importan dentro de cada `Presentation.tsx`.
- Los estilos custom deben apuntar a clases o secciones de la presentacion para no mezclar visuales entre decks.

## Como seleccionar que presentacion mostrar

El selector actual vive en [App.tsx](C:\apps\instaPresi\react\demo\src\App.tsx).

1. Agrega tu componente al mapa `presentations`.
2. Usa una URL con el formato:

```txt
/presentations/demo
/presentations/nueva-presentacion
```

La raiz `/` carga la demo por defecto.

## Comandos de verificacion

Usa estos comandos para validar que todo siga funcionando:

```bash
npm run build
npm test
```

Ademas, para la parte React:

```bash
npm run --prefix react test
npm run --prefix react/demo build
```

Si quieres comprobar manualmente la app React, levanta `npm run dev` y abre:

```txt
http://localhost:5173/presentations/demo
```
