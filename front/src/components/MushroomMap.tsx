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

export default function MushroomMap({
	locationData,
	suppiloFilter,
	kanttarelliFilter,
	onEachFeature,
}: /* 	layerToggleRef, */
any) {
	const { setMapState } = useMushroomMap();
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
							key={locationData}
							data={locationData}
							filter={suppiloFilter}
							onEachFeature={onEachFeature}
						/>
					</LayerGroup>
				</LayersControl.Overlay>
				<LayersControl.Overlay name="Keltavahvero" checked={true}>
					<LayerGroup>
						<GeoJSON
							key={locationData}
							data={locationData}
							filter={kanttarelliFilter}
							style={{ color: 'red' }}
							onEachFeature={onEachFeature}
						/>
					</LayerGroup>
				</LayersControl.Overlay>
			</LayersControl>
			<FavoriteSpotContainer />
		</MapContainer>
	);
}
