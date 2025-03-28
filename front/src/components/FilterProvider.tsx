import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import 'leaflet/dist/leaflet.css';

export type Probability = 0.9 | 0.6 | 0.3 | 0;
export type ProbabilityLabel = "Todennäköinen" | "Mahdollinen" | "Harva";
export type ProbabilityOption = {
	probability: Probability;
	label: ProbabilityLabel;
}

export const probabilityOptions = [
	{ probability: 0.9, label: 'Todennäköinen' },
	{ probability: 0.6, label: 'Mahdollinen' },
	{ probability: 0.3, label: 'Harva' },
] as ProbabilityOption[];

export type FilterProps = {
	suppiloProbability: Probability;
	kanttarelliProbability: Probability;
	setSuppiloProbability: Dispatch<SetStateAction<Probability>>;
	setKanttarelliProbability: Dispatch<SetStateAction<Probability>>;
};

const FilterContext = createContext<FilterProps | undefined>(undefined);

export function FilterProvider({ children }: any) {
	const [suppiloProbability, setSuppiloProbability] = useState<Probability>(probabilityOptions[0].probability);
	const [kanttarelliProbability, setKanttarelliProbability] = useState<Probability>(probabilityOptions[0].probability);

	return (
		<FilterContext.Provider
			value={{
				suppiloProbability,
				kanttarelliProbability,
				setSuppiloProbability,
				setKanttarelliProbability,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
}

export const useFilter = () => {
	const context = useContext(FilterContext);
	if (!context)
		throw new Error('useFilter must be used withing a ModalProvider');
	return context;
};
