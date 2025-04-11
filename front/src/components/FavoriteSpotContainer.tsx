import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useModal } from './ModalProvider';
import { FavoriteSpot } from './FavoriteSpot';
import { useMushroomMap } from './MushroomMapProvider';
import { FavoriteSpot as FavoriteSpotType } from '../types/types';

const icon = L.icon({
	iconSize: [25, 41],
	iconAnchor: [10, 41],
	popupAnchor: [2, -40],
	iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});

export function FavoriteSpotContainer() {
	const {
		open,
		editing,
		favoriteSpots,
		handleModalOpen,
		handleModalClose,
		toggleEditing,
	} = useModal();

	const { isAddFavoriteSpotsEnabled } = useMushroomMap();

	const [positions, setPositions] = useState<LatLngExpression[]>([]);

	const map = useMapEvents({
		click: (e) => {
			if (isAddFavoriteSpotsEnabled) {
				const position = e.latlng;
				handleModalOpen(position);

				positions.push(position);
				setPositions((prevValue) => [...prevValue, position]);
			}
		},
	});
	// console.log('positions', positions);
	console.log('favoriteSpots', favoriteSpots);
	return favoriteSpots.map((pos: FavoriteSpotType) => (
		<FavoriteSpot key={pos.id} position={pos.position} label={pos.label} />
	));
}
