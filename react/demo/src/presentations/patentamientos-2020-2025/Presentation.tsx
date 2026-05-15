import { Fragment, Slide, Deck } from '@revealjs/react';
import type { ChartConfiguration } from 'chart.js/auto';
import PresentationFrame from '../../components/PresentationFrame';
import ChartCanvas from './ChartCanvas';
import {
	annualRows,
	chineseShareNational,
	chineseShareNic,
	chineseVolumeNational,
	chineseVolumeNic,
	conclusionPoints,
	executiveHighlights,
	keyMetrics,
	nicIndexedTrend,
	nicNationalShare,
	provinceGrowth2020to2025,
	provinceVolume2025,
	restIndexedTrend,
	sourceNote,
	topNationalChinese2025,
	topNicChinese2025,
	years,
} from './data';
import 'reveal.js/reveal.css';
import 'reveal.js/theme/white.css';
import './styles.css';

const numberFormatter = new Intl.NumberFormat('es-AR');
const percentFormatter = new Intl.NumberFormat('es-AR', {
	minimumFractionDigits: 1,
	maximumFractionDigits: 1,
});
const compactFormatter = new Intl.NumberFormat('es-AR', {
	notation: 'compact',
	maximumFractionDigits: 1,
});

const palette = {
	ink: '#2b2c3b',
	title: '#494c66',
	accent: '#7a7fb1',
	accentDeep: '#686c9a',
	accentSoft: '#9199c3',
	accentPale: '#a8b2d1',
	line: '#ccd4e5',
	panel: '#f4f6f9',
	panelStrong: '#eaeef5',
};

function buildBaseOptions(): ChartConfiguration['options'] {
	return {
		responsive: true,
		maintainAspectRatio: false,
		animation: {
			duration: 1200,
			easing: 'easeOutQuart',
		},
		plugins: {
			legend: {
				labels: {
					color: palette.ink,
					font: {
						family: 'Aptos, Segoe UI, sans-serif',
						size: 12,
						weight: '600',
					},
					usePointStyle: true,
					boxWidth: 10,
				},
			},
			tooltip: {
				backgroundColor: 'rgba(43, 44, 59, 0.92)',
				titleFont: { family: 'Aptos, Segoe UI, sans-serif', size: 13, weight: '700' },
				bodyFont: { family: 'Aptos, Segoe UI, sans-serif', size: 12 },
				padding: 12,
				displayColors: true,
			},
		},
		scales: {
			x: {
				grid: { display: false },
				ticks: {
					color: palette.title,
					font: {
						family: 'Aptos, Segoe UI, sans-serif',
						size: 11,
						weight: '600',
					},
				},
				border: { display: false },
			},
			y: {
				grid: {
					color: 'rgba(122, 127, 177, 0.16)',
					drawTicks: false,
				},
				ticks: {
					color: palette.title,
					font: {
						family: 'Aptos, Segoe UI, sans-serif',
						size: 11,
					},
				},
				border: { display: false },
			},
		},
	};
}

function indexedEvolutionConfig(): ChartConfiguration<'line'> {
	const options = buildBaseOptions();
	return {
		type: 'line',
		data: {
			labels: years,
			datasets: [
				{
					label: 'Zona NIC (2020 = 100)',
					data: nicIndexedTrend,
					borderColor: palette.accentDeep,
					backgroundColor: 'rgba(104, 108, 154, 0.12)',
					tension: 0.35,
					fill: false,
					pointRadius: 4,
					pointHoverRadius: 5,
					pointBackgroundColor: palette.accentDeep,
					borderWidth: 3,
				},
				{
					label: 'Resto del país (2020 = 100)',
					data: restIndexedTrend,
					borderColor: palette.accentPale,
					backgroundColor: 'rgba(168, 178, 209, 0.16)',
					tension: 0.35,
					fill: false,
					pointRadius: 4,
					pointHoverRadius: 5,
					pointBackgroundColor: palette.accentPale,
					borderWidth: 3,
				},
			],
		},
		options: {
			...options,
			plugins: {
				...options?.plugins,
				title: {
					display: true,
					text: 'Evolución indexada del patentamiento',
					align: 'start',
					color: palette.title,
					font: {
						family: 'Georgia, Cambria, serif',
						size: 16,
						weight: '700',
					},
					padding: { bottom: 14 },
				},
			},
			scales: {
				...options?.scales,
				y: {
					...(options?.scales?.y ?? {}),
					ticks: {
						color: palette.title,
						callback(value) {
							return `${value}`;
						},
					},
				},
			},
		},
	};
}

