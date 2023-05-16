import { useCallback, useEffect, useRef, useState } from 'react';
import './App.scss';
import 'leaflet/dist/leaflet.css';
import type { FeatureCollection, Feature } from 'geojson';
import {
	TileLayer,
	GeoJSON,
	MapContainer,
	useMap,
	FeatureGroup,
	FeatureGroupProps,
	LayerGroup,
} from 'react-leaflet';
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

	const onEachFeature = (
		feature: Feature,
		featureLayer: FeatureGroupProps
	) => {};

	// const mushroom = L.geoJSON(mapData, { filter: mushroomFilter }).addTo(map);
	function suppiloFilter(feature: Feature) {
		const properties = { ...feature.properties };
		return (
			properties.MAINTREESPECIES === 2 &&
			properties.FERTILITYCLASS <= 3 &&
			properties.DEVELOPMENTCLASS === '04'
		);
	}

	function kanttarelliFilter(feature: Feature) {
		const properties = { ...feature.properties };
		return (
			(properties.MAINTREESPECIES === 4 ||
				properties.MAINTREESPECIES === 3 ||
				properties.MAINTREESPECIES === 27) &&
			(properties.FERTILITYCLASS === 3 || properties.FERTILITYCLASS === 2) &&
			properties.DEVELOPMENTCLASS === '04'
		);
	}

	if (!mapData || loading) {
		return <div>loading...</div>;
	}

	function Sider() {
		return (
			<section className="sider">
				<Switch />
				<Switch />
			</section>
		);
	}

	function Switch() {
		return (
			<label className="switch">
				<input type="checkbox" />
				<span className="slider round"></span>
			</label>
		);
	}

	return (
		<>
			<header>
				<h1>Tampere Area Mushroom Map</h1>
			</header>
			<div className="wrapper">
				<main className="content-container">
					<Sider />
					<MapContainer
						center={[61.4978, 23.761]}
						zoom={13}
						scrollWheelZoom={false}
						whenReady={() => setMapIsReady(true)}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						{mapData && (
							<LayerGroup>
								<GeoJSON
									data={mapData}
									// key={mapData[0].properties.fid}
									filter={suppiloFilter}
								/>
								<GeoJSON
									data={mapData}
									// key={mapData[0].properties.fid}
									filter={kanttarelliFilter}
									style={{ color: 'red' }}
								/>
							</LayerGroup>
						)}
					</MapContainer>
					<section></section>
				</main>
			</div>
		</>
	);
};

export default App;
