import { ChangeEventHandler, useState } from 'react';
type RadioGroupProps = {
	label: string;
	probability?: number;
	radioLabels?: string[];
	visible?: boolean;
	selectedOption: string;
	onChange: ChangeEventHandler;
};

export function RadioGroup({
	label,
	radioLabels = ['', '', ''],
	visible = true,
	selectedOption,
	onChange,
}: RadioGroupProps) {
	const handleChange = (event: any) => {
		onChange(event.target.value);
	};
	console.log(radioLabels[0]);
	return (
		visible && (
			<section className="RadioGroup">
				<h3>{label}</h3>
				<label className="">
					<input
						type="radio"
						name={label}
						value={radioLabels[0]}
						checked={selectedOption === radioLabels[0]}
						onChange={handleChange}
						// className="accent-blue-600"
					/>
					<span>{radioLabels[0]}</span>
				</label>
				<label className="">
					<input
						type="radio"
						name={label}
						value={radioLabels[1]}
						checked={selectedOption === radioLabels[1]}
						onChange={handleChange}
						// className="accent-blue-600"
					/>
					<span>{radioLabels[1]}</span>
				</label>
				<label className="">
					<input
						type="radio"
						name={label}
						value={radioLabels[2]}
						checked={selectedOption === radioLabels[2]}
						onChange={handleChange}
						// className="accent-blue-600"
					/>
					<span>{radioLabels[2]}</span>
				</label>

				<p>Selected: {selectedOption}</p>
				{/* <div className="content">{}</div> */}
			</section>
		)
	);
}
