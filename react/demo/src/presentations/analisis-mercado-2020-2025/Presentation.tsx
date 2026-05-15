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
					center: false,
					margin: 0,
					disableLayout: true,
					transition: 'slide',
					width: '100%',
					height: '100%',
				}}
			>
				<Slide className="ppt-analisis-mercado-2020-2025 ppt-analisis-mercado-2020-2025--cover">
					<div className="ppt-analisis-mercado-2020-2025__surface">
						<div className="ppt-analisis-mercado-2020-2025__hero">
							<p className="ppt-analisis-mercado-2020-2025__eyebrow">Presentacion</p>
							<h1>{presentationMetadata.title}</h1>
							<div className="ppt-analisis-mercado-2020-2025__meta">
								<p><strong>ID</strong> {presentationMetadata.id}</p>
								<p><strong>Autor</strong> {presentationMetadata.author}</p>
								<p><strong>Fecha</strong> {presentationMetadata.date}</p>
								<p>
									<strong>Categorias</strong> {presentationMetadata.categories.join(' | ')}
								</p>
							</div>
						</div>
					</div>
				</Slide>

				<Slide className="ppt-analisis-mercado-2020-2025 ppt-analisis-mercado-2020-2025--content">
					<div className="ppt-analisis-mercado-2020-2025__surface">
						<div className="ppt-analisis-mercado-2020-2025__panel">
							<p className="ppt-analisis-mercado-2020-2025__eyebrow">Agenda</p>
							<h2>{presentationMetadata.subtitle}</h2>
							<ul className="ppt-analisis-mercado-2020-2025__list">
								{agendaItems.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					</div>
				</Slide>

				<Slide className="ppt-analisis-mercado-2020-2025 ppt-analisis-mercado-2020-2025--content">
					<div className="ppt-analisis-mercado-2020-2025__surface">
						<div className="ppt-analisis-mercado-2020-2025__panel">
							<p className="ppt-analisis-mercado-2020-2025__eyebrow">Contenido</p>
							<h2>Desarrollo</h2>
							<div className="ppt-analisis-mercado-2020-2025__grid">
								{contentCards.map((card) => (
									<article key={card.title} className="ppt-analisis-mercado-2020-2025__card">
										<h3>{card.title}</h3>
										<p>{card.text}</p>
									</article>
								))}
							</div>
						</div>
					</div>
				</Slide>

				<Slide className="ppt-analisis-mercado-2020-2025 ppt-analisis-mercado-2020-2025--closing">
					<div className="ppt-analisis-mercado-2020-2025__surface">
						<div className="ppt-analisis-mercado-2020-2025__panel">
							<p className="ppt-analisis-mercado-2020-2025__eyebrow">Cierre</p>
							<h2>Gracias</h2>
							<p>{closingMessage}</p>
						</div>
					</div>
				</Slide>
			</Deck>
		</PresentationFrame>
	);
}

export default Presentation;
