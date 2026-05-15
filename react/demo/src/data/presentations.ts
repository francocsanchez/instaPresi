import Ppt1Presentation from '../presentations/ppt1/Presentation';
import Ppt2Presentation from '../presentations/ppt2/Presentation';
import Ppt3Presentation from '../presentations/ppt3/Presentation';
import Patentamientos2025Presentation from '../presentations/patentamientos-2020-2025/Presentation';
import ReporteVentasRegionNorte2026Presentation from '../presentations/reporte-ventas-region-norte-2026/Presentation';
import PanelPosventaCamiones2026Presentation from '../presentations/panel-posventa-camiones-2026/Presentation';
import Test12Presentation from '../presentations/test-12/Presentation';
import type { PresentationDefinition } from '../types/presentations';

export const presentations: PresentationDefinition[] = [
	{
		id: 'patentamientos-2020-2025',
		title: 'Informe comparativo de patentamientos 2020-2025',
		author: 'Franco Sanchez',
		date: '15/5/2026',
		categories: ['convencional', 'patentamientos'],
		path: '/presentations/patentamientos-2020-2025',
		component: Patentamientos2025Presentation,
	},
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
	{
		id: 'reporte-ventas-region-norte-2026',
		title: 'Reporte Ventas Region Norte 2026',
		author: 'Franco Sanchez',
		date: '2026-05-15',
		categories: ['convencional', 'ventas', 'seguimiento'],
		path: '/presentations/reporte-ventas-region-norte-2026',
		component: ReporteVentasRegionNorte2026Presentation,
	},
	{
		id: 'panel-posventa-camiones-2026',
		title: 'Panel Posventa Camiones 2026',
		author: 'Franco Sanchez',
		date: '2026-05-16',
		categories: ['posventa', 'camiones', 'seguimiento'],
		path: '/presentations/panel-posventa-camiones-2026',
		component: PanelPosventaCamiones2026Presentation,
	},
	{
		id: 'test-12',
		title: 'Test 12',
		author: 'Franco Sanchez',
		date: '15/5/2026',
		categories: ['carreras', 'comida'],
		path: '/presentations/test-12',
		component: Test12Presentation,
	},
];