function nicShareConfig(): ChartConfiguration<'line'> {
	const options = buildBaseOptions();
	return {
		type: 'line',
		data: {
			labels: years,
			datasets: [
				{
					label: 'Participación NIC sobre país',
					data: nicNationalShare,
					borderColor: palette.accent,
					backgroundColor: 'rgba(122, 127, 177, 0.12)',
					tension: 0.35,
					fill: true,
					pointRadius: 3.5,
					pointBackgroundColor: palette.accent,
					borderWidth: 2.5,
				},
			],
		},
		options: {
			...options,
			plugins: {
				...options?.plugins,
				legend: { display: false },
				title: {
					display: true,
					text: 'Participación NIC en el total país',
					align: 'start',
					color: palette.title,
					font: {
						family: 'Georgia, Cambria, serif',
						size: 15,
						weight: '700',
					},
					padding: { bottom: 14 },
				},
			},
			scales: {
				...options?.scales,
				y: {
					...(options?.scales?.y ?? {}),
					ticks: {
						color: palette.title,
						callback(value) {
							return `${value}%`;
						},
					},
				},
			},
		},
	};
}

function chineseVolumeConfig(): ChartConfiguration<'line'> {
	const options = buildBaseOptions();
	const indexedNational = chineseVolumeNational.map((value) =>
		Number(((value / chineseVolumeNational[0]) * 100).toFixed(1))
	);
	const indexedNic = chineseVolumeNic.map((value) =>
		Number(((value / chineseVolumeNic[0]) * 100).toFixed(1))
	);

	return {
		type: 'line',
		data: {
			labels: years,
			datasets: [
				{
					label: 'País (2020 = 100)',
					data: indexedNational,
					borderColor: palette.accentDeep,
					backgroundColor: 'rgba(104, 108, 154, 0.10)',
					tension: 0.35,
					fill: false,
					pointRadius: 4,
					pointBackgroundColor: palette.accentDeep,
					borderWidth: 3,
				},
				{
					label: 'NIC (2020 = 100)',
					data: indexedNic,
					borderColor: palette.accentPale,
					backgroundColor: 'rgba(168, 178, 209, 0.10)',
					tension: 0.35,
					fill: false,
					pointRadius: 4,
					pointBackgroundColor: palette.accentPale,
					borderWidth: 3,
				},
			],
		},
		options: {
			...options,
			plugins: {
				...options?.plugins,
				title: {
					display: true,
					text: 'Crecimiento de marcas chinas',
					align: 'start',
					color: palette.title,
					font: {
						family: 'Georgia, Cambria, serif',
						size: 15,
						weight: '700',
					},
					padding: { bottom: 14 },
				},
			},
		},
	};
}

function chineseShareConfig(): ChartConfiguration<'line'> {
	const options = buildBaseOptions();

	return {
		type: 'line',
		data: {
			labels: years,
			datasets: [
				{
					label: 'Share país',
					data: chineseShareNational,
					borderColor: palette.accentDeep,
					backgroundColor: 'rgba(104, 108, 154, 0.10)',
					tension: 0.35,
					fill: false,
					pointRadius: 4,
					pointBackgroundColor: palette.accentDeep,
					borderWidth: 3,
				},
				{
					label: 'Share NIC',
					data: chineseShareNic,
					borderColor: palette.accentPale,
					backgroundColor: 'rgba(168, 178, 209, 0.10)',
					tension: 0.35,
					fill: false,
					pointRadius: 4,
					pointBackgroundColor: palette.accentPale,
					borderWidth: 3,
				},
			],
		},
		options: {
			...options,
			plugins: {
				...options?.plugins,
				title: {
					display: true,
					text: 'Participación de mercado',
					align: 'start',
					color: palette.title,
					font: {
						family: 'Georgia, Cambria, serif',
						size: 15,
						weight: '700',
					},
					padding: { bottom: 14 },
				},
			},
			scales: {
				...options?.scales,
				y: {
					...(options?.scales?.y ?? {}),
					ticks: {
						color: palette.title,
						callback(value) {
							return `${value}%`;
						},
					},
				},
			},
		},
	};
}

