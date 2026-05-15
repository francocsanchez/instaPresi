import type { PresentationDefinition } from '../types/presentations';
import PresentationCard from './PresentationCard';
import './menu.css';

type PresentationMenuProps = {
	presentations: PresentationDefinition[];
};

function PresentationMenu({ presentations }: PresentationMenuProps) {
	return (
		<main className="menu-shell">
			<section className="menu-panel" aria-labelledby="presentations-title">
				<p className="menu-kicker">Presentaciones</p>
				<h1 id="presentations-title">Selecciona una presentacion</h1>
				<p className="menu-description">
					Elige una opcion para abrir su deck en Reveal.js. Para agregar nuevas, suma una
					carpeta dentro de <code>src/presentations</code> y registrala en
					<code>src/data/presentations.ts</code>.
				</p>

				<ul className="menu-list">
					{presentations.map((presentation) => (
						<PresentationCard key={presentation.id} presentation={presentation} />
					))}
				</ul>
			</section>
		</main>
	);
}

export default PresentationMenu;
