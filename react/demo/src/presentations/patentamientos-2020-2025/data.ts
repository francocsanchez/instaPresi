export type AnnualRow = {
	year: string;
	nic: number;
	rest: number;
	nicYoy: number | null;
	restYoy: number | null;
	nicShare: number;
};

export type RankedDatum = {
	label: string;
	value: number;
	isNic?: boolean;
};

export const years = ['2020', '2021', '2022', '2023', '2024', '2025'];

export const keyMetrics = {
	nicGrowthPct: 91.7,
	restGrowthPct: 67.6,
	nic2025YoyPct: 46.2,
	rest2025YoyPct: 50.5,
	nicShare2025Pct: 4.27,
	cnNationalShare2025Pct: 2.76,
	cnNicShare2025Pct: 1.38,
	cnNationalGrowthPct: 297.0,
	cnNicGrowthPct: 164.4,
	nic2025Units: 19383,
	national2025Units: 453959,
	rest2025Units: 434576,
};

export const annualRows: AnnualRow[] = [
	{ year: '2020', nic: 10113, rest: 259325, nicYoy: null, restYoy: null, nicShare: 3.75 },
	{ year: '2021', nic: 9819, rest: 269703, nicYoy: -2.9, restYoy: 4.0, nicShare: 3.51 },
	{ year: '2022', nic: 10825, rest: 288280, nicYoy: 10.2, restYoy: 6.9, nicShare: 3.62 },
	{ year: '2023', nic: 13715, rest: 335806, nicYoy: 26.7, restYoy: 16.5, nicShare: 3.92 },
	{ year: '2024', nic: 13254, rest: 288776, nicYoy: -3.4, restYoy: -14.0, nicShare: 4.39 },
	{ year: '2025', nic: 19383, rest: 434576, nicYoy: 46.2, restYoy: 50.5, nicShare: 4.27 },
];

export const nicIndexedTrend = [100.0, 97.1, 107.0, 135.6, 131.1, 191.7];
export const restIndexedTrend = [100.0, 104.0, 111.2, 129.5, 111.4, 167.6];
export const nicNationalShare = [3.75, 3.51, 3.62, 3.92, 4.39, 4.27];

export const chineseVolumeNational = [3161, 2678, 2426, 2013, 3149, 12548];
export const chineseVolumeNic = [101, 73, 103, 58, 117, 267];
export const chineseShareNational = [1.17, 0.96, 0.81, 0.58, 1.04, 2.76];
export const chineseShareNic = [1.0, 0.74, 0.95, 0.42, 0.88, 1.38];

export const topNationalChinese2025: RankedDatum[] = [
	{ label: 'BAIC', value: 4579 },
	{ label: 'HAVAL', value: 2628 },
	{ label: 'CHERY', value: 944 },
	{ label: 'DFSK', value: 799 },
	{ label: 'FOTON', value: 792 },
	{ label: 'JAC', value: 786 },
];

export const topNicChinese2025: RankedDatum[] = [
	{ label: 'BAIC', value: 86 },
	{ label: 'FOTON', value: 37 },
	{ label: 'HAVAL', value: 34 },
	{ label: 'CHERY', value: 28 },
	{ label: 'DFSK', value: 28 },
	{ label: 'JAC', value: 23 },
];

export const provinceVolume2025: RankedDatum[] = [
	{ label: 'Buenos Aires', value: 132030 },
	{ label: 'CABA', value: 88267 },
	{ label: 'Cordoba', value: 49317 },
	{ label: 'Santa Fe', value: 42814 },
	{ label: 'Zona NIC', value: 19383, isNic: true },
	{ label: 'Mendoza', value: 15647 },
	{ label: 'Neuquen', value: 11852 },
	{ label: 'Entre Rios', value: 11747 },
	{ label: 'Tucuman', value: 10381 },
	{ label: 'Chubut', value: 9840 },
];

export const provinceGrowth2020to2025: RankedDatum[] = [
	{ label: 'Neuquen', value: 93.9 },
	{ label: 'Jujuy', value: 93.4 },
	{ label: 'Zona NIC', value: 91.7, isNic: true },
	{ label: 'Santiago del Estero', value: 90.0 },
	{ label: 'Rio Negro', value: 88.2 },
	{ label: 'Chaco', value: 88.1 },
	{ label: 'CABA', value: 83.4 },
	{ label: 'Chubut', value: 81.9 },
	{ label: 'Tierra del Fuego', value: 77.5 },
	{ label: 'Catamarca', value: 76.1 },
];

export const executiveHighlights = [
	{
		label: 'Volumen NIC 2025',
		value: '19.383',
		detail: 'patentamientos, con +91,7% vs 2020',
	},
	{
		label: 'Marcas chinas país',
		value: '2,76%',
		detail: 'de share en 2025, máximo de la serie',
	},
	{
		label: 'Posición potencial NIC',
		value: '5° / 3°',
		detail: 'en volumen 2025 y crecimiento 2020-2025',
	},
];

export const conclusionPoints = [
	'NIC casi duplicó su volumen desde 2020 y mantuvo una participación nacional en torno al 4%, con su mejor registro en 2024.',
	'El salto de las marcas chinas se concentró en 2025: triplicaron su share país respecto de 2023 y también aceleraron en NIC, aunque con menor penetración.',
	'Como bloque, NIC quedaría por encima de Mendoza en volumen 2025 y dentro del podio nacional de crecimiento acumulado del período.',
];

export const sourceNote =
	'Base: patentamientos mensuales 2020-2025 provistos. NIC = Neuquen + Rio Negro. No se detectaron faltantes mensuales en la serie.';
