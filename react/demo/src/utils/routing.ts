export type Route =
	| { kind: 'home' }
	| { kind: 'presentation'; slug: string }
	| { kind: 'not-found' };

export function normalizePath(pathname: string) {
	const cleaned = pathname.replace(/\/+$/, '');
	return cleaned === '' ? '/' : cleaned;
}

export function getRoute(pathname: string): Route {
	const normalizedPath = normalizePath(pathname);

	if (normalizedPath === '/') {
		return { kind: 'home' };
	}

	const match = normalizedPath.match(/^\/presentations\/([^/]+)$/);
	if (match) {
		return { kind: 'presentation', slug: match[1] };
	}

	return { kind: 'not-found' };
}

function navigate(pathname: string) {
	window.history.pushState({}, '', pathname);
	window.dispatchEvent(new PopStateEvent('popstate'));
}

export function navigateToPresentation(slug: string) {
	navigate(`/presentations/${slug}`);
}

export function goHome() {
	navigate('/');
}