function provinceVolumeConfig(): ChartConfiguration<'bar'> {
	const options = buildBaseOptions();
	return {
		type: 'bar',
		data: {
			labels: provinceVolume2025.map((item) => item.label),
			datasets: [
				{
					label: 'Patentamientos 2025',
					data: provinceVolume2025.map((item) => item.value),
					backgroundColor: provinceVolume2025.map((item) =>
						item.isNic ? palette.accentDeep : palette.accentPale
					),
					borderRadius: 14,
					borderSkipped: false,
				},
			],
		},
		options: {
			...options,
			indexAxis: 'y',
			plugins: {
				...options?.plugins,
				legend: { display: false },
				title: {
					display: true,
					text: 'Volumen 2025: NIC frente a las principales plazas',
					align: 'start',
					color: palette.title,
					font: {
						family: 'Georgia, Cambria, serif',
						size: 16,
						weight: '700',
					},
					padding: { bottom: 14 },
				},
			},
			scales: {
				x: {
					...(options?.scales?.x ?? {}),
					ticks: {
						color: palette.title,
						callback(value) {
							return compactFormatter.format(Number(value));
						},
					},
				},
				y: {
					...(options?.scales?.y ?? {}),
					grid: { display: false },
				},
			},
		},
	};
}

function provinceGrowthConfig(): ChartConfiguration<'bar'> {
	const options = buildBaseOptions();
	return {
		type: 'bar',
		data: {
			labels: provinceGrowth2020to2025.map((item) => item.label),
			datasets: [
				{
					label: 'Crecimiento acumulado 2020-2025',
					data: provinceGrowth2020to2025.map((item) => item.value),
					backgroundColor: provinceGrowth2020to2025.map((item) =>
						item.isNic ? palette.accentDeep : palette.accentSoft
					),
					borderRadius: 14,
					borderSkipped: false,
				},
			],
		},
		options: {
			...options,
			indexAxis: 'y',
			plugins: {
				...options?.plugins,
				legend: { display: false },
				title: {
					display: true,
					text: 'Provincias con mayor crecimiento acumulado',
					align: 'start',
					color: palette.title,
					font: {
						family: 'Georgia, Cambria, serif',
						size: 16,
						weight: '700',
					},
					padding: { bottom: 14 },
				},
			},
			scales: {
				x: {
					...(options?.scales?.x ?? {}),
					ticks: {
						color: palette.title,
						callback(value) {
							return `${value}%`;
						},
					},
				},
				y: {
					...(options?.scales?.y ?? {}),
					grid: { display: false },
				},
			},
		},
	};
}

function formatSignedPercent(value: number | null) {
	if (value === null) {
		return 'Base';
	}

	const signal = value > 0 ? '+' : '';
	return `${signal}${percentFormatter.format(value)}%`;
}

function RankedList({
	title,
	items,
	suffix = '',
}: {
	title: string;
	items: { label: string; value: number }[];
	suffix?: string;
}) {
	return (
		<div className="ppt-pat-ranking">
			<p className="ppt-pat-chart-kicker">{title}</p>
			<ul>
				{items.map((item) => (
					<li key={item.label}>
						<span>{item.label}</span>
						<strong>
							{numberFormatter.format(item.value)}
							{suffix}
						</strong>
					</li>
				))}
			</ul>
		</div>
	);
}

