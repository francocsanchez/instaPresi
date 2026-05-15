import type { PropsWithChildren } from 'react';
import HomeButton from './HomeButton';

type PresentationFrameProps = PropsWithChildren<{
	homeButtonVariant?: 'light' | 'dark';
}>;

function PresentationFrame({
	children,
	homeButtonVariant = 'light',
}: PresentationFrameProps) {
	return (
		<div className="relative h-screen w-full overflow-hidden bg-white [&_.reveal]:h-full [&_.reveal]:w-full">
			<div className="pointer-events-none fixed top-4 right-4 z-30 sm:top-3 sm:right-3">
				<HomeButton variant={homeButtonVariant} />
			</div>
			{children}
		</div>
	);
}

export default PresentationFrame;
