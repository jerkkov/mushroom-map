import axios from 'axios';
import { Stand } from '../types/types';

const metsavaraLayerUrl =
	'https://avoin.metsakeskus.fi/rajapinnat/v1/stand/wfs?';
const params = {
	service: 'WFS',
	version: '2.0.0',
	request: 'GetFeature',
	typeNames: 'v1:stand',
	propertyName: 'MAINTREESPECIES',
	srsName: 'EPSG:4326',
	outputFormat: 'application/json',
	// filter: '<Filter><PropertyIsEqualTo><PropertyName>road_type</PropertyName><Literal>motorway</Literal></PropertyIsEqualTo></Filter>',
};

export function getLayer() {
	const request = axios.get(metsavaraLayerUrl, { params });
	return request.then<Stand>((response) => response.data as Stand);
}