function Presentation() {
	return (
		<PresentationFrame>
			<Deck
				config={{
					hash: true,
					controls: true,
					progress: true,
					center: false,
					transition: 'fade',
					backgroundTransition: 'fade',
					autoAnimate: true,
					width: 1280,
					height: 720,
					slideNumber: 'c/t',
				}}
			>
				<Slide className="ppt-pat-slide ppt-pat-cover" data-auto-animate>
					<div className="ppt-pat-cover__grid">
						<div>
							<p className="ppt-pat-kicker">Informe comparativo de patentamientos</p>
							<h1>2020-2025</h1>
							<p className="ppt-pat-cover__lead">
								Zona NIC, marcas chinas y posicionamiento provincial en una
								lectura ejecutiva del ciclo 2020-2025.
							</p>
						</div>
						<div className="ppt-pat-cover__aside">
							<div className="ppt-pat-cover__metric">
								<span>Zona NIC 2025</span>
								<strong>{numberFormatter.format(keyMetrics.nic2025Units)}</strong>
							</div>
							<div className="ppt-pat-cover__metric">
								<span>Total país 2025</span>
								<strong>{numberFormatter.format(keyMetrics.national2025Units)}</strong>
							</div>
							<div className="ppt-pat-cover__meta">
								<p>Franco Sanchez</p>
								<p>15/5/2026</p>
								<p>Convencional · Patentamientos</p>
							</div>
						</div>
					</div>
				</Slide>

				<Slide className="ppt-pat-slide ppt-pat-summary" data-auto-animate>
					<div className="ppt-pat-heading">
						<p className="ppt-pat-kicker">Resumen ejecutivo</p>
						<h2>NIC gana peso relativo y acelera con fuerza en 2025</h2>
					</div>

					<div className="ppt-pat-highlights">
						{executiveHighlights.map((highlight) => (
							<Fragment key={highlight.label}>
								<article className="ppt-pat-highlight-card">
									<p>{highlight.label}</p>
									<h3>{highlight.value}</h3>
									<span>{highlight.detail}</span>
								</article>
							</Fragment>
						))}
					</div>

					<div className="ppt-pat-summary__notes">
						<Fragment>
							<div className="ppt-pat-note">
								<strong>2024 fue una pausa, no un quiebre.</strong>
								<p>
									El retroceso nacional fue más profundo que en NIC, por eso la
									zona alcanzó su mayor participación relativa ese año.
								</p>
							</div>
						</Fragment>
						<Fragment>
							<div className="ppt-pat-note">
								<strong>El rebote 2025 reposicionó a las marcas chinas.</strong>
								<p>
									Su crecimiento fue el tema más disruptivo de la serie, sobre
									todo a nivel país.
								</p>
							</div>
						</Fragment>
					</div>
				</Slide>

				<Slide className="ppt-pat-slide ppt-pat-analytics" data-auto-animate>
					<div className="ppt-pat-heading">
						<p className="ppt-pat-kicker">NIC vs resto del país</p>
						<h2>La zona cerró 2025 un 14,4% por encima del ritmo acumulado del resto del país</h2>
					</div>

					<div className="ppt-pat-analytics__grid">
						<ChartCanvas
							className="ppt-pat-chart-card"
							config={indexedEvolutionConfig()}
							label="Evolución indexada de patentamientos NIC y resto del país"
						/>
						<div className="ppt-pat-side-panel">
							<div className="ppt-pat-side-panel__stats">
								<div>
									<span>Crecimiento NIC</span>
									<strong>+{percentFormatter.format(keyMetrics.nicGrowthPct)}%</strong>
								</div>
								<div>
									<span>Crecimiento resto país</span>
									<strong>+{percentFormatter.format(keyMetrics.restGrowthPct)}%</strong>
								</div>
								<div>
									<span>Share NIC 2025</span>
									<strong>{percentFormatter.format(keyMetrics.nicShare2025Pct)}%</strong>
								</div>
							</div>
							<ChartCanvas
								className="ppt-pat-chart-card ppt-pat-chart-card--compact"
								config={nicShareConfig()}
								label="Participación de NIC sobre el país"
							/>
						</div>
					</div>

					<div className="ppt-pat-table">
						<div className="ppt-pat-table__head">
							<span>Año</span>
							<span>NIC</span>
							<span>YoY NIC</span>
							<span>Resto país</span>
							<span>YoY resto</span>
							<span>Share NIC</span>
						</div>
						{annualRows.map((row) => (
							<div key={row.year} className="ppt-pat-table__row">
								<span>{row.year}</span>
								<span>{numberFormatter.format(row.nic)}</span>
								<span>{formatSignedPercent(row.nicYoy)}</span>
								<span>{numberFormatter.format(row.rest)}</span>
								<span>{formatSignedPercent(row.restYoy)}</span>
								<span>{percentFormatter.format(row.nicShare)}%</span>
							</div>
						))}
					</div>
				</Slide>

				<Slide className="ppt-pat-slide ppt-pat-analytics" data-auto-animate>
					<div className="ppt-pat-heading">
						<p className="ppt-pat-kicker">Marcas chinas</p>
						<h2>El salto 2025 multiplicó el peso de las marcas chinas, aunque NIC sigue por debajo del promedio país</h2>
					</div>

					<div className="ppt-pat-two-up">
						<ChartCanvas
							className="ppt-pat-chart-card"
							config={chineseVolumeConfig()}
							label="Crecimiento indexado de patentamientos de marcas chinas"
						/>
						<ChartCanvas
							className="ppt-pat-chart-card"
							config={chineseShareConfig()}
							label="Participación de mercado de marcas chinas en país y NIC"
						/>
					</div>

					<div className="ppt-pat-insight-strip">
						<Fragment>
							<div className="ppt-pat-mini-stat">
								<span>País 2025</span>
								<strong>{numberFormatter.format(chineseVolumeNational[5])}</strong>
								<em>{percentFormatter.format(keyMetrics.cnNationalShare2025Pct)}% del mercado</em>
							</div>
						</Fragment>
						<Fragment>
							<div className="ppt-pat-mini-stat">
								<span>NIC 2025</span>
								<strong>{numberFormatter.format(chineseVolumeNic[5])}</strong>
								<em>{percentFormatter.format(keyMetrics.cnNicShare2025Pct)}% del mercado</em>
							</div>
						</Fragment>
						<Fragment>
							<div className="ppt-pat-mini-stat">
								<span>Brecha de penetración</span>
								<strong>2,0x</strong>
								<em>el share país duplicó al de NIC en 2025</em>
							</div>
						</Fragment>
					</div>

					<div className="ppt-pat-rankings">
						<RankedList title="Liderazgo 2025 en país" items={topNationalChinese2025} />
						<RankedList title="Liderazgo 2025 en NIC" items={topNicChinese2025} />
					</div>
				</Slide>

				<Slide className="ppt-pat-slide ppt-pat-analytics" data-auto-animate>
					<div className="ppt-pat-heading">
						<p className="ppt-pat-kicker">Comparativa entre provincias</p>
						<h2>Si NIC se midiera como bloque, sería la quinta plaza del país en patentamientos 2025</h2>
					</div>

					<div className="ppt-pat-analytics__grid ppt-pat-analytics__grid--wide">
						<ChartCanvas
							className="ppt-pat-chart-card"
							config={provinceVolumeConfig()}
							label="Comparativa provincial y zona NIC por volumen 2025"
						/>
						<div className="ppt-pat-side-panel ppt-pat-side-panel--volume">
							<div className="ppt-pat-note">
								<strong>NIC supera a Mendoza como bloque.</strong>
								<p>
									La suma de Neuquen y Rio Negro llegó a {numberFormatter.format(keyMetrics.nic2025Units)}
									patentamientos, por encima de los {numberFormatter.format(15647)} de Mendoza.
								</p>
							</div>
							<div className="ppt-pat-note">
								<strong>La concentración sigue muy alta.</strong>
								<p>
									Buenos Aires, CABA, Cordoba y Santa Fe explican el grueso del
									mercado, pero NIC ya compite con plazas medias nacionales.
								</p>
							</div>
						</div>
					</div>
				</Slide>

				<Slide className="ppt-pat-slide ppt-pat-analytics" data-auto-animate>
					<div className="ppt-pat-heading">
						<p className="ppt-pat-kicker">Comparativa de crecimiento</p>
						<h2>NIC se ubica en el podio de mayor expansión acumulada del período</h2>
					</div>

					<div className="ppt-pat-analytics__grid ppt-pat-analytics__grid--wide">
						<ChartCanvas
							className="ppt-pat-chart-card"
							config={provinceGrowthConfig()}
							label="Ranking de crecimiento acumulado 2020-2025 por provincia y zona NIC"
						/>
						<div className="ppt-pat-side-panel ppt-pat-side-panel--growth">
							<Fragment>
								<div className="ppt-pat-note">
									<strong>Neuquen lideró el ranking provincial.</strong>
									<p>
										Con +93,9%, encabezó el crecimiento nacional, mientras Rio
										Negro aportó un +88,2% que elevó a NIC al 3° puesto como zona.
									</p>
								</div>
							</Fragment>
							<Fragment>
								<div className="ppt-pat-note">
									<strong>La lectura de bloque mejora el posicionamiento.</strong>
									<p>
										El desempeño combinado de ambas provincias muestra una escala
										comercial que no se aprecia al mirarlas por separado.
									</p>
								</div>
							</Fragment>
						</div>
					</div>
				</Slide>

				<Slide className="ppt-pat-slide ppt-pat-conclusion" data-auto-animate>
					<div className="ppt-pat-heading">
						<p className="ppt-pat-kicker">Conclusiones</p>
						<h2>Tres lecturas para decidir dónde poner foco comercial</h2>
					</div>

					<div className="ppt-pat-conclusion__grid">
						{conclusionPoints.map((point, index) => (
							<Fragment key={point}>
								<article className="ppt-pat-conclusion-card">
									<span>{`0${index + 1}`}</span>
									<p>{point}</p>
								</article>
							</Fragment>
						))}
					</div>

					<div className="ppt-pat-closing-band">
						<div>
							<span>Lectura final</span>
							<strong>NIC mostró resiliencia relativa, escala creciente y una oportunidad abierta en marcas chinas.</strong>
						</div>
						<p>{sourceNote}</p>
					</div>
				</Slide>
			</Deck>
		</PresentationFrame>
	);
}

export default Presentation;
