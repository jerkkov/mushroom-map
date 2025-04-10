import { Marker, Popup, Tooltip, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMushroomMap } from './MushroomMapProvider';
import { useModal } from './ModalProvider';

/* const icon = L.icon({
	iconSize: [25, 41],
	iconAnchor: [10, 41],
	popupAnchor: [2, -40],
	iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
}); */
export function FavoriteSpot({ label, position }: any) {
	const { handleModalOpen } = useModal();
	return (
		position && (
			<div>
				<Marker
					position={position}
					eventHandlers={{
						click: () => {
							handleModalOpen(position);
						},
						/* 			mouseover: () => {
							setIsAddFavoriteSpotsEnabled(true);
						}, */
					}}
				>
					<Tooltip content={label} direction="top" />
				</Marker>
			</div>
		)
	);
}
