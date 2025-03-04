import { ChangeEventHandler, useState } from 'react';
type RadioGroupProps = {
	label: string;
	probability?: number;
	values?: string[];
	visible?: boolean;
	selectedOption: string;
	onChange: ChangeEventHandler;
};

export function RadioGroup({
	label,
	probability = 0.5,
	values = ['Harva', 'Mahdollinen', 'Todennäköinen'],
	visible = true,
	selectedOption,
	onChange,
}: RadioGroupProps) {
	const handleChange = (event: any) => {
		onChange(event.target.value);
	};

	return (
		<section className="RadioGroup">
			<h3>{label}</h3>
			<label className="">
				<input
					type="radio"
					name="options"
					value={values[0]}
					checked={selectedOption === values[0]}
					onChange={handleChange}
					// className="accent-blue-600"
				/>
				<span>{values[0]}</span>
			</label>

			<label className="">
				<input
					type="radio"
					name="options"
					value={values[1]}
					checked={selectedOption === values[1]}
					onChange={handleChange}
					// className="accent-blue-600"
				/>
				<span>{values[1]}</span>
			</label>

			<label className="">
				<input
					type="radio"
					name="options"
					value={values[2]}
					checked={selectedOption === values[2]}
					onChange={handleChange}
					// className="accent-blue-600"
				/>
				<span>{values[2]}</span>
			</label>

			<p>Selected: {selectedOption}</p>
			{/* <div className="content">{}</div> */}
		</section>
	);
}
