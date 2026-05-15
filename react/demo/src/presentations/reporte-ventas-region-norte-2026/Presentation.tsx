import { Deck, Slide } from '@revealjs/react';
import PresentationFrame from '../../components/PresentationFrame';
import 'reveal.js/reveal.css';
import 'reveal.js/theme/white.css';
import './styles.css';

const presentation = {
	"title": "Reporte Ventas Region Norte 2026",
	"author": "Franco Sanchez",
	"date": "2026-05-15",
	"categoriesLabel": "convencional | ventas | seguimiento"
};

function Presentation() {
	return (
		<PresentationFrame>
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
				<Slide className="ppt-reporte-ventas-region-norte-2026 ppt-reporte-ventas-region-norte-2026--cover">
					<div className="ppt-reporte-ventas-region-norte-2026__hero">
						<p className="ppt-reporte-ventas-region-norte-2026__eyebrow">Presentacion</p>
						<h1>{presentation.title}</h1>
						<div className="ppt-reporte-ventas-region-norte-2026__meta">
							<p><strong>Autor</strong> {presentation.author}</p>
							<p><strong>Fecha</strong> {presentation.date}</p>
							<p><strong>Categorias</strong> {presentation.categoriesLabel}</p>
						</div>
					</div>
				</Slide>

				<Slide className="ppt-reporte-ventas-region-norte-2026 ppt-reporte-ventas-region-norte-2026--content">
					<div className="ppt-reporte-ventas-region-norte-2026__panel">
						<p className="ppt-reporte-ventas-region-norte-2026__eyebrow">Contenido</p>
						<h2>Desarrollo</h2>
						<p>Espacio listo para incorporar el contenido principal.</p>
					</div>
				</Slide>

				<Slide className="ppt-reporte-ventas-region-norte-2026 ppt-reporte-ventas-region-norte-2026--closing">
					<div className="ppt-reporte-ventas-region-norte-2026__panel">
						<p className="ppt-reporte-ventas-region-norte-2026__eyebrow">Cierre</p>
						<h2>Gracias</h2>
						<p>Espacio listo para el mensaje final.</p>
					</div>
				</Slide>
			</Deck>
		</PresentationFrame>
	);
}

export default Presentation;
