export function Switch({
	label,
	isChecked = false,
	index,
	checkHandler,
}: {
	label?: string;
	isChecked?: boolean;
	index: number;
	checkHandler: any;
}) {
	return (
		<section className="switch-container">
			{label && <span className="position">{label}</span>}
			<br />
			<label className="switch">
				<input
					type="checkbox"
					id={`checkbox-${index}`}
					checked={isChecked}
					onChange={checkHandler}
				/>
				<span className="slider round"></span>
			</label>
		</section>
	);
}
