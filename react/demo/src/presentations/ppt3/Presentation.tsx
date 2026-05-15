import { Deck, Slide } from '@revealjs/react';
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
				transition: 'convex',
				width: 1280,
				height: 720,
			}}
		>
			<Slide className="ppt3-cover">
				<p className="ppt3-kicker">PPT 3</p>
				<h1>Tercer deck</h1>
				<p>Un ejemplo adicional con una variante oscura dentro de la misma estructura.</p>
			</Slide>

			<Slide className="ppt3-detail">
				<h2>Organizacion por carpeta</h2>
				<p>
					Cada deck puede tener su propia identidad visual, componentes auxiliares y assets
					sin mezclar estilos globales.
				</p>
			</Slide>
		</Deck>
	);
}

export default Presentation;
