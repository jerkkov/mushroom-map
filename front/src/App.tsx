import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import type { FeatureCollection } from 'geojson';
import { TileLayer, GeoJSON, MapContainer, useMap } from 'react-leaflet';
import Tampere from './assets/tampere-polygon-wgs84.json';
import L from 'leaflet';
// import Tampere from './services/tampere-metsavarakuviot.json';

const App = () => {
	const mapRef = useRef();
	const mapDataRef = useRef();
	// const map = useMap();

	const [loading, setLoading] = useState<boolean>(false);
	const [mapIsReady, setMapIsReady] = useState<boolean>(false);
	const [error, setError] = useState<Error | undefined>(undefined);
	const [mapData, setMapData] = useState<FeatureCollection | null>(null);

	// useEffect(() => {
	// 	const { current = {} } = mapRef;
	// 	console.log(mapRef);
	// 	mapRef.current;

	// 	// const tampereGeoJson = new L.GeoJSON(Tampere);
	// 	// tampereGeoJson.addTo(mapRef);
	// }, [mapRef]);

	useEffect(() => {
		try {
			setLoading(true);
			setMapData(Tampere as FeatureCollection);
			setLoading(false);
		} catch (error: any) {
			console.error(`Could not fetch: ${error}`);
			setLoading(false);
			setError(error.message);
		}
	}, []);

	if (!mapData || loading) {
		return <div>loading...</div>;
	}

	return (
		<>
			<h1>Mushroom Map Test</h1>
			<MapContainer
				center={[61.4978, 23.761]}
				zoom={13}
				scrollWheelZoom={false}
				ref={mapRef}
				whenReady={() => setMapIsReady(true)}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<GeoJSON data={mapData} ref={mapDataRef} key={mapData.fid} filter={} />
			</MapContainer>
		</>
	);
};

export default App;
