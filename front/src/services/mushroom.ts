import { Stand, MushroomFilter } from '../types/types';

export const mushroom = {
	mushrooms: [
		{
			suppilovahvero: [
				{ MAINTREESPECIES: [Stand.MAINTREESPECIES.kuusi] },
				{
					FERTILITYCLASS: [
						Stand.FERTILITYCLASS.tuoreKangasVastaavaSuoJaMustikkaturvekangas,
					],
					DEVELOPMENTCLASS: [Stand.DEVELOPMENTCLASS.uudistuskypsaMetsikko],
				},
			],
		},
	],
} as MushroomFilter;
