import { ReactNode } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export type FavoriteSpotProps = {
	position: any;
	label: string;
	saveSpots: any;
	handleModalOpen: VoidFunction;
};

const icon = L.icon({
	iconSize: [25, 41],
	iconAnchor: [10, 41],
	popupAnchor: [2, -40],
	iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});

export function FavoriteSpot({
	position,
	label,
	saveSpots,
	handleModalOpen,
}: FavoriteSpotProps) {
	const map = useMapEvents({
		click: (e) => {
			handleModalOpen();
			const { lat, lng } = e.latlng;
			L.marker([lat, lng], { icon }).addTo(map);
			saveSpots([lat, lng]);
		},
	});
	return (
		<div style={{ width: 200, height: 200, backgroundColor: '#fffff' }}>
			<Marker position={position}>
				<Popup minWidth={90}>
					<span>{label}</span>
				</Popup>
			</Marker>
		</div>
	);
}
