import { RadioGroup } from './RadioGroup';
import { ProbabilityLabel, ProbabilityOption, probabilityOptions } from './FilterProvider';

const radioLabels = probabilityOptions.map((option: ProbabilityOption) => option.label);

type FilterProps = {
	selectedSuppiloOption: ProbabilityLabel;
	selectedKanttarelliOption: ProbabilityLabel;
	onSuppiloSelectionChange: any;
	onKanttarelliSelectionChange: any;
};

export function Filter({
	selectedSuppiloOption,
	selectedKanttarelliOption,
	onSuppiloSelectionChange,
	onKanttarelliSelectionChange,
}: FilterProps) {
	;
	return (
		<section className="filter">
			<h2>Todennäköisyydet</h2>
			<div className="content">
				<RadioGroup
					label={'Suppilovahvero'}
					radioLabels={radioLabels}
					selectedOption={selectedSuppiloOption}
					onChange={onSuppiloSelectionChange}
				/>

				<RadioGroup
					label={'Kanttarelli'}
					radioLabels={radioLabels}
					selectedOption={selectedKanttarelliOption}
					onChange={onKanttarelliSelectionChange}
				/>
			</div>
		</section>
	);
}
