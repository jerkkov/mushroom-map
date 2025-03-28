import { createContext, useContext, useState } from 'react';
import '../App.scss';

export const MAPSTATE = {
	loading: 'LOADING',
	ready: 'READY',
	error: 'ERROR',
};

export type MapState = (typeof MAPSTATE)[keyof typeof MAPSTATE];

const MushroomMapContext = createContext<any | undefined>(undefined);

export default function MushroomMapProvider({ children }: any) {
	const [mapState, setMapState] = useState<MapState | undefined>(undefined);

	return (
		<MushroomMapContext.Provider
			value={{
				mapState,
				setMapState,
			}}
		>
			{children}
		</MushroomMapContext.Provider>
	);
}

export const useMushroomMap = () => {
	const context = useContext(MushroomMapContext);
	if (!context)
		throw new Error(
			'useMushroomMap must be used withing a MushroomMapProvider'
		);
	return context;
};
