import { useEffect, useState } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import Map from './Map';
import { getLayer } from './services/geoLayer';
import { Feature, polygonCoordinates } from './types/types';

const App = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | undefined>(undefined);

	const [polygonCoords, setPolygonCoords] = useState<any | undefined>(
		undefined
	);

	// const getCoordinates = () => {
	//   if (!layers || layers.length < 1) return;

	//   const coordinates =
	//     layers.filter((layer) =>
	//       layer.properties.MAINTREESPECIES === 2)
	//       .map((coordinate) => coordinate.bbox)

	//   return coordinates
	// }

	useEffect(() => {
		try {
			setLoading(true);
			getLayer().then((data) => {
				console.log('data layers successfully fetched');

				const coordinates = data.features
					.filter((layer) => layer.properties.MAINTREESPECIES === 2)
					.map((coordinate) => coordinate.bbox)
					.map((point) => {
						const mid = Math.floor(point.length / 2);
						return [
							[0, mid],
							[mid, point.length],
						].map((idxs) => point.slice(...idxs));
					});
				setPolygonCoords(coordinates);
				console.log('polygonCoords', coordinates);
				setLoading(false);
			});
		} catch (error: any) {
			console.error(`Could not fetch: ${error}`);
			setLoading(false);
			setError(error.message);
		}
	}, []);

	// const formatCoordsForPolygon = (coordinates: Feature) => {
	//   if (!coordinates || coordinates.length < 1) return;

	//   const mid = Math.floor(coordinates[0].length / 2);
	//   const polygonCoords = coordinates.map((point) => [[0, mid], [mid, point.length]].map(idxs => point.slice(...idxs)));
	//   console.log('polygonCoords', polygonCoords);
	//   return polygonCoords;
	// }

	if (error) {
		return <div>ERROR: {error.message}</div>;
	}

	if (loading) {
		return <div>loading...</div>;
	}

	if (polygonCoords && polygonCoords.length > 0) {
		return (
			<>
				<h1>Mushroom Map Test</h1>
				<Map points={polygonCoords} loading={loading} />
			</>
		);
	}
};

export default App;
