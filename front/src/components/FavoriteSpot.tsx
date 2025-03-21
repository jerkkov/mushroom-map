import { ReactNode, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FavoriteSpot as FavoriteSpotType } from '../types/types';

export type FavoriteSpotProps = FavoriteSpotType & {
	saveSpots: any;
	favoriteSpots: FavoriteSpotType[];
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
	label,
	saveSpots,
	favoriteSpots,
	handleModalOpen,
}: FavoriteSpotProps) {
	const [position, setPosition] = useState<LatLngExpression>();
	const map = useMapEvents({
		click: (e) => {
			handleModalOpen();
			const { lat, lng } = e.latlng;
			setPosition([lat, lng]);

			L.marker([lat, lng], { icon }).addTo(map);
			saveSpots(favoriteSpots.concat({ label: label, position: [lat, lng] }));
		},
	});
	return (
		position && (
			<div style={{ width: 200, height: 200, backgroundColor: '#fffff' }}>
				<Marker position={position}>
					<Popup minWidth={90}>
						<span>{label}</span>
					</Popup>
				</Marker>
			</div>
		)
	);
}
