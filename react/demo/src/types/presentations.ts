import type { ComponentType } from 'react';

export type PresentationMetadata = {
	id?: string;
	title: string;
	slug?: string;
	author: string;
	date: string;
	categories: string[];
	path: string;
};

export type PresentationDefinition = PresentationMetadata & {
	component: ComponentType;
};
