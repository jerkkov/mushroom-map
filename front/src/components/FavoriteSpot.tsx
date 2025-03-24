import { Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/* const icon = L.icon({
	iconSize: [25, 41],
	iconAnchor: [10, 41],
	popupAnchor: [2, -40],
	iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
}); */
export function FavoriteSpot({ label, position }: any) {
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
