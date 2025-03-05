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
	useMapEvents,
} from 'react-leaflet';
import Tampere from './assets/tampere-polygon-wgs84.json';
import {
	developmentalClassProperties,
	fertilityClassProperties,
	mainTreeSpeciesProperties,
} from './types/types';
import { mushroomWeights } from './services/MushroomWeights';
import { Sider } from './components/Sider';
import { Filter } from './components/Filter';

const App = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [mapData, setMapData] = useState<FeatureCollection | null>(null);
	useState<{ id: number; name: string; checked: boolean }[]>();
	const [habitatWeight, setHabitatWeight] = useState<number>(0);
	const [suppiloProbability, setSuppiloProbability] = useState<number>(0.8);
	const [kanttarelliProbability, setKanttarelliProbability] =
		useState<number>(0.8);

	const probabilities = {
		Harva: 0.3,
		Mahdollinen: 0.6,
		Todennäköinen: 0.9,
	};

	const handleSuppiloSelectionChange = (selectedOption: any) => {
		setSuppiloProbability(probabilities[selectedOption] || 0);
	};

	const handleKanttarelliSelectionChange = (selectedOption: any) => {
		setKanttarelliProbability(probabilities[selectedOption] || 0);
	};

	useEffect(() => {
		try {
			setLoading(true);

			if (!mapData) {
				setMapData(Tampere as FeatureCollection);
			} else {
				console.log('re-render');
				setMapData(Tampere as FeatureCollection);
			}
			setLoading(false);
		} catch (error: any) {
			console.error(`Could not fetch: ${error}`);
			setLoading(false);
		}
	}, [suppiloProbability, kanttarelliProbability]);

	function CustomPopup({ feature }: { feature: Feature }) {
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

	const calculateSuppiloProbability = (data: any) => {
		let score = 0;
		let totalCriteria = 3; // We have 3 criteria (MAINTREESPECIES, FERTILITYCLASS, DEVELOPMENTCLASS)

		if (data.properties.MAINTREESPECIES === mainTreeSpeciesProperties.kuusi) {
			score++;
		}

		if (
			data.properties.FERTILITYCLASS <=
			fertilityClassProperties.tuoreKangasVastaavaSuoJaMustikkaturvekangas
		) {
			score++;
		}

		if (
			data.properties.DEVELOPMENTCLASS ===
			developmentalClassProperties.uudistuskypsaMetsikko
		) {
			score++;
		}

		// Calculate probability as a score out of totalCriteria (normalized to 0-1)
		const probability = score / totalCriteria;

		return probability; // returns a value between 0 and 1
	};

	const calculateKanttarelliProbability = (data: any) => {
		let score = 0;
		let totalCriteria = 3; // We have 3 criteria (MAINTREESPECIES, FERTILITYCLASS, DEVELOPMENTCLASS)

		if (
			data.properties.MAINTREESPECIES ===
				mainTreeSpeciesProperties.rauduskoivu ||
			data.properties.MAINTREESPECIES === mainTreeSpeciesProperties.hieskoivu ||
			data.properties.MAINTREESPECIES === mainTreeSpeciesProperties.visakoivu
		) {
			score++;
		}

		if (
			data.FERTILITYCLASS ===
				fertilityClassProperties.tuoreKangasVastaavaSuoJaMustikkaturvekangas ||
			data.FERTILITYCLASS ===
				fertilityClassProperties.lehtoLettoJaLehtomainenSuoJaRuohoturvekangas
		) {
			score++;
		}

		if (
			data.properties.DEVELOPMENTCLASS ===
			developmentalClassProperties.uudistuskypsaMetsikko
		) {
			score++;
		}

		// Calculate probability as a score out of totalCriteria (normalized to 0-1)
		const probability = score / totalCriteria;

		return probability; // returns a value between 0 and 1
	};

	function suppiloFilter(feature: Feature) {
		console.log('run suppiloFilter');
		return calculateSuppiloProbability(feature) > suppiloProbability;
	}

	function kanttarelliFilter(feature: Feature) {
		return calculateKanttarelliProbability(feature) > kanttarelliProbability;
	}

	if (!mapData || loading) {
		return <div>loading...</div>;
	}
	console.log('kanttarelli', kanttarelliProbability);
	console.log('suppilo', suppiloProbability);

	return (
		<>
			<header>
				<h1>Tampere Area Mushroom Map</h1>
			</header>
			<div className="wrapper">
				<main className="content-container">
					<Sider>
						<Filter
							label={'Todennäköisyydet'}
							onSuppiloSelectionChange={handleSuppiloSelectionChange}
							onKanttarelliSelectionChange={handleKanttarelliSelectionChange}
						/>
						<p>dsasdasdsd</p>
					</Sider>
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
												key={suppiloProbability}
												data={mapData}
												filter={suppiloFilter}
												onEachFeature={onEachFeature}
											/>
										</LayerGroup>
									</LayersControl.Overlay>
									<LayersControl.Overlay name="Keltavahvero" checked={true}>
										<LayerGroup>
											<GeoJSON
												key={kanttarelliProbability}
												data={mapData}
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
