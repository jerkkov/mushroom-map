import axios from 'axios';

//https://georaster.tampere.fi/geoserver/wms?service=WMS&request=GetCapabilities
// tampereBbox CRS:84": minx="23.528403926565073" miny="61.41779768198229" maxx="24.00924930286667" maxy="61.55224817521468"/>
/* <westBoundLongitude>23.528403926565073</westBoundLongitude>
<eastBoundLongitude>24.00924930286667</eastBoundLongitude>
<southBoundLatitude>61.41779768198229</southBoundLatitude>
<northBoundLatitude>61.55224817521468</northBoundLatitude>
</EX_GeographicBoundingBox> */
// EPSG:4326'
const info = {
	service: 'WFS',
	version: '2.0.0',
	typeNames: 'v1:stand',
	srsName: 'CRS',
	outputFormat: 'application/json',
};

const tampereBbox =
	'23.528403926565073,61.41779768198229,24.00924930286667,61.55224817521468,EPSG:4326';

const featureRequest = {
	request: 'GetFeature',
	propertyName: 'MAINTREESPECIES',
	bbox: tampereBbox,
	// filter: '<Filter><PropertyIsEqualTo><PropertyName>road_type</PropertyName><Literal>motorway</Literal></PropertyIsEqualTo></Filter>',
};
// cql_filter:
// 'BBOX(GEOMETRY,23.528403926565073,61.41779768198229,24.00924930286667,61.55224817521468)',
const filter = `<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
<ogc:BBOX>
		<gml:Box xmlns:gml="http://www.opengis.net/gml" srsName="EPSG:4326">
			<gml:Envelope srsName="EPSG:4326">
			<gml:lowerCorner>23.528403926565073 61.41779768198229</gml:lowerCorner>
			<gml:upperCorner>24.00924930286667 61.55224817521468</gml:upperCorner>
	</gml:Envelope>
	</ogc:BBOX>
</ogc:Filter>
</ogc:Filter>`;
const filter2 = `<fes:Filter>
<fes:BBOX>
		<fes:ValueReference>GEOMETRY</fes:ValueReference>
		<gml:Envelope srsName="EPSG:4326">
				<gml:lowerCorner>23.528403926565073 61.41779768198229</gml:lowerCorner>
				<gml:upperCorner>24.00924930286667 61.55224817521468</gml:upperCorner>
		</gml:Envelope>
</fes:BBOX>
<fes:PropertyIsEqualTo>
		<fes:ValueReference>MAINTREESPECIES</fes:ValueReference>
		<fes:Literal>2</fes:Literal>
</fes:PropertyIsEqualTo>
</fes:Filter>`;
const firstParams = {
	service: 'WFS',
	version: '2.0.0',
	srsName: 'EPSG:3067',
	typeNames: 'v1:stand',
	outputFormat: 'json',
	request: 'GetFeature',
	propertyName: 'MAINTREESPECIES,FERTILITYCLASS,DEVELOPMENTCLASS',
	geometry: 'polygon',
	count: '100',
	startIndex: '0',
	// BBOX: tampereBbox,
};
// const secondParams = {
// 	service: 'WFS',
// 	version: '2.0.0',
// 	srsName: 'EPSG:4326',
// 	typeNames: 'v1:stand',
// 	outputFormat: 'application/json',
// 	request: 'GetFeature',
// 	propertyName: 'MAINTREESPECIES,FERTILITYCLASS,DEVELOPMENTCLASS',
// 	count: '100000',
// 	startIndex: '100000',
// 	BBOX: tampereBbox,
// };
const metsavaraLayerUrl =
	'https://avoin.metsakeskus.fi/rajapinnat/v1/stand/wfs?';

export async function getLayer() {
	const firstRequest = await axios.get(metsavaraLayerUrl, {
		params: firstParams,
	});
	return firstRequest.data;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<wfs:GetFeature service="WFS" version="2.0.0"
    xmlns:wfs="http://www.opengis.net/wfs/2.0"
    xmlns:fes="http://www.opengis.net/fes/2.0"
    xmlns:gml="http://www.opengis.net/gml/3.2"
    xmlns:sf="http://www.openplans.org/spearfish"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/wfs/2.0
                        http://schemas.opengis.net/wfs/2.0/wfs.xsd
                        http://www.opengis.net/gml/3.2
                        http://schemas.opengis.net/gml/3.2.1/gml.xsd">
    <wfs:Query typeNames="v1:stand">
        <fes:Filter>
            <fes:BBOX>
                <fes:ValueReference>GEOMETRY</fes:ValueReference>
                <gml:Envelope srsName="EPSG:4326">
                    <gml:lowerCorner>23.528403926565073 61.41779768198229</gml:lowerCorner>
                    <gml:upperCorner>24.00924930286667 61.55224817521468</gml:upperCorner>
                </gml:Envelope>
            </fes:BBOX>
            <fes:PropertyIsEqualTo>
                <fes:ValueReference>MAINTREESPECIES</fes:ValueReference>
                <fes:Literal>2</fes:Literal>
            </fes:PropertyIsEqualTo>
        </fes:Filter>
    </wfs:Query>
</wfs:GetFeature>`;

const encodedXml = encodeURIComponent(xml);

// axios
// 	.post('https://avoin.metsakeskus.fi/geoserver/v1/wfs', xml, {
// 		headers: {
// 			'Content-Type': 'application/xml',
// 		},
// 	})
// 	.then((response) => {
// 		console.log('xmlData', response.data);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

// export function getSuppiloVahvero() {
// 	const request = axios.get(metsavaraLayerUrl, { params });
// 	return request.then<Stand>((response) => response.data);
// }
