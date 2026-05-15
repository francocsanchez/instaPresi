import { goHome } from '../utils/routing';
import './home-button.css';

type HomeButtonProps = {
	variant?: 'light' | 'dark';
};

function HomeButton({ variant = 'light' }: HomeButtonProps) {
	return (
		<button
			type="button"
			className={`home-button home-button--${variant}`}
			onClick={goHome}
			aria-label="Volver al menu principal"
		>
			Home
		</button>
	);
}

export default HomeButton;
