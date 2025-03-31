import { useState } from 'react';
import {
	ProbabilityLabel,
	ProbabilityOption,
	probabilityOptions,
} from './FilterProvider';
import { useMushroomMap } from './MushroomMapProvider';
import { useFilter } from './FilterProvider';
import { Filter } from './Filter';
import { Switch } from '@mui/material';

const radioLabels = probabilityOptions.map(
	(option: ProbabilityOption) => option.label
);

export function FilterContainer({}) {
	const { isAddFavoriteSpotsEnabled, setIsAddFavoriteSpotsEnabled } =
		useMushroomMap();
	const [selectedSuppiloOption, setSelectedSuppiloOption] = useState(
		radioLabels[0]
	);
	const [selectedKanttarelliOption, setSelectedKanttarelliOption] = useState(
		radioLabels[0]
	);

	const { setSuppiloProbability, setKanttarelliProbability } = useFilter();

	const handleSuppiloSelectionChange = (selectedOption: ProbabilityLabel) => {
		setSuppiloProbability(
			probabilityOptions.find(
				(option: ProbabilityOption) => option.label === selectedOption
			)?.probability || 0
		);
	};

	const handleKanttarelliSelectionChange = (
		selectedOption: ProbabilityLabel
	) => {
		setKanttarelliProbability(
			probabilityOptions.find(
				(option: ProbabilityOption) => option.label === selectedOption
			)?.probability || 0
		);
	};

	const handleSuppiloChange = (value: any) => {
		setSelectedSuppiloOption(value);
		handleSuppiloSelectionChange(value);
	};
	const handleKanttarelliChange = (value: any) => {
		setSelectedKanttarelliOption(value);
		handleKanttarelliSelectionChange(value);
	};
	return (
		<>
			<Switch
				defaultChecked={true}
				onChange={() =>
					setIsAddFavoriteSpotsEnabled(!isAddFavoriteSpotsEnabled)
				}
			/>
			<Filter
				onSuppiloSelectionChange={handleSuppiloChange}
				onKanttarelliSelectionChange={handleKanttarelliChange}
				selectedSuppiloOption={selectedSuppiloOption}
				selectedKanttarelliOption={selectedKanttarelliOption}
			/>
		</>
	);
}
