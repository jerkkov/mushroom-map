import { useEffect, useState } from 'react';
import './App.css';
import {
	MapContainer,
	Polygon,
	Polyline,
	Popup,
	Rectangle,
	SVGOverlay,
	TileLayer,
	useMap,
} from 'react-leaflet';

import { Stand, Feature, bbox } from './types/types';
import { LatLngExpression } from 'leaflet';

interface MapProps {
	features?: Feature[];
	loading?: boolean;
	boxBounds: any | undefined;
}

const Map = ({ boxBounds }: MapProps) => {
	return (
		<MapContainer center={[61.4978, 23.761]} zoom={13} scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{boxBounds.map((box: any, i: number) => {
				return (
					<Rectangle
						key={i}
						bounds={box}
						pathOptions={{ fillColor: 'blue', weight: 1 }}
					/>
				);
			})}
		</MapContainer>
	);
};

export default Map;
