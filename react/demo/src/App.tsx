import type { ComponentType } from 'react';
import DemoPresentation from './presentations/demo/Presentation';

type PresentationModule = {
	title: string;
	component: ComponentType;
};

const presentations: Record<string, PresentationModule> = {
	demo: {
		title: 'Demo',
		component: DemoPresentation,
	},
};

function normalizePath(pathname: string) {
	const cleaned = pathname.replace(/\/+$/, '') || '/';
	if (cleaned === '/') {
		return 'demo';
	}

	const match = cleaned.match(/^\/presentations\/([^/]+)$/);
	return match?.[1] ?? null;
}

function App() {
	const presentationKey = normalizePath(window.location.pathname);

	if (!presentationKey || !(presentationKey in presentations)) {
		return (
			<div
				style={{
					minHeight: '100vh',
					display: 'grid',
					placeItems: 'center',
					padding: '2rem',
					background:
						'radial-gradient(circle at top, rgba(54, 83, 130, 0.35), transparent 42%), #08111f',
					color: '#f5f7fb',
					fontFamily: 'system-ui, sans-serif',
				}}
			>
				<div style={{ maxWidth: '42rem', textAlign: 'center' }}>
					<p style={{ letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.72 }}>
						Presentacion no encontrada
					</p>
					<h1 style={{ marginBottom: '0.75rem' }}>Elegi una presentacion valida</h1>
					<p style={{ marginBottom: '1rem', opacity: 0.8 }}>
						Usa la ruta <code>/presentations/demo</code> o entra a la raiz para abrir la demo.
					</p>
					<ul
						style={{
							listStyle: 'none',
							padding: 0,
							margin: 0,
							display: 'grid',
							gap: '0.5rem',
						}}
					>
						{Object.entries(presentations).map(([key, presentation]) => (
							<li key={key}>
								<a href={`/presentations/${key}`} style={{ color: '#9fd0ff' }}>
									{presentation.title}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}

	const SelectedPresentation = presentations[presentationKey].component;
	return <SelectedPresentation />;
}

export default App;
