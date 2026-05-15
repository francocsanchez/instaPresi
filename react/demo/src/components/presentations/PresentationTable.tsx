import type { PresentationDefinition } from '../../types/presentations';
import {
	TableBody,
	TableHead,
	TableHeaderCell,
	TableRoot,
	TableRow,
} from '../ui/Table';
import PresentationRow from './PresentationRow';

type PresentationTableProps = {
	presentations: PresentationDefinition[];
};

function EmptyState() {
	return (
		<div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
			<div className="max-w-sm space-y-2 px-8 text-center">
				<p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
					Sin presentaciones
				</p>
				<h2 className="text-[1rem] font-semibold tracking-[-0.02em] text-slate-900">
					No hay presentaciones disponibles
				</h2>
				<p className="text-[0.78rem] leading-6 text-slate-500">
					Cuando agregues nuevas presentaciones al catalogo del proyecto, apareceran
					listadas aqui automaticamente.
				</p>
			</div>
		</div>
	);
}

function PresentationTable({ presentations }: PresentationTableProps) {
	if (presentations.length === 0) {
		return <EmptyState />;
	}

	return (
		<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
			<TableRoot className="mt-0">
				<TableHead>
					<TableRow className="border-t-0 hover:bg-transparent">
						<TableHeaderCell className="w-[92px]">ID</TableHeaderCell>
						<TableHeaderCell className="w-[34%]">Titulo</TableHeaderCell>
						<TableHeaderCell className="w-[18%]">Categorias</TableHeaderCell>
						<TableHeaderCell className="w-[14%]">Autor</TableHeaderCell>
						<TableHeaderCell className="w-[12%]">Fecha</TableHeaderCell>
						<TableHeaderCell className="w-[84px]">Slides</TableHeaderCell>
						<TableHeaderCell className="w-[124px] text-right">Accion</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{presentations.map((presentation) => (
						<PresentationRow
							key={presentation.id ?? presentation.path}
							presentation={presentation}
						/>
					))}
				</TableBody>
			</TableRoot>
		</div>
	);
}

export default PresentationTable;
