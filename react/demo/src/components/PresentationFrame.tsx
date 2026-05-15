import type { PropsWithChildren } from 'react';
import HomeButton from './HomeButton';
import './home-button.css';

type PresentationFrameProps = PropsWithChildren<{
	homeButtonVariant?: 'light' | 'dark';
}>;

function PresentationFrame({
	children,
	homeButtonVariant = 'light',
}: PresentationFrameProps) {
	return (
		<div className="presentation-frame">
			<div className="presentation-frame__home">
				<HomeButton variant={homeButtonVariant} />
			</div>
			{children}
		</div>
	);
}

export default PresentationFrame;
