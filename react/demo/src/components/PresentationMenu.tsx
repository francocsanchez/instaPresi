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

				<div className="menu-table-wrap">
					<table className="menu-table">
						<thead>
							<tr>
								<th scope="col">Presentacion</th>
								<th scope="col">Autor</th>
								<th scope="col">Fecha</th>
								<th scope="col">Categorias</th>
								<th scope="col" aria-label="Accion" />
							</tr>
						</thead>
						<tbody>
							{presentations.map((presentation) => (
								<PresentationCard key={presentation.id} presentation={presentation} />
							))}
						</tbody>
					</table>
				</div>
			</section>
		</main>
	);
}

export default PresentationMenu;
