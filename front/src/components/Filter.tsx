import { useState } from 'react';
import { RadioGroup } from './RadioGroup';

type FilterProps = {
	label: string;
	suppiloProbability: any;
	kanttarelliProbability: any;
	onSuppiloSelectionChange: any;
	onKanttarelliSelectionChange: any;
};

export function Filter({
	label,
	suppiloProbability,
	kanttarelliProbability,
	onSuppiloSelectionChange,
	onKanttarelliSelectionChange,
}: FilterProps) {
	const [selectedSuppiloOption, setSelectedSuppiloOption] = useState('');
	const [selectedKanttarelliOption, setSelectedKanttarelliOption] =
		useState('');

	const handleSuppiloChange = (value: any) => {
		setSelectedSuppiloOption(value);
		onSuppiloSelectionChange(value);
	};
	const handleKanttarelliChange = (value: any) => {
		setSelectedKanttarelliOption(value);
		onKanttarelliSelectionChange(value);
	};

	return (
		<section className="filter">
			<h2>{label}</h2>
			<div className="content">
				{
					<RadioGroup
						label={'Kanttarelli'}
						selectedOption={selectedKanttarelliOption}
						onChange={handleKanttarelliChange}
					/>
				}
				{
					<RadioGroup
						label={'Suppilovahvero'}
						selectedOption={selectedSuppiloOption}
						onChange={handleSuppiloChange}
					/>
				}
			</div>
		</section>
	);
}
