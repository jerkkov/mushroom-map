import { createContext, useContext, useState } from 'react';
import '../App.scss';
import { FavoriteSpot } from '../types/types';

export const MAPSTATE = {
	loading: 'LOADING',
	ready: 'READY',
	error: 'ERROR',
};

export type MapState = (typeof MAPSTATE)[keyof typeof MAPSTATE];

const MushroomMapContext = createContext<any | undefined>(undefined);

export default function MushroomMapProvider({ children }: any) {
	const [mapState, setMapState] = useState<MapState | undefined>(undefined);
	const [isAddFavoriteSpotsEnabled, setIsAddFavoriteSpotsEnabled] =
		useState<boolean>(true);
	const [favoriteSpots, setFavoriteSpots] = useState<FavoriteSpot[]>([]);

	const addFavoriteSpot = (newSpot: FavoriteSpot | undefined) => {
		if (!newSpot) {
			console.log('Null or undefined');
			return;
		}
		setFavoriteSpots(favoriteSpots.concat(newSpot));
	};

	console.log('mapState:', mapState);
	console.log('isAddFavoriteSpotsEnabled:', isAddFavoriteSpotsEnabled);

	return (
		<MushroomMapContext.Provider
			value={{
				mapState,
				favoriteSpots,
				setMapState,
				addFavoriteSpot,
				isAddFavoriteSpotsEnabled,
				setIsAddFavoriteSpotsEnabled,
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
