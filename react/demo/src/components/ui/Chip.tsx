import type { PropsWithChildren } from 'react';

type ChipProps = PropsWithChildren<{
	className?: string;
}>;

function Chip({ children, className = '' }: ChipProps) {
	return (
		<span
			className={[
				'inline-flex items-center rounded-full border border-ui-border bg-ui-muted px-1.5 py-0.5 text-[0.66rem] font-medium text-ui-text-muted',
				className,
			].join(' ')}
		>
			{children}
		</span>
	);
}

export default Chip;
