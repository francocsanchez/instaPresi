import { Deck, Slide } from '@revealjs/react';
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
				transition: 'fade',
				width: 1280,
				height: 720,
			}}
		>
			<Slide className="ppt2-cover">
				<p className="ppt2-kicker">PPT 2</p>
				<h1>Segundo deck</h1>
				<p>
					Esta carpeta demuestra como sumar una nueva presentacion sin tocar la logica del
					menu.
				</p>
			</Slide>

			<Slide className="ppt2-detail">
				<h2>Que se necesita para agregar otra</h2>
				<ol>
					<li>Crear una carpeta propia dentro de <code>src/presentations</code>.</li>
					<li>Agregar su componente y estilos locales.</li>
					<li>Registrar el slug y el titulo en el catalogo central.</li>
				</ol>
			</Slide>
		</Deck>
	);
}

export default Presentation;
