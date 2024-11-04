// Define a type for the exoplanet parameters
export type ExoplanetMaterial = {
	color: string | number[]; // Main surface color
	surfaceRoughness?: number; // Noise scale for surface terrain
	atmosphereThickness: number; // Intensity of atmosphere
	radius: number; // Radius of the planet
	distanceToStar: number; // Distance to the star
	horizontalExaggeration?: number; // Horizontal elongation factor
	minDiffuse?: number; // Minimum diffuse light

	// Cloud parameters
	cloudCoverage?: number; // Cloud coverage percentage (whirl clouds)
	cloudColor?: string | number[]; // Cloud color (static/slow-moving clouds)

	// Scars parameters
	secondaryColor?: string | number[]; // Secondary color for horizontal scars
	scarsPercentage?: number; // Percentage of horizontal scars on the surface

	// Brush parameters
	brushColor?: string | number[]; // Color of circular brush spots (lunar craters)
	brushRadius?: number; // Radius of each brush spot
	brushCount?: number; // Total number of brush spots
	brushPositions?: Float32Array;
};

// Define the parameters for each exoplanet
export const exoplanetsMaterial: Record<string, ExoplanetMaterial> = {
	// https://science.nasa.gov/exoplanet-catalog/gj-504-b/
	'GJ 504 b': {
		color: '#af7794',
		cloudCoverage: 0.7,
		cloudColor: '#804c66',
		secondaryColor: '#582842',
		scarsPercentage: 1.0,
		atmosphereThickness: 0.3,
		radius: 0.9,
		distanceToStar: 0.9 // it's too far
	},

	// https://science.nasa.gov/exoplanet-catalog/tres-2-b/
	'TrES-2b': {
		color: '#0f0d0e', // #953737
		cloudColor: '#953737',
		cloudCoverage: 0.2,
		secondaryColor: '#953737',
		scarsPercentage: 0.2,
		atmosphereThickness: 0.3,
		radius: 0.9,
		distanceToStar: 0.03563
	},

	// https://science.nasa.gov/exoplanet-catalog/55-cancri-e/
	'55 Cancri e': {
		color: '#a10f0b', // +  (sun-like brushes)
		cloudCoverage: 0.2,
		cloudColor: '#ffac43',
		atmosphereThickness: 0.0,
		radius: 0.9,
		minDiffuse: 1.0,
		distanceToStar: 0.01544
	},

	// https://science.nasa.gov/exoplanet-catalog/kelt-9-b/
	'KELT-9b': {
		color: '#cb5621',
		cloudCoverage: 0.1,
		cloudColor: '#e0590b',
		scarsPercentage: 1.0,
		secondaryColor: '#e0590b',
		atmosphereThickness: 0.3,
		radius: 0.9,
		minDiffuse: 0.25,
		distanceToStar: 0.03462
	},

	// https://science.nasa.gov/exoplanet-catalog/toi-849-b/
	'TOI-849 b': {
		color: '#f0730d',
		minDiffuse: 0.1,
		secondaryColor: '#edd302',
		scarsPercentage: 1.0,
		atmosphereThickness: -5.0,
		radius: 0.9,
		distanceToStar: 0.0155
	},

	// https://science.nasa.gov/exoplanet-catalog/toi-3757-b/
	'TOI-3757b': {
		color: '#f7bc03',
		cloudCoverage: 1.0,
		cloudColor: '#eb3403',
		atmosphereThickness: 0.3,
		radius: 0.9,
		distanceToStar: 0.03845
	},

	// https://science.nasa.gov/exoplanet-catalog/kepler-452-b/
	'Kepler-452 b': {
		color: '#82766d',
		scarsPercentage: 0.9,
		secondaryColor: '#434645',
		surfaceRoughness: 0.7,
		cloudColor: '#e2dedb',
		cloudCoverage: 0.7,
		brushColor: '#222222',
		brushCount: 4,
		brushRadius: 0.1,
		atmosphereThickness: 0.2,
		radius: 0.9,
		minDiffuse: 0.05,
		distanceToStar: 0.9
	},

	// https://science.nasa.gov/exoplanet-catalog/proxima-centauri-b/
	'Proxima Centauri b': {
		color: '#e1b061',
		cloudColor: '#dfd6a2',
		cloudCoverage: 0.7,
		secondaryColor: '#544023',
		scarsPercentage: 0.7,
		atmosphereThickness: 0.3,
		radius: 0.9,
		minDiffuse: 0.2,
		distanceToStar: 0.04856
	},

	// https://science.nasa.gov/exoplanet-catalog/hd-106906-b/
	'HD 106909 b': {
		color: '#ce6165',
		scarsPercentage: 0.4,
		secondaryColor: '#8d4a51',
		atmosphereThickness: 0.3,
		radius: 0.9,
		minDiffuse: 0.3,
		distanceToStar: 0.875
	},

	// https://science.nasa.gov/exoplanet-catalog/hr-5183-b/
	'HR 5183 b': {
		color: '#cf9cb0',
		cloudCoverage: 1.0,
		cloudColor: '#db6667',
		secondaryColor: '#644471',
		scarsPercentage: 0.5,
		atmosphereThickness: 0.3,
		radius: 0.9,
		distanceToStar: 0.85
	}
};

export const randomBrushPositions: [number, number][] = [
	[-0.0909, 0.1011],
	[-0.5764, 0.559],
	[0.3796, -0.4492],
	[0.7019, -0.3781],
	[-0.5364, -0.2794],
	[0.2047, -0.7703],
	[-0.297, -0.1812],
	[0.9878, 0.1823],
	[0.295, -0.1227],
	[-0.4273, 0.7102],
	[-0.8064, 0.928],
	[-0.542, 0.336],
	[-0.2042, 0.3326],
	[-0.0377, 0.589],
	[0.978, -0.8158]
];
