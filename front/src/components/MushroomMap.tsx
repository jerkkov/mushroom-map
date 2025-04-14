import '../App.scss';

import {
	TileLayer,
	GeoJSON,
	MapContainer,
	LayerGroup,
	LayersControl,
} from 'react-leaflet';

import { MAPSTATE, useMushroomMap } from './MushroomMapProvider';
import { FavoriteSpotContainer } from './FavoriteSpotContainer';
import { useFilter } from './FilterProvider';
import { mushroomColors } from '../types/types';

export default function MushroomMap({
	locationData,
	suppiloFilter,
	kanttarelliFilter,
	onEachFeature,
}: any) {
	const { setMapState } = useMushroomMap();
	const { suppiloProbability, kanttarelliProbability } = useFilter();
	return (
		<MapContainer
			whenReady={() => setMapState(MAPSTATE.ready)}
			center={[61.4978, 23.761]}
			zoom={13}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<LayersControl /* ref={layerToggleRef} */>
				<LayersControl.Overlay name="Suppilovahvero" checked={true}>
					<LayerGroup>
						<GeoJSON
							key={locationData ? suppiloProbability : locationData}
							data={locationData}
							filter={suppiloFilter}
							style={{ color: mushroomColors.SUPPILOVAHVERO }}
							onEachFeature={onEachFeature}
						/>
					</LayerGroup>
				</LayersControl.Overlay>
				<LayersControl.Overlay name="Kanttarelli" checked={true}>
					<LayerGroup>
						<GeoJSON
							key={locationData ? kanttarelliProbability : locationData}
							data={locationData}
							filter={kanttarelliFilter}
							style={{ color: mushroomColors.KANTTARELLI }}
							onEachFeature={onEachFeature}
						/>
					</LayerGroup>
				</LayersControl.Overlay>
			</LayersControl>
			<FavoriteSpotContainer />
		</MapContainer>
	);
}
