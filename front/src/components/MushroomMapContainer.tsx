import { useEffect, useState } from 'react';
import '../App.scss';

import MushroomMap from './MushroomMap';
import { Feature, FeatureCollection } from 'geojson';
import ReactDOMServer from 'react-dom/server';
import {
	developmentalClassProperties,
	fertilityClassProperties,
	mainTreeSpeciesProperties,
	MushroomFeatureCollection,
	Stand,
} from '../types/types';
import Tampere from '../assets/tampere-polygon-wgs84.json';
import { MAPSTATE, useMushroomMap } from './MushroomMapProvider';
import { probabilityOptions, useFilter } from './FilterProvider';

export default function MushroomMapContainer() {
	const { setMapState } = useMushroomMap();
	const [locationData, setLocationData] =
		useState<MushroomFeatureCollection | null>(null);

	const {
		suppiloProbability,
		kanttarelliProbability,
		setSuppiloProbability,
		setKanttarelliProbability,
	} = useFilter();

	useEffect(() => {
		try {
			if (!locationData) {
				setLocationData(Tampere as MushroomFeatureCollection);
			}
			if (!suppiloProbability) {
				setSuppiloProbability(probabilityOptions[0].probability);
			}
			if (!kanttarelliProbability) {
				setKanttarelliProbability(probabilityOptions[0].probability);
			}
		} catch (error: any) {
			console.error(`Could not fetch: ${error}`);
			setMapState(MAPSTATE.error);
		}
	}, [suppiloProbability, kanttarelliProbability]);

	const CustomPopup = ({ feature }: { feature: Feature }) => {
		if (!feature || !feature.properties) return <></>;

		const propertyArray = Object.entries(feature.properties).filter(
			(property) => property[1] && property[0] === "MAINTREESPECIES" || property[0] === "SOILTYPE" || property[0] === "DEVELOPMENTCLASS" || property[0] === "FERTILITYCLASS" 
		);
		return (
			<section>
				{propertyArray.map((property) => (
					<p key={property[0]}>{`${property[0]}:${property[1]}`}</p>
				))}
			</section>
		);
	};

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
		return calculateSuppiloProbability(feature) > suppiloProbability;
	}

	function kanttarelliFilter(feature: Feature) {
		return calculateKanttarelliProbability(feature) > kanttarelliProbability;
	}
	return (
		<MushroomMap
			locationData={locationData}
			suppiloFilter={suppiloFilter}
			kanttarelliFilter={kanttarelliFilter}
			suppiloProbability={suppiloProbability}
			kanttarelliProbability={kanttarelliProbability}
			onEachFeature={onEachFeature}
			// layerToggleRef={'s'}
		/>
	);
}
