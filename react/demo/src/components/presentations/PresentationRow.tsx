import { PlayCircle } from 'lucide-react';
import type { PresentationDefinition } from '../../types/presentations';
import { navigateToPresentation } from '../../utils/routing';
import Button from '../ui/Button';
import Chip from '../ui/Chip';
import { TableCell, TableRow } from '../ui/Table';

type PresentationRowProps = {
	presentation: PresentationDefinition;
};

function PresentationRow({ presentation }: PresentationRowProps) {
	const presentationId = presentation.id ?? 'SIN-ID';
	const slideCount = presentation.slides ?? 0;

	return (
		<TableRow className="group hover:bg-slate-50/80 max-lg:block">
			<TableCell className="w-[92px] text-[0.72rem] font-semibold text-slate-900 max-lg:block max-lg:w-auto max-lg:px-4 max-lg:py-2.5 max-lg:before:mb-1 max-lg:before:block max-lg:before:text-[0.62rem] max-lg:before:font-semibold max-lg:before:uppercase max-lg:before:tracking-[0.16em] max-lg:before:text-slate-400 max-lg:before:content-['ID']">
				{presentationId}
			</TableCell>

			<TableCell className="w-[34%] max-lg:block max-lg:w-auto max-lg:px-4 max-lg:py-2.5 max-lg:before:mb-1 max-lg:before:block max-lg:before:text-[0.62rem] max-lg:before:font-semibold max-lg:before:uppercase max-lg:before:tracking-[0.16em] max-lg:before:text-slate-400 max-lg:before:content-['Titulo']">
				<div className="space-y-0.5">
					<p className="text-[0.78rem] font-semibold leading-5 tracking-[-0.01em] text-slate-900">
						{presentation.title}
					</p>
					<p className="truncate text-[0.67rem] text-slate-400">{presentation.path}</p>
				</div>
			</TableCell>

			<TableCell className="w-[18%] max-lg:block max-lg:w-auto max-lg:px-4 max-lg:py-2.5 max-lg:before:mb-1 max-lg:before:block max-lg:before:text-[0.62rem] max-lg:before:font-semibold max-lg:before:uppercase max-lg:before:tracking-[0.16em] max-lg:before:text-slate-400 max-lg:before:content-['Categorias']">
				<div className="flex flex-wrap gap-1.5">
					{presentation.categories.map((category) => (
						<Chip key={category} className="bg-slate-50 text-slate-600">
							{category}
						</Chip>
					))}
				</div>
			</TableCell>

			<TableCell className="w-[14%] text-[0.74rem] text-slate-700 max-lg:block max-lg:w-auto max-lg:px-4 max-lg:py-2.5 max-lg:before:mb-1 max-lg:before:block max-lg:before:text-[0.62rem] max-lg:before:font-semibold max-lg:before:uppercase max-lg:before:tracking-[0.16em] max-lg:before:text-slate-400 max-lg:before:content-['Autor']">
				{presentation.author}
			</TableCell>

			<TableCell className="w-[12%] text-[0.74rem] text-slate-700 max-lg:block max-lg:w-auto max-lg:px-4 max-lg:py-2.5 max-lg:before:mb-1 max-lg:before:block max-lg:before:text-[0.62rem] max-lg:before:font-semibold max-lg:before:uppercase max-lg:before:tracking-[0.16em] max-lg:before:text-slate-400 max-lg:before:content-['Fecha']">
				{presentation.date}
			</TableCell>

			<TableCell className="w-[84px] text-[0.74rem] text-slate-700 max-lg:block max-lg:w-auto max-lg:px-4 max-lg:py-2.5 max-lg:before:mb-1 max-lg:before:block max-lg:before:text-[0.62rem] max-lg:before:font-semibold max-lg:before:uppercase max-lg:before:tracking-[0.16em] max-lg:before:text-slate-400 max-lg:before:content-['Slides']">
				{slideCount}
			</TableCell>

			<TableCell className="w-[124px] text-right max-lg:block max-lg:w-auto max-lg:px-4 max-lg:py-3 max-lg:text-left max-lg:before:mb-1 max-lg:before:block max-lg:before:text-[0.62rem] max-lg:before:font-semibold max-lg:before:uppercase max-lg:before:tracking-[0.16em] max-lg:before:text-slate-400 max-lg:before:content-['Accion']">
				<Button
					className="min-w-[96px] max-lg:w-full"
					onClick={() => navigateToPresentation(presentation.path)}
				>
					<PlayCircle size={14} aria-hidden="true" />
					<span>Presentar</span>
				</Button>
			</TableCell>
		</TableRow>
	);
}

export default PresentationRow;
