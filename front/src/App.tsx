import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import './App.scss';
import 'leaflet/dist/leaflet.css';

import {
	TileLayer,
	GeoJSON,
	MapContainer,
	LayerGroup,
	LayersControl,
	useMap,
	Polygon,
} from 'react-leaflet';

import Tampere from './assets/tampere-polygon-wgs84.json';
import {
	MushroomFeatureCollection,
	MushroomFeature,
	Stand,
	PropertyFilters,
	HabitatProperties,
} from './types/types';
import { mushroom } from './services/mushroom';
import { LatLngExpression } from 'leaflet';

const App = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [mapData, setMapData] = useState<MushroomFeatureCollection | null>(
		null
	);
	const [layerData, setLayerData] = useState([]);

	useState<{ id: number; name: string; checked: boolean }[]>();

	useEffect(() => {
		try {
			setLoading(true);
			setMapData(Tampere as MushroomFeatureCollection);
			setLoading(false);
		} catch (error: any) {
			console.error(`Could not fetch: ${error}`);
			setLoading(false);
		}
	}, []);

	function CustomPopup({ feature }: { feature: MushroomFeature }) {
		if (!feature || !feature.properties) return <></>;

		const propertyArray = Object.entries(feature.properties).filter(
			(property) => property[1]
		);
		// console.log(propertyArray);
		return (
			<section>
				{propertyArray.map((property) => (
					<p key={property[0]}>{`${property[0]}:${property[1]}`}</p>
				))}
			</section>
		);
	}

	const onEachFeature = (feature: MushroomFeature, layer: any) => {
		const popupOptions = {
			minWidth: 250,
			maxWidth: 500,
			className: 'popup-classname',
		};
		const popupContentNode = <CustomPopup feature={feature} />;
		const popupContentHtml = ReactDOMServer.renderToString(popupContentNode);
		layer.bindPopup(popupContentHtml, popupOptions);
	};

	function suppiloFilter(feature: MushroomFeature) {
		const properties = { ...feature.properties };
		return (
			properties.MAINTREESPECIES === Stand.MAINTREESPECIES.kuusi &&
			properties.FERTILITYCLASS <=
				Stand.FERTILITYCLASS.tuoreKangasVastaavaSuoJaMustikkaturvekangas &&
			properties.DEVELOPMENTCLASS ===
				Stand.DEVELOPMENTCLASS.uudistuskypsaMetsikko
		);
	}

	function kanttarelliFilter(feature: MushroomFeature) {
		const properties = { ...feature.properties };
		return (
			(properties.MAINTREESPECIES === 4 ||
				properties.MAINTREESPECIES === 3 ||
				properties.MAINTREESPECIES === 27) &&
			(properties.FERTILITYCLASS === 3 || properties.FERTILITYCLASS === 2) &&
			properties.DEVELOPMENTCLASS === '04'
		);
	}

	function calculateProbability() {
		mushroom.mushrooms.map;
	}

	function propertiesMatch(property: HabitatProperties) {}

	function addProbabilityToFeature() {
		const featureCollection = mapData?.features;
		const featureCollectionwithProbabilities = featureCollection?.map(
			(feature) => {}
		);
	}

	function addFeatureToLayer() {
		// const layer = mapData?.features.map((feature) => (
		// 	<Polygon positions={feature.geometry.coordinates} />
		// ));
		console.log(mapData?.features[0].geometry.coordinates);
		const layer = (
			<Polygon
				positions={mapData?.features[0].geometry.coordinates[0].reverse()}
			/>
		);
		return layer;
	}
	console.log(addFeatureToLayer());
	// function FeatureLayer () {
	// 	const map = useMap();
	// 	while()
	// 	return null
	// }

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
						scrollWheelZoom={true}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						{mapData && (
							<>
								{addFeatureToLayer()}
								{/* <LayersControl>
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
								</LayersControl> */}
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
