import { ReactNode } from 'react';

type SiderProps = {
	children: ReactNode;
};

export function Sider({ children }: SiderProps) {
	return (
		<section className="sider">
			<div className="content">{children}</div>
		</section>
	);
}
