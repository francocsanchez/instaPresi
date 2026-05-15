import { useEffect, useState } from 'react';
import PresentationRouter from './components/PresentationRouter';
import { presentations } from './data/presentations';
import HomePage from './pages/HomePage';
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
		return <HomePage presentations={presentations} />;
	}

	return <PresentationRouter route={route} presentations={presentations} />;
}

export default App;
