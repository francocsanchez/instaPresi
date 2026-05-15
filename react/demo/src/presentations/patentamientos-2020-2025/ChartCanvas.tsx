import { useEffect, useRef } from 'react';
import { Chart, type ChartConfiguration } from 'chart.js/auto';

type ChartCanvasProps<TType extends ChartConfiguration['type']> = {
	config: ChartConfiguration<TType>;
	className?: string;
	label: string;
};

function ChartCanvas<TType extends ChartConfiguration['type']>({
	config,
	className,
	label,
}: ChartCanvasProps<TType>) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const chartRef = useRef<Chart | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) {
			return undefined;
		}

		chartRef.current?.destroy();
		chartRef.current = new Chart(canvas, config);

		return () => {
			chartRef.current?.destroy();
			chartRef.current = null;
		};
	}, [config]);

	return (
		<div className={className}>
			<canvas ref={canvasRef} aria-label={label} role="img" />
		</div>
	);
}

export default ChartCanvas;
