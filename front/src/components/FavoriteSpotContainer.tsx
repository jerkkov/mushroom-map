import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useModal } from './ModalProvider';
import { FavoriteSpot } from './FavoriteSpot';

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

	const [position, setPosition] = useState<LatLngExpression | undefined>();
	const map = useMapEvents({
		click: (e) => {
			handleModalOpen();
			const { lat, lng } = e.latlng;
			setPosition([lat, lng]);

			L.marker([lat, lng], { icon }).addTo(map);
		},
	});
	if (!position) return;
	return <FavoriteSpot position={position} label="TEST" />;
}
