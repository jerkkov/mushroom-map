import {
	developmentalClassProperties,
	fertilityClassProperties,
	mainTreeSpeciesProperties,
} from '../types/types';
export const mushroomWeights = {
	mushrooms: [
		{
			id: 0,
			name: 'Suppilovahvero',
			properties: [
				{
					MAINTREESPECIES: mainTreeSpeciesProperties.kuusi,
					FERTILITYCLASS:
						fertilityClassProperties.tuoreKangasVastaavaSuoJaMustikkaturvekangas,
					DEVELOPMENTALCLASS:
						developmentalClassProperties.uudistuskypsaMetsikko,
				},
			],
		},
	],
};
