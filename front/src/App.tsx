import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import './App.scss';
import 'leaflet/dist/leaflet.css';
import type { FeatureCollection, Feature } from 'geojson';

import {
	TileLayer,
	GeoJSON,
	MapContainer,
	LayerGroup,
	LayersControl,
} from 'react-leaflet';
import Tampere from './assets/tampere-polygon-wgs84.json';
import {
	developmentalClassProperties,
	fertilityClassProperties,
	mainTreeSpeciesProperties,
} from './types/types';

const App = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [mapData, setMapData] = useState<FeatureCollection | null>(null);
	useState<{ id: number; name: string; checked: boolean }[]>();

	useEffect(() => {
		try {
			setLoading(true);
			setMapData(Tampere as FeatureCollection);
			setLoading(false);
		} catch (error: any) {
			console.error(`Could not fetch: ${error}`);
			setLoading(false);
		}
	}, []);

	function CustomPopup({ feature }: { feature: Feature }) {
		if (!feature || !feature.properties) return <></>;

		const propertyArray = Object.entries(feature.properties).filter(
			(property) => property[1]
		);
		console.log(propertyArray);
		return (
			<section>
				{propertyArray.map((property) => (
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

	function suppiloFilter(feature: Feature) {
		const properties = { ...feature.properties };
		return (
			properties.MAINTREESPECIES === mainTreeSpeciesProperties.kuusi &&
			properties.FERTILITYCLASS <=
				fertilityClassProperties.tuoreKangasVastaavaSuoJaMustikkaturvekangas &&
			properties.DEVELOPMENTCLASS ===
				developmentalClassProperties.uudistuskypsaMetsikko
		);
	}

	function kanttarelliFilter(feature: Feature) {
		const properties = { ...feature.properties };
		return (
			(properties.MAINTREESPECIES === mainTreeSpeciesProperties.rauduskoivu ||
				properties.MAINTREESPECIES === mainTreeSpeciesProperties.hieskoivu ||
				properties.MAINTREESPECIES === mainTreeSpeciesProperties.visakoivu) &&
			(properties.FERTILITYCLASS ===
				fertilityClassProperties.tuoreKangasVastaavaSuoJaMustikkaturvekangas ||
				properties.FERTILITYCLASS ===
					fertilityClassProperties.lehtoLettoJaLehtomainenSuoJaRuohoturvekangas) &&
			properties.DEVELOPMENTCLASS ===
				developmentalClassProperties.uudistuskypsaMetsikko
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
						scrollWheelZoom={true}
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
