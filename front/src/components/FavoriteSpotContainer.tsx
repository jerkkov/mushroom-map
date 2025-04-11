import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useModal } from './ModalProvider';
import { FavoriteSpot } from './FavoriteSpot';
import { useMushroomMap } from './MushroomMapProvider';
import { FavoriteSpot as FavoriteSpotType } from '../types/types';
import suppilovahveroIcon from '../assets/Suppilovahvero-filled.svg';
import kanttarelliIcon from '../assets/Kanttarelli-filled.svg';

const iconSuppilovahvero = L.icon({
	iconSize: [35, 51],
	iconAnchor: [10, 41],
	popupAnchor: [2, -40],
	iconUrl: suppilovahveroIcon,
});

const iconKanttarelli = L.icon({
	iconSize: [35, 51],
	iconAnchor: [10, 41],
	popupAnchor: [2, -40],
	iconUrl: kanttarelliIcon,
});

const iconMuu = L.icon({
	iconSize: [35, 51],
	iconAnchor: [10, 41],
	popupAnchor: [2, -40],
	iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
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
	const chooseIcon = (type: string) => {
		switch (type) {
			case 'Suppilovahvero':
				return iconSuppilovahvero;
			case 'Kanttarelli':
				return iconKanttarelli;
			default:
				return iconMuu;
		}
	};

	// console.log('positions', positions);
	console.log('favoriteSpots', favoriteSpots);
	return favoriteSpots.map((pos: FavoriteSpotType) => (
		<FavoriteSpot
			key={pos.id}
			position={pos.position}
			label={pos.label}
			icon={chooseIcon(pos.mushroomType ?? 'Muu')}
		/>
	));
}
