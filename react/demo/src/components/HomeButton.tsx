import { goHome } from '../utils/routing';

type HomeButtonProps = {
	variant?: 'light' | 'dark';
};

function HomeButton({ variant = 'light' }: HomeButtonProps) {
	const isDark = variant === 'dark';

	return (
		<button
			type="button"
			className={[
				'pointer-events-auto cursor-pointer rounded-full border px-3.5 py-2 text-[0.85rem] leading-none backdrop-blur-sm transition-colors',
				'focus-visible:outline-2 focus-visible:outline-offset-2',
				isDark
					? 'border-white/22 bg-black/70 text-white hover:border-white/34 hover:bg-black/84 focus-visible:outline-white'
					: 'border-black/14 bg-white/88 text-[#111111] hover:border-black/24 hover:bg-white focus-visible:outline-[#111111]',
			].join(' ')}
			onClick={goHome}
			aria-label="Volver al menu principal"
		>
			Home
		</button>
	);
}

export default HomeButton;
