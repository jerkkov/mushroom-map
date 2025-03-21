import { useState } from 'react';
import { RadioGroup } from './RadioGroup';

type FilterProps = {
	label: string;
	radioLabels: string[];
	onSuppiloSelectionChange: any;
	onKanttarelliSelectionChange: any;
	showSuppiloFilters: boolean;
	showKanttarelliFilters: boolean;
};

export function Filter({
	label,
	showSuppiloFilters,
	showKanttarelliFilters,
	radioLabels,
	onSuppiloSelectionChange,
	onKanttarelliSelectionChange,
}: FilterProps) {
	const [selectedSuppiloOption, setSelectedSuppiloOption] = useState(
		radioLabels[0]
	);
	const [selectedKanttarelliOption, setSelectedKanttarelliOption] = useState(
		radioLabels[0]
	);

	const handleSuppiloChange = (value: any) => {
		setSelectedSuppiloOption(value);
		onSuppiloSelectionChange(value);
	};
	const handleKanttarelliChange = (value: any) => {
		setSelectedKanttarelliOption(value);
		onKanttarelliSelectionChange(value);
	};
	return (
		showKanttarelliFilters &&
		showKanttarelliFilters && (
			<section className="filter">
				<h2>{label}</h2>
				<div className="content">
					{showSuppiloFilters && (
						<RadioGroup
							label={'Suppilovahvero'}
							radioLabels={radioLabels}
							selectedOption={selectedSuppiloOption}
							onChange={handleSuppiloChange}
						/>
					)}
					{showKanttarelliFilters && (
						<RadioGroup
							label={'Kanttarelli'}
							radioLabels={radioLabels}
							selectedOption={selectedKanttarelliOption}
							onChange={handleKanttarelliChange}
						/>
					)}
				</div>
			</section>
		)
	);
}
