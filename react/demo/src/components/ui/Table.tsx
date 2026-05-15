import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

export function TableRoot({
	children,
	className = '',
}: PropsWithChildren<{ className?: string }>) {
	return (
		<div className={['mt-3 overflow-x-auto', className].join(' ')}>
			<table className="w-full table-fixed border-collapse bg-ui-surface">{children}</table>
		</div>
	);
}

export function TableHead({ children }: PropsWithChildren) {
	return <thead>{children}</thead>;
}

export function TableBody({ children }: PropsWithChildren) {
	return <tbody>{children}</tbody>;
}

export function TableRow({
	children,
	className = '',
	...props
}: PropsWithChildren<ComponentPropsWithoutRef<'tr'>>) {
	return (
		<tr className={['border-t border-ui-border first:border-t-0', className].join(' ')} {...props}>
			{children}
		</tr>
	);
}

export function TableHeaderCell({
	children,
	className = '',
	...props
}: PropsWithChildren<ComponentPropsWithoutRef<'th'>>) {
	return (
		<th
			className={[
				'border-y border-ui-border px-4 py-3 text-left text-[0.66rem] font-bold uppercase tracking-label text-ui-text-soft',
				className,
			].join(' ')}
			{...props}
		>
			{children}
		</th>
	);
}

export function TableCell({
	children,
	className = '',
	...props
}: PropsWithChildren<ComponentPropsWithoutRef<'td'>>) {
	return (
		<td
			className={[
				'px-4 py-2.5 align-middle text-[0.75rem] leading-[1.25] text-ui-text',
				className,
			].join(' ')}
			{...props}
		>
			{children}
		</td>
	);
}
