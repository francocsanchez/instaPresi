import type { PresentationDefinition } from '../types/presentations';
import { navigateToPresentation } from '../utils/routing';

type PresentationCardProps = {
	presentation: PresentationDefinition;
};

function PresentationCard({ presentation }: PresentationCardProps) {
	return (
		<tr className="menu-row">
			<td className="menu-cell menu-cell-title">
				<div className="menu-title-block">
					<span className="menu-title">{presentation.title}</span>
					<span className="menu-path">{presentation.path}</span>
				</div>
			</td>
			<td className="menu-cell" data-label="Autor">
				{presentation.author}
			</td>
			<td className="menu-cell" data-label="Fecha">
				{presentation.date}
			</td>
			<td className="menu-cell" data-label="Categorias">
				{presentation.categories.join(', ')}
			</td>
			<td className="menu-cell menu-cell-action">
				<button
					type="button"
					className="menu-action"
					onClick={() => navigateToPresentation(presentation.path)}
				>
					Presentar
				</button>
			</td>
		</tr>
	);
}

export default PresentationCard;
