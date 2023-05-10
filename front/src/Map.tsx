import { useEffect, useState } from 'react';
import './App.css';
import {
	MapContainer,
	Polygon,
	Polyline,
	Popup,
	Rectangle,
	TileLayer,
	useMap,
} from 'react-leaflet';

import { Stand, Feature, bbox } from './types/types';
import { LatLngExpression } from 'leaflet';

interface MapProps {
	features?: Feature[];
	loading: boolean;
	points: any | undefined;
}

const Map = ({ points, loading }: MapProps) => {
	// console.log('points', points);
	// console.log('points00', points[0]);

	const Layer = ({ point }: { point: LatLngExpression[][] }) => {
		if (!points || points.length < 1) return <>not working</>;
		// console.log('point', point);
		return (
			<>
				<Polygon
					pathOptions={{ fillColor: 'blue' }}
					positions={point}
				></Polygon>
			</>
		);
	};

	return (
		<>
			<MapContainer
				style={{ width: '90%', height: '99%' }}
				center={[61.4978, 23.761]}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{points.map((point: any, i: number) => {
					const coords = point;
					return (
						<Rectangle
							key={i}
							bounds={coords}
							pathOptions={{ color: 'red', fillColor: 'red' }}
						/>
					);
				})}
				;
			</MapContainer>
		</>
	);
};

export default Map;
