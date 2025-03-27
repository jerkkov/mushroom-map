import { useState } from 'react';
import { RadioGroup } from './RadioGroup';
import { probabilityOptions } from './MushroomMapContainer';
import { useMushroomMap } from './MushroomMapProvider';

const radioLabels = probabilityOptions.map((option) => option.label);

type FilterProps = {
	label: string;
	onSuppiloSelectionChange: any;
	onKanttarelliSelectionChange: any;
};

export function FilterContainer({
	label,
	onSuppiloSelectionChange,
	onKanttarelliSelectionChange,
}: FilterProps) {
	const [selectedSuppiloOption, setSelectedSuppiloOption] = useState(
		radioLabels[0]
	);
	const [selectedKanttarelliOption, setSelectedKanttarelliOption] = useState(
		radioLabels[0]
	);

	use
	const { setSuppiloProbability, setKanttarelliProbability } = useMushroomMap();
			const handleSuppiloSelectionChange = (selectedOption: any) => {
		setSuppiloProbability(
			probabilityOptions.find((lbl) => lbl.label === selectedOption)
				?.probability || 0
		);
	};

	const handleKanttarelliSelectionChange = (selectedOption: any) => {
		setKanttarelliProbability(
			probabilityOptions.find((lbl) => lbl.label === selectedOption)
				?.probability || 0
		);
	};


	const handleSuppiloChange = (value: any) => {
		setSelectedSuppiloOption(value);
		onSuppiloSelectionChange(value);
	};
	const handleKanttarelliChange = (value: any) => {
		setSelectedKanttarelliOption(value);
		onKanttarelliSelectionChange(value);
	};
	return (
{<FIlter handleSuppiloChange={} handleKanttarelliChange= />}
	);
}
