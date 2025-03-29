# Mushroom Map

This text document is used for planning of the Mushroom Map project.
It contains important links and decicions.

# Planning

## Map view

- Displays potential mushroom spots
- Is pannaple and zoomable
- Limited for Tampere region?
- Has labels for different type of forests?

### Visualizations

- Hexagonal binning map
  Each mushroom type has a different color that is displayed in a map as Hexa.

- Choropleth map
- Heat map

** Is it possible to explore multiple mushroom types at the same time? **
Pros

- At the same time easier to view potential spots
- Difficult to implement than single view
  Cons
  ** What open data can I use for mapping of the potential spots? **
- User has to select and deselect for new mushroom types
- Potentially cluttered view
- More difficult to implement?

** How mushroom spots are displayed? **
Using Heatmap

Single Colored layer

** How the map view is filtered? **

### Interaction

- Slider for accuracy
- selector (Slider?) for seasons
-

### Tech

- leaflet.js
- React

# Links

Sienten kääntäminen: https://www.arktisetaromit.fi/fi/sienet/nimia+eri+kielilla/
For leaflet
https://neenapriyanka.medium.com/geospatial-data-visualization-b81f6e18f8fd

https://gis.stackexchange.com/questions/387406/parsing-geopackage-gpkg-file-in-javascript-into-array for using geopackage

** Data Loading **
Using wfs rest for leaflet
https://github.com/Flexberry/Leaflet-WFST#filter

using geopackage in leaflet
https://github.com/ngageoint/leaflet-geopackage

To calculate the probability of a mushroom appearing in an area based on the provided data, you can create a weighted scoring or classification system. This can be done using a set of conditions (such as matching values for `MAINTREESPECIES`, `FERTILITYCLASS`, and `DEVELOPMENTCLASS`) that represent the likelihood of a mushroom species being present in that area.

Here’s a general approach to calculating the probability:

### Step 1: Define your data conditions

You have certain criteria that affect the probability of the mushroom appearing:

- **`MAINTREESPECIES`** should be 4 or 6.
- **`FERTILITYCLASS`** should be 4.
- **`DEVELOPMENTCLASS`** should be 3.

You will need to assess how closely the current data matches these criteria and assign weights or scores based on that.

### Step 2: Define a scoring system or probability function

For example, you can define the probability based on how closely the data matches these criteria. A simple scoring system might look like this:

- If `MAINTREESPECIES` is 4 or 6, you assign a score of 1 (full match).
- If `FERTILITYCLASS` is 4, you assign a score of 1 (full match).
- If `DEVELOPMENTCLASS` is 3, you assign a score of 1 (full match).
- If the value is different, assign a score of 0.

### Step 3: Calculate the probability

You can then normalize these scores to calculate a final probability for the mushroom being present in the area. For example:

```javascript
const calculateProbability = (data) => {
	let score = 0;
	let totalCriteria = 3; // We have 3 criteria (MAINTREESPECIES, FERTILITYCLASS, DEVELOPMENTCLASS)

	// Check MAINTREESPECIES
	if (
		data.properties.MAINTREESPECIES === 4 ||
		data.properties.MAINTREESPECIES === 6
	) {
		score++;
	}

	// Check FERTILITYCLASS
	if (data.properties.FERTILITYCLASS === 4) {
		score++;
	}

	// Check DEVELOPMENTCLASS
	if (data.properties.DEVELOPMENTCLASS === '03') {
		// Assuming DEVELOPMENTCLASS is a string like "03"
		score++;
	}

	// Calculate probability as a score out of totalCriteria (normalized to 0-1)
	const probability = score / totalCriteria;

	return probability; // returns a value between 0 and 1
};

// Example usage with your provided data
const mushroomData = {
	type: 'Feature',
	properties: {
		MAINTREESPECIES: 1.0,
		FERTILITYCLASS: 3.0,
		DEVELOPMENTCLASS: '03',
		// other properties...
	},
	geometry: {
		type: 'Polygon',
		coordinates: [
			[
				[23.935425722885284, 61.45364027182584],
				[23.935396886479822, 61.453688390269335],
				[23.935284178457945, 61.453787047667447],
				[23.935133952964112, 61.453894657359],
				[23.934814958499508, 61.45401116162744],
				[23.93468455065037, 61.45405960777016],
				[23.93267108408798, 61.45385697630744],
				[23.931475067516963, 61.45373659967656],
				[23.931571928541317, 61.45369548133914],
				[23.93174086889562, 61.453605826635616],
				[23.931928557612103, 61.453516185383876],
				[23.93205997094546, 61.45344446084146],
				[23.93211630971117, 61.453399622698385],
				[23.932060234452166, 61.453325571157976],
				[23.933312433389307, 61.45344329663808],
				[23.935425722885284, 61.45364027182584],
			],
		],
	},
};

const probability = calculateProbability(mushroomData);
console.log(`Probability of mushroom: ${probability * 100}%`); // Outputs probability as a percentage
```

### Explanation:

1. **`calculateProbability` function**:

   - It checks if each of the three criteria (MAINTREESPECIES, FERTILITYCLASS, and DEVELOPMENTCLASS) match the required values.
   - For each match, it increments the `score`.
   - The `score` is then divided by the total number of criteria (3) to give a normalized probability between 0 and 1.

2. **Example usage**:
   - You pass the `mushroomData` object to the `calculateProbability` function.
   - It calculates the probability based on the conditions provided.

### Step 4: Adjust weights or probability logic

If the conditions are not binary (i.e., strict matches or mismatches), you could also assign weights to each condition, for example:

- MAINTREESPECIES match: 0.5 probability if it’s close, 1.0 if it’s exact.
- FERTILITYCLASS match: 1.0 if exact, but 0.7 if close.
- DEVELOPMENTCLASS match: Similar approach if the value is close but not exact.

### Step 5: Implement filters based on probability

You can use the `probability` value to filter areas where the probability is low. For example, if you want to only show areas with a probability above a certain threshold, you can filter them like so:

```javascript
const filteredData = mushroomData.filter(
	(area) => calculateProbability(area) > 0.5
); // Only areas with >50% probability
```

### Conclusion:

This basic scoring system works well for evaluating the probability of a mushroom based on multiple criteria. You can refine it by adding more complex logic, such as weighted criteria, or even use machine learning models if the system grows more complex.
