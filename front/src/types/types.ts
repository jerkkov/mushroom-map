export interface Stand {
	type: string;
	features: Feature[];
	totalFeatures: string;
	numbersReturned: number;
	timeStamp: Date;
	crs: string;
}

export type bbox = [number, number, number, number];
export type polygonCoordinates = number[][];

export interface Feature {
	type: string;
	id: string;
	geometry: any;
	properties: {
		MAINTREESPECIES: number;
	};
	bbox: bbox;
}
