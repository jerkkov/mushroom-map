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

const soilProperties = {
	keskikarkeaTaiKarkeaKangasmaa: '10',
	karkeaMoreeni: '11',
	karkeaLajittunutMaalaji: '12',
	hienojakoinenKangasmaa: '20',
	hienoainesMoreeni: '21',
	hienojakoinenLajittunutMaalaji: '22',
	silttipitoinenMaalaji: '23',
	savimaa: '24',
	kivinenKeskikarkeaTaiKarkeaKangasmaa: '30',
	kivinenKarkeaMoreeni: '31',
	kivinenKarkeaLajittunutMaalaji: '32',
	kivinenHienojakoinenKangasmaa: '40',
	kallioTaiKivikko: '50',
	turvemaa: '60',
	saraturve: '61',
	rahkaturve: '62',
	puuvaltainenTurve: '63',
	eroosioherkkaRahkaturveVonPostLuokkaYli5: '65',
	maatumatonSaraturveVonPostLuokkaEnintaan5: '66',
	maatumatonRahkaturveVonPostluokkaenintaan5: '67',
	multamaa: '70',
	liejumaa: '80',
};

const fertilityClassPropertions = {
	lehtoLettoJaLehtomainenSuoJaRuohoturvekangas: '1',
	lehtomainenKangasVastaavaSuoJaRuohoturvekangas: ',2',
	tuoreKangasVastaavaSuoJaMustikkaturvekangas: '3',
	kuivahkoKangasVastaavaSuoJaPuolukkaturvekangas: ',4',
	kuivaKangasVastaavaSuoJaVarputurvekangas: '5',
	karukkokangasVastaavaSuoJaJakalaturvekangas: '6',
	kalliomaaJaHietikko: '7',
	lakimetsaJaTunturi: '8',
};

const developmentalClassProperties = {
	nuoriKasvatusmetsikko: '02',
	varttunutKasvatusmetsikko: '03',
	uudistuskypsaMetsikko: '04',
	suojuspuumetsikko: '05',
	aukea: 'A0',
	eriIkaisrakenteinenMetsikko: 'ER',
	siemenpuumetsikko: 'S0',
	taimikkoAlle1_3m: 'T1',
	taimikkoYli1_3m: 'T2',
	ylispuustoinenTaimikko: 'Y1',
};

const mainTreeSpeciesProperties = {
	manty: '1',
	kuusi: '2',
	rauduskoivu: '3',
	hieskoivu: '4',
	haapa: '5',
	harmaaleppä: '6',
	tervaleppa: '7',
	muuHavupuu: '8',
	muuLehtipuu: '9',
	douglaskuusi: '10',
	kataja: '11',
	kontortamanty: '12',
	kynajalava: '13',
	lehtikuusi: '14',
	metsalehmus: '15',
	mustakuusi: '16',
	paju: '17',
	Pihlaja: '18',
	pihta: '19',
	raita: '20',
	saarni: '21',
	sembramanty: '22',
	serbiankuusi: '23',
	tammi: '24',
	tuomi: '25',
	vaahtera: '26',
	visakoivu: '27',
	vuorijalava: '28',
	lehtipuu: '29',
	havupuu: '30',
};

const Stand = {
	FERTILITYCLASS: fertilityClassPropertions, //Kuvion kasvupaikkatyyppi
	SOILTYPE: soilProperties, //Kuvion maalaji
	DEVELOPMENTCLASS: developmentalClassProperties, //Kuvion kehitysluokka
	MAINTREESPECIES: mainTreeSpeciesProperties, //Kuvion pääpuulaji
};

type fertilityClassPropertions =
	typeof fertilityClassPropertions[keyof typeof fertilityClassPropertions];
type soilProperties = typeof soilProperties[keyof typeof soilProperties];
type developmentalClassProperties =
	typeof developmentalClassProperties[keyof typeof developmentalClassProperties];
type mainTreeSpeciesProperties =
	typeof mainTreeSpeciesProperties[keyof typeof mainTreeSpeciesProperties];
