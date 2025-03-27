import { useState } from 'react';
import { RadioGroup } from './RadioGroup';
import { probabilityOptions } from './MushroomMapContainer';

const radioLabels = probabilityOptions.map((option) => option.label);

type FilterProps = {
	label: string;
	selectedSuppiloOption: any;
	selectedKanttarelliOption: any;
	onSuppiloSelectionChange: any;
	onKanttarelliSelectionChange: any;
};

export function Filter({
	label,
	selectedSuppiloOption,
	selectedKanttarelliOption,
	onSuppiloSelectionChange,
	onKanttarelliSelectionChange,
}: FilterProps) {
	};
	return (
		<section className="filter">
			<h2>{label}</h2>
			<div className="content">
				<RadioGroup
					label={'Suppilovahvero'}
					radioLabels={radioLabels}
					selectedOption={selectedSuppiloOption}
					onChange={handleSuppiloChange}
				/>

				<RadioGroup
					label={'Kanttarelli'}
					radioLabels={radioLabels}
					selectedOption={selectedKanttarelliOption}
					onChange={handleKanttarelliChange}
				/>
			</div>
		</section>
	);
}
