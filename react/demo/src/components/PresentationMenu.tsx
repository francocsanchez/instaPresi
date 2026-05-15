import type { PresentationDefinition } from '../presentations/catalog';
import { navigateToPresentation } from '../utils/routing';
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
					carpeta dentro de <code>src/presentations</code> y registrala en el catalogo.
				</p>

				<ul className="menu-list">
					{presentations.map((presentation) => (
						<li key={presentation.slug}>
							<button
								type="button"
								className="menu-card"
								onClick={() => navigateToPresentation(presentation.slug)}
							>
								<span className="menu-card-title">{presentation.title}</span>
								<span className="menu-card-path">
									{`/presentations/${presentation.slug}`}
								</span>
							</button>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}

export default PresentationMenu;
