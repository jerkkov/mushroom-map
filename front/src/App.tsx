import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import './App.scss';
import 'leaflet/dist/leaflet.css';
import type { FeatureCollection, Feature } from 'geojson';
import {
	TileLayer,
	GeoJSON,
	MapContainer,
	FeatureGroupProps,
	LayerGroup,
	LayersControl,
	Popup,
} from 'react-leaflet';
import Tampere from './assets/tampere-polygon-wgs84.json';
import L from 'leaflet';
import { Switch } from './components/Switch';
import { Sider } from './components/Sider';
// import Tampere from './services/tampere-metsavarakuviot.json';

const App = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [mapIsReady, setMapIsReady] = useState<boolean>(false);
	const [error, setError] = useState<Error | undefined>(undefined);
	const [mapData, setMapData] = useState<FeatureCollection | null>(null);
	const [layers, setLayers] =
		useState<{ id: number; name: string; checked: boolean }[]>();

	const initialLayers = [
		{ id: 0, name: 'Suppilovahvero', checked: true },
		{ id: 1, name: 'Keltavahvero', checked: true },
	];

	useEffect(() => {
		try {
			setLoading(true);
			setMapData(Tampere as FeatureCollection);
			setLayers(initialLayers);
			setLoading(false);
		} catch (error: any) {
			console.error(`Could not fetch: ${error}`);
			setLoading(false);
			setError(error.message);
		}
	}, []);

	function CustomPopup({ feature }: { feature: Feature }) {
		if (!feature || !feature.properties) return;

		const propertyArray = Object.entries(feature.properties).filter(
			(property) => property[1]
		);
		console.log(propertyArray);
		return (
			<section>
				{propertyArray.map((property, i) => (
					<p key={property[0]}>{`${property[0]}:${property[1]}`}</p>
				))}
			</section>
		);
	}

	const onEachFeature = (feature: Feature, layer: any) => {
		const popupOptions = {
			minWidth: 250,
			maxWidth: 500,
			className: 'popup-classname',
		};
		const popupContentNode = <CustomPopup feature={feature} />;
		const popupContentHtml = ReactDOMServer.renderToString(popupContentNode);
		layer.bindPopup(popupContentHtml, popupOptions);
	};

	// const updateCheckStatus = (index: number) => {
	// 	if (!layers) return;
	// 	setLayers(
	// 		layers.map((layer, currentIndex) =>
	// 			currentIndex === index ? { ...layer, checked: !layer.checked } : layer
	// 		)
	// 	);
	// };

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

	return (
		<>
			<header>
				<h1>Tampere Area Mushroom Map</h1>
			</header>
			<div className="wrapper">
				<main className="content-container">
					{/* <Sider>
						{layers &&
							layers.map((checkbox) => (
								<Switch
									key={checkbox.name}
									checkHandler={() => updateCheckStatus(checkbox.id)}
									isChecked={checkbox.checked}
									index={checkbox.id}
									label={checkbox.name}
								/>
							))}
					</Sider> */}
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
							<>
								<LayersControl>
									<LayersControl.Overlay name="Suppilovahvero" checked={true}>
										<LayerGroup>
											<GeoJSON
												data={mapData}
												// key={mapData[0].properties.fid}
												filter={suppiloFilter}
												onEachFeature={onEachFeature}
											/>
										</LayerGroup>
									</LayersControl.Overlay>
									<LayersControl.Overlay name="Keltavahvero" checked={true}>
										<LayerGroup>
											<GeoJSON
												data={mapData}
												// key={mapData[0].properties.fid}
												filter={kanttarelliFilter}
												style={{ color: 'red' }}
												onEachFeature={onEachFeature}
											/>
										</LayerGroup>
									</LayersControl.Overlay>
								</LayersControl>
							</>
						)}
					</MapContainer>
					<section></section>
				</main>
			</div>
		</>
	);
};

export default App;
