import { Deck, Fragment, Slide, Stack } from '@revealjs/react';
import 'reveal.js/reveal.css';
import 'reveal.js/theme/black.css';
import './styles.css';

function Presentation() {
	return (
		<Deck
			config={{
				hash: true,
				controls: true,
				progress: true,
				center: true,
				transition: 'slide',
				width: 1280,
				height: 720,
			}}
		>
			<Slide className="demo-cover">
				<p className="eyebrow">React + reveal.js</p>
				<h1>Presentacion Demo</h1>
				<p className="lead">
					Base inicial para crear nuevas presentaciones por carpeta usando el paquete oficial
					<code>@revealjs/react</code>.
				</p>
			</Slide>

			<Slide className="demo-content">
				<h2>Estructura recomendada</h2>
				<div className="card-grid">
					<div className="info-card">
						<h3>Carpetas separadas</h3>
						<p>Cada presentacion vive en su propia carpeta con componente, estilos y assets.</p>
					</div>
					<div className="info-card">
						<h3>Punto central</h3>
						<p>La seleccion se resuelve desde un archivo principal segun la URL activa.</p>
					</div>
				</div>
			</Slide>

			<Slide className="demo-fragments">
				<h2>Fragmentos</h2>
				<p>Reveal sigue manejando la navegacion y las apariciones progresivas.</p>
				<ul>
					<li>
						<Fragment>Primero aparece este punto.</Fragment>
					</li>
					<li>
						<Fragment>Despues aparece el siguiente.</Fragment>
					</li>
					<li>
						<Fragment>Y por ultimo se completa la idea.</Fragment>
					</li>
				</ul>
			</Slide>

			<Stack>
				<Slide className="demo-stack">
					<p className="eyebrow">Stack vertical</p>
					<h2>Navegacion en columna</h2>
					<p>Baja una vez para ver la siguiente slide dentro de esta misma seccion.</p>
				</Slide>
				<Slide className="demo-stack demo-stack-alt">
					<h2>Segunda slide vertical</h2>
					<p>La estructura <code>Stack</code> queda lista para recorridos verticales.</p>
				</Slide>
			</Stack>

			<Slide className="demo-brand">
				<p className="eyebrow">Estilos propios</p>
				<h2>Look & feel por presentacion</h2>
				<p>
					Esta slide usa un tratamiento visual personalizado desde
					<code>src/presentations/demo/styles.css</code>.
				</p>
				<div className="pill-row">
					<span>gradientes</span>
					<span>tipografia</span>
					<span>bloques reutilizables</span>
				</div>
			</Slide>
		</Deck>
	);
}

export default Presentation;
