import type { PresentationDefinition } from '../types/presentations';
import { navigateToPresentation } from '../utils/routing';

type PresentationCardProps = {
	presentation: PresentationDefinition;
};

function PresentationCard({ presentation }: PresentationCardProps) {
	return (
		<li>
			<button
				type="button"
				className="menu-card"
				onClick={() => navigateToPresentation(presentation.path)}
			>
				<span className="menu-card-title">{presentation.title}</span>
				<span className="menu-card-meta">{`Autor: ${presentation.author}`}</span>
				<span className="menu-card-meta">{`Fecha: ${presentation.date}`}</span>
				<span className="menu-card-meta">
					{`Categorias: ${presentation.categories.join(', ')}`}
				</span>
				<span className="menu-card-path">{presentation.path}</span>
			</button>
		</li>
	);
}

export default PresentationCard;
