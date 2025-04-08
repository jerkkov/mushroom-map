import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useModal } from './ModalProvider';
import { FavoriteSpot } from './FavoriteSpot';
import { useMushroomMap } from './MushroomMapProvider';
import { FavoriteSpot as FavoriteSpotType } from '../types/types';

// export type ModalProps = {
// 	modalOpen: boolean;
// 	// editing: boolean;
// 	handleClose: VoidFunction;
// 	handleSubmit: any;
// 	title: string;
// 	description: string;
// };

const icon = L.icon({
	iconSize: [25, 41],
	iconAnchor: [10, 41],
	popupAnchor: [2, -40],
	iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});

// function form () {
// 	<label>
// 	<input
// 		type="text"
// 		name="title"
// 		value={radioLabels[0]}
// 		checked={selectedOption === radioLabels[0]}
// 		onChange={handleChange}
// 	/>
// 	<span>{radioLabels[0]}</span>
// </label>
// }

export function FavoriteSpotContainer() {
	const {
		open,
		modalData,
		editing,
		handleModalOpen,
		handleModalClose,
		toggleEditing,
		handleSubmit,
	} = useModal();

	const { isAddFavoriteSpotsEnabled, favoriteSpots, addFavoriteSpot } =
		useMushroomMap();

	const [positions, setPositions] = useState<LatLngExpression[]>([]);

	const map = useMapEvents({
		click: (e) => {
			if (isAddFavoriteSpotsEnabled) {
				// handleModalOpen();
				const position = e.latlng;
				positions.push(position);
				setPositions((prevValue) => [...prevValue, position]);

				const newFavoriteSpot = {
					id: position.toString(),
					position: position,
					label: `Marker:${positions.length}`,
				} as FavoriteSpotType;

				addFavoriteSpot(newFavoriteSpot);
			}
		},
	});
	console.log('positions', positions);
	console.log('favoriteSpots', favoriteSpots);
	return favoriteSpots.map((pos: FavoriteSpotType) => (
		<FavoriteSpot key={pos.id} position={pos.position} label={pos.label} />
	));
}
