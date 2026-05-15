import { useEffect, useState } from 'react';
import PresentationMenu from './components/PresentationMenu';
import PresentationRouter from './components/PresentationRouter';
import { presentations } from './presentations/catalog';
import { getRoute } from './utils/routing';

function App() {
	const [route, setRoute] = useState(() => getRoute(window.location.pathname));

	useEffect(() => {
		const syncRoute = () => {
			setRoute(getRoute(window.location.pathname));
		};

		window.addEventListener('popstate', syncRoute);
		return () => window.removeEventListener('popstate', syncRoute);
	}, []);

	if (route.kind === 'home') {
		return <PresentationMenu presentations={presentations} />;
	}

	return <PresentationRouter route={route} presentations={presentations} />;
}

export default App;
