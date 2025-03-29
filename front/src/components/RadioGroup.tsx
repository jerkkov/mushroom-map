import { ChangeEventHandler } from 'react';
import { ProbabilityLabel } from './FilterProvider';
type RadioGroupProps = {
	label: string;
	radioLabels: ProbabilityLabel[];
	visible?: boolean;
	selectedOption: ProbabilityLabel;
	onChange: ChangeEventHandler;
};

export function RadioGroup({
	label,
	radioLabels,
	visible = true,
	selectedOption,
	onChange,
}: RadioGroupProps) {
	const handleChange = (event: any) => {
		onChange(event.target.value);
	};
	return (
		visible && (
			<section className="radio-group">
				<h3>{label}</h3>
				<label>
					<input
						type="radio"
						name={label}
						value={radioLabels[0]}
						checked={selectedOption === radioLabels[0]}
						onChange={handleChange}
					/>
					<span>{radioLabels[0]}</span>
				</label>
				<label>
					<input
						type="radio"
						name={label}
						value={radioLabels[1]}
						checked={selectedOption === radioLabels[1]}
						onChange={handleChange}
					/>
					<span>{radioLabels[1]}</span>
				</label>
				<label>
					<input
						type="radio"
						name={label}
						value={radioLabels[2]}
						checked={selectedOption === radioLabels[2]}
						onChange={handleChange}
					/>
					<span>{radioLabels[2]}</span>
				</label>

				<p>Selected: {selectedOption}</p>
				{/* <div className="content">{}</div> */}
			</section>
		)
	);
}
