import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<
	ButtonHTMLAttributes<HTMLButtonElement> & {
		variant?: 'ghost' | 'solid';
		className?: string;
	}
>;

const variantClasses = {
	ghost:
		'border border-ui-border bg-ui-surface text-ui-text hover:border-ui-border-strong hover:bg-slate-50',
	solid:
		'border border-blue-700 bg-blue-700 text-white hover:border-blue-800 hover:bg-blue-800',
};

function Button({
	children,
	variant = 'ghost',
	className = '',
	type = 'button',
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={[
				'inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-ui border px-2.5 py-1.5 text-[0.7rem] font-semibold transition-colors',
				'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
				variantClasses[variant],
				className,
			].join(' ')}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
