import { useState } from 'react';
import { RadioGroup } from './RadioGroup';

type FilterProps = {
	label: string;
	suppiloProbability: number;
	kanttarelliProbability: number;
};

export function Filter({}: FilterProps) {
	const [selectedSuppiloOption, setSelectedSuppiloOption] = useState('');
	const [selectedKanttarelliOption, setSelectedKanttarelliOption] =
		useState('');

	const handleSuppiloChange = (value: any) => {
		setSelectedSuppiloOption(value);
	};
	const handleKanttarelliChange = (value: any) => {
		setSelectedKanttarelliOption(value);
	};
	return (
		<section className="filter">
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
