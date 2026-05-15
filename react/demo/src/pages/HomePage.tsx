import type { PresentationDefinition } from '../types/presentations';
import PresentationTable from '../components/presentations/PresentationTable';

type HomePageProps = {
	presentations: PresentationDefinition[];
};

function HomePage({ presentations }: HomePageProps) {
	const totalPresentations = presentations.length;
	const counterLabel =
		totalPresentations === 1 ? '1 presentacion' : `${totalPresentations} presentaciones`;

	return (
		<main className="min-h-screen bg-white text-slate-900">
			<div className="mx-auto w-full max-w-[1240px] px-6 py-7 max-lg:px-4 max-lg:py-5">
				<div className="mb-5 flex items-start justify-between gap-6 max-lg:flex-col max-lg:gap-3">
					<div className="space-y-1.5">
						<p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
							Presentaciones
						</p>
						<h1 className="text-[1.45rem] font-semibold tracking-[-0.03em] text-slate-950">
							Presentaciones
						</h1>
						<p className="text-[0.82rem] leading-6 text-slate-500">
							Listado de presentaciones disponibles
						</p>
					</div>

					<div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[0.75rem] font-medium text-slate-600">
						{counterLabel}
					</div>
				</div>

				<PresentationTable presentations={presentations} />
			</div>
		</main>
	);
}

export default HomePage;
