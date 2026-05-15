import { Deck, Fragment, Slide, Stack } from '@revealjs/react';
import 'reveal.js/reveal.css';
import 'reveal.js/theme/white.css';
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
			<Slide className="ppt1-cover">
				<p className="deck-kicker">PPT 1</p>
				<h1>Presentacion principal</h1>
				<p className="deck-lead">
					Deck base para la primera presentacion, ya organizado dentro de
					<code>src/presentations/ppt1</code>.
				</p>
			</Slide>

			<Slide className="ppt1-content">
				<h2>Estructura mantenible</h2>
				<div className="deck-grid">
					<div className="deck-card">
						<h3>Menu inicial</h3>
						<p>La raiz muestra el listado de presentaciones antes de abrir Reveal.</p>
					</div>
					<div className="deck-card">
						<h3>Catalogo central</h3>
						<p>Las opciones se agregan desde un archivo unico y facil de ampliar.</p>
					</div>
				</div>
			</Slide>

			<Slide className="ppt1-fragments">
				<h2>Reveal sigue activo</h2>
				<ul>
					<li>
						<Fragment>Los fragmentos continúan funcionando.</Fragment>
					</li>
					<li>
						<Fragment>La navegacion por teclado y controles se mantiene.</Fragment>
					</li>
					<li>
						<Fragment>El hash sigue identificando slides dentro del deck.</Fragment>
					</li>
				</ul>
			</Slide>

			<Stack>
				<Slide className="ppt1-stack">
					<p className="deck-kicker">Vertical</p>
					<h2>Primera slide apilada</h2>
					<p>La estructura vertical de Reveal se conserva dentro de la presentacion.</p>
				</Slide>
				<Slide className="ppt1-stack">
					<h2>Segunda slide apilada</h2>
					<p>Esto deja listo el proyecto para decks mas complejos en el futuro.</p>
				</Slide>
			</Stack>
		</Deck>
	);
}

export default Presentation;
