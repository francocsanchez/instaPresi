import { Deck, Slide } from '@revealjs/react';
import PresentationFrame from '../../components/PresentationFrame';
import {
	agendaItems,
	closingMessage,
	contentCards,
	presentationMetadata,
} from './data';
import 'reveal.js/reveal.css';
import 'reveal.js/theme/white.css';
import './styles.css';

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
				<Slide className="ppt-panel-posventa-camiones-2026 ppt-panel-posventa-camiones-2026--cover">
					<div className="ppt-panel-posventa-camiones-2026__hero">
						<p className="ppt-panel-posventa-camiones-2026__eyebrow">Presentacion</p>
						<h1>{presentationMetadata.title}</h1>
						<div className="ppt-panel-posventa-camiones-2026__meta">
							<p><strong>Autor</strong> {presentationMetadata.author}</p>
							<p><strong>Fecha</strong> {presentationMetadata.date}</p>
							<p>
								<strong>Categorias</strong> {presentationMetadata.categories.join(' | ')}
							</p>
						</div>
					</div>
				</Slide>

				<Slide className="ppt-panel-posventa-camiones-2026 ppt-panel-posventa-camiones-2026--content">
					<div className="ppt-panel-posventa-camiones-2026__panel">
						<p className="ppt-panel-posventa-camiones-2026__eyebrow">Agenda</p>
						<h2>{presentationMetadata.subtitle}</h2>
						<ul className="ppt-panel-posventa-camiones-2026__list">
							{agendaItems.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</div>
				</Slide>

				<Slide className="ppt-panel-posventa-camiones-2026 ppt-panel-posventa-camiones-2026--content">
					<div className="ppt-panel-posventa-camiones-2026__panel">
						<p className="ppt-panel-posventa-camiones-2026__eyebrow">Contenido</p>
						<h2>Desarrollo</h2>
						<div className="ppt-panel-posventa-camiones-2026__grid">
							{contentCards.map((card) => (
								<article key={card.title} className="ppt-panel-posventa-camiones-2026__card">
									<h3>{card.title}</h3>
									<p>{card.text}</p>
								</article>
							))}
						</div>
					</div>
				</Slide>

				<Slide className="ppt-panel-posventa-camiones-2026 ppt-panel-posventa-camiones-2026--closing">
					<div className="ppt-panel-posventa-camiones-2026__panel">
						<p className="ppt-panel-posventa-camiones-2026__eyebrow">Cierre</p>
						<h2>Gracias</h2>
						<p>{closingMessage}</p>
					</div>
				</Slide>
			</Deck>
		</PresentationFrame>
	);
}

export default Presentation;
