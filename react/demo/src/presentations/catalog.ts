import type { ComponentType } from 'react';
import Ppt1Presentation from './ppt1/Presentation';
import Ppt2Presentation from './ppt2/Presentation';
import Ppt3Presentation from './ppt3/Presentation';

export type PresentationDefinition = {
	slug: string;
	title: string;
	component: ComponentType;
};

export const presentations: PresentationDefinition[] = [
	{
		slug: 'ppt1',
		title: 'PPT 1',
		component: Ppt1Presentation,
	},
	{
		slug: 'ppt2',
		title: 'PPT 2',
		component: Ppt2Presentation,
	},
	{
		slug: 'ppt3',
		title: 'PPT 3',
		component: Ppt3Presentation,
	},
];
