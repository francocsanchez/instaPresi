import type { PresentationDefinition } from '../types/presentations';
import { goHome, type Route } from '../utils/routing';

type PresentationRouterProps = {
	route: Route;
	presentations: PresentationDefinition[];
};

function PresentationRouter({ route, presentations }: PresentationRouterProps) {
	if (route.kind === 'presentation') {
		const selectedPresentation = presentations.find(
			(presentation) => presentation.path === route.path
		);

		if (selectedPresentation) {
			const PresentationComponent = selectedPresentation.component;
			return <PresentationComponent />;
		}
	}

	return (
		<main
			style={{
				minHeight: '100vh',
				display: 'grid',
				placeItems: 'center',
				padding: '2rem',
				background: '#f2f2f2',
				color: '#111111',
				fontFamily:
					'"Segoe UI", "Helvetica Neue", Arial, sans-serif',
			}}
		>
			<section style={{ width: 'min(100%, 36rem)' }}>
				<p
					style={{
						margin: 0,
						fontSize: '0.8rem',
						letterSpacing: '0.18em',
						textTransform: 'uppercase',
						color: '#666666',
					}}
				>
					Presentacion no encontrada
				</p>
				<h1 style={{ margin: '0.75rem 0 1rem', fontSize: '2.3rem' }}>
					La ruta no corresponde a una presentacion cargada
				</h1>
				<p style={{ margin: 0, lineHeight: 1.6, color: '#444444' }}>
					Vuelve al menu principal para abrir una presentacion disponible.
				</p>
				<button
					type="button"
					onClick={goHome}
					style={{
						marginTop: '1.5rem',
						padding: '0.9rem 1.2rem',
						borderRadius: '999px',
						border: '1px solid #1c1c1c',
						background: '#111111',
						color: '#ffffff',
						cursor: 'pointer',
					}}
				>
					Volver al menu
				</button>
			</section>
		</main>
	);
}

export default PresentationRouter;
