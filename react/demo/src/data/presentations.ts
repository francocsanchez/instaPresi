import Ppt1Presentation from '../presentations/ppt1/Presentation';
import Ppt2Presentation from '../presentations/ppt2/Presentation';
import Ppt3Presentation from '../presentations/ppt3/Presentation';
import type { PresentationDefinition } from '../types/presentations';

export const presentations: PresentationDefinition[] = [
	{
		id: 'ppt1',
		title: 'Presentacion 1',
		author: 'Juan Perez',
		date: '2026-05-15',
		categories: ['convencional', 'patentamiento'],
		path: '/presentations/ppt1',
		component: Ppt1Presentation,
	},
	{
		id: 'ppt2',
		title: 'Presentacion 2',
		author: 'Maria Gomez',
		date: '2026-05-10',
		categories: ['administracion'],
		path: '/presentations/ppt2',
		component: Ppt2Presentation,
	},
	{
		id: 'ppt3',
		title: 'Presentacion 3',
		author: 'Equipo Comercial',
		date: '2026-05-08',
		categories: ['seguimiento', 'resumen ejecutivo'],
		path: '/presentations/ppt3',
		component: Ppt3Presentation,
	},
];
