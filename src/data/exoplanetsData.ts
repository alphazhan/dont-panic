export type Emotion = 'Sad' | 'Angry' | 'Funny' | 'Playful';

export type ExoplanetData = {
	name: string;
	description?: string; // Description of the exoplanet
	emotion: Emotion;
	whyEmotion: string;
	color: string;
	size?: string;
	distanceToStar: string;
	radius: string;
	mass: string;
	temperature: string;
	planetType: 'Gas Giant' | 'Super Earth' | 'Terrestrial';
	oneYear: string;
	interestingFact: string;
	llmContext: string;
	habitable: boolean;
	whyResults: string;
};

export type ExoplanetDataMask = {
	[K in keyof ExoplanetData]: boolean;
};

export function applyMask(
	exoplanet: ExoplanetData,
	mask: ExoplanetDataMask
): Partial<ExoplanetData> {
	const result: Partial<ExoplanetData> = {};

	for (const key in exoplanet) {
		// Include property only if the mask is explicitly set to true
		if (mask[key as keyof ExoplanetData] === true) {
			// @ts-ignore
			result[key as keyof ExoplanetData] = exoplanet[key as keyof ExoplanetData];
		}
	}

	return result;
}

export function createDefaultMask(value: boolean = false): ExoplanetDataMask {
	// @ts-ignore
	const mask: ExoplanetDataMask = {};
	for (const key in exoplanets['GJ 504 b']) {
		mask[key as keyof ExoplanetData] = value;
	}
	return mask;
}

export const exoplanets: Record<string, ExoplanetData> = {
	// https://science.nasa.gov/exoplanet-catalog/gj-504-b/
	'GJ 504 b': {
		name: 'GJ 504 b',
		description: 'A puffy pink planet',
		emotion: 'Sad',
		whyEmotion: 'because of the Gravity.',
		color: 'Pinky and puffy',
		size: 'Same with the size of the Sun',
		distanceToStar: '43.5 AU',
		radius: '1.16 x Jupiter (estimate)',
		mass: '4 Jupiters',
		temperature: 'Unknown',
		planetType: 'Gas Giant',
		oneYear: '259.9 years',
		interestingFact:
			'Gravity on GJ 504b is 10 times stronger than it is on Earth. This planet takes 127,750 Earth days to orbit, or circle its sun once. That means one year on GJ 504b is the same as 350 years on Earth.',
		llmContext:
			'At the first view you can think that this planet is super nice like Pinky Pai, but discovering GJ504b you will see what it is exactly, its super heavy 300 many times than Earth, so inner world of this planet is heavy and sometimes sad',
		habitable: false,
		whyResults:
			'gravity on GJ 504b is 10 times stronger than it is on Earth. This planet takes 127,750 Earth days to orbit, or circle its sun once. That means one year on GJ 504b is the same as 350 years on Earth.'
	},

	// https://science.nasa.gov/exoplanet-catalog/tres-2-b/
	'TrES-2b': {
		name: 'TrES-2b',
		description: 'A world of eternal darkness',
		emotion: 'Sad',
		whyEmotion:
			'because I orbit in solitude, without any nearby planetary companions, in an almost invisible shroud of darkness. This could evoke a sense of isolation.',
		color: 'Black and red',
		size: 'Same with the size of the Sun',
		distanceToStar: '0.03563 AU',
		radius: '1.36 x Jupiter',
		mass: '1.49 Jupiters',
		temperature: '1,100°C to 1,200°C',
		planetType: 'Gas Giant',
		oneYear: '2.5 days',
		interestingFact:
			"TrES-2b reflects less than 1% of the light from its star, making it the darkest exoplanet ever discovered. It's literally blacker than coal or black paint. This eerie darkness adds to its mystery, as scientists are still trying to figure out why it absorbs so much light. Even though TrES-2b is mostly dark, it may emit a faint red glow, almost like burning embers, due to its high heat. This subtle illumination in the darkness only adds to its mysterious and unsettling nature.",
		llmContext:
			'If there was a depression planet, it would definitely be TReS-2b because the star is very far away and this planet takes all the light. Caution may be confused with goth (black clothes).',
		habitable: false,
		whyResults:
			"TrES-2b reflects less than 1% of the light from its star, making it the darkest exoplanet ever discovered. It's literally blacker than coal or black paint. This eerie darkness adds to its mystery, as scientists are still trying to figure out why it absorbs so much light. Even though TrES-2b is mostly dark, it may emit a faint red glow, almost like burning embers, due to its high heat. This subtle illumination in the darkness only adds to its mysterious and unsettling nature."
	},

	// https://science.nasa.gov/exoplanet-catalog/55-cancri-e/
	'55 Cancri e': {
		name: '55 Cancri e',
		description: 'A lava world with sparkling skies',
		emotion: 'Angry',
		whyEmotion:
			'with my scorching temperatures and crushing atmospheric conditions, I could symbolize overwhelm or the feeling of being under intense pressure.',
		color: 'Red',
		size: '0.7 Star',
		distanceToStar: '0.01544 AU',
		radius: '1.875 x Earth',
		mass: '7.99 Earths',
		temperature: '3320 K',
		planetType: 'Super Earth',
		oneYear: '0.7 days',
		interestingFact:
			'Due to its proximity to the star, 55 Cancri b experiences extreme temperatures, likely exceeding 1,000°C (1,832°F). This heat makes it another example of a "hot Jupiter," and its atmosphere is likely roiling with violent, hot gases.',
		llmContext:
			"You thought school is pressure but it's wrong. On this planet you will be “under pressure” this planet is a heavy communicator, oftenly ignore you and just doesn't like to communicate.",
		habitable: false,
		whyResults:
			'of its proximity to the star, 55 Cancri b experiences extreme temperatures, likely exceeding 1,000°C (1,832°F). This heat makes it another example of a "hot Jupiter," and its atmosphere is likely roiling with violent, hot gases.'
	},

	// https://science.nasa.gov/exoplanet-catalog/kelt-9-b/
	'KELT-9b': {
		name: 'KELT-9b',
		description: 'An ultrahot world hotter than some stars',
		emotion: 'Angry',
		whyEmotion:
			"because I'm a planet in a continuous state of destruction, being slowly consumed by its own star. This gives the impression of something being overpowered, helpless in the face of overwhelming force",
		color: 'Orange and red',
		size: '3 Sun',
		distanceToStar: '0.03462 AU',
		radius: '1.891 x Jupiter',
		mass: '2.88 Jupiters',
		temperature: '4300K',
		planetType: 'Gas Giant',
		oneYear: '1.5 days',
		interestingFact:
			'KELT-9b holds the record as the hottest exoplanet ever discovered, with daytime temperatures reaching an astounding 4,300°C (7,800°F).',
		llmContext:
			'If you had to talk to this planet, run and start panicking! She is very hot, even the hottest thing in the whole universe, but talking to you, she considers you her main enemy. It destroys everything that comes close to it, everything in the atmosphere and more.',
		habitable: false,
		whyResults:
			'KELT-9b holds the record as the hottest exoplanet ever discovered, with daytime temperatures reaching an astounding 4,300°C (7,800°F).'
	},

	// https://science.nasa.gov/exoplanet-catalog/toi-849-b/
	'TOI-849 b': {
		name: 'TOI-849b',
		description: 'A battered, blasted world',
		emotion: 'Sad',
		whyEmotion:
			'because I may represent a story of loss — a planet that once could have been a massive gas giant, stripped away until only its core remains. This evokes a sense of melancholy or tragedy, as the planet stands as a remnant of what it might have been.',
		color: 'Yellow and orange',
		size: '0.8 Sun',
		distanceToStar: '0.0155 AU',
		radius: '0.325 x Jupiter',
		mass: '0.13152 Jupiters',
		temperature: '5375 K',
		planetType: 'Gas Giant',
		oneYear: '0.8 days',
		interestingFact:
			'TOI-849b is one of the most unusual exoplanets ever discovered because it is likely an exposed core of a gas giant.',
		llmContext:
			'Is there a meaning to my existence? - this is what planet TOI 849b asks itself every day. This planet is very melancholic and sad, it constantly beats itself up. She expects support from you and just communicates well and calmly',
		habitable: false,
		whyResults:
			'a world called TOI 849 b could be the exposed, naked core of a gas giant whose atmosphere was blasted away by its star.'
	},

	// https://science.nasa.gov/exoplanet-catalog/toi-3757-b/
	'TOI-3757b': {
		name: 'TOI-3757b',
		description: 'A giant planet with the density of a marshmallow',
		emotion: 'Funny',
		whyEmotion:
			'because the extreme puffiness and low density of -3757b might evoke a feeling of lightness or fragility, like something that is almost too delicate to exist. The idea that this giant planet is so thin and inflated, almost like a celestial balloon, gives a sense of it being precarious or on the edge of stability.',
		color: 'Red',
		size: '0.5 Sun',
		distanceToStar: '0.03845 AU',
		radius: '1.071 x Jupiter',
		mass: '0.26838 Jupiters',
		temperature: '3900K',
		planetType: 'Gas Giant',
		oneYear: '3.4 days',
		interestingFact:
			"TOI-3757b completes its orbit around its parent star in just 3.4 days, meaning it's very close to its star. Despite this proximity, its low density suggests that it hasn't lost its atmosphere to stellar radiation, which is intriguing to scientists.",
		llmContext:
			'This planet is like the sun in another branch of the universe. She spins very quickly, she is easy to talk to and is always ready to cheer you up. She is ready to help and cheer you up',
		habitable: false,
		whyResults:
			"TOI-3757b completes its orbit around its parent star in just 3.4 days, meaning it's very close to its star. Despite this proximity, its low density suggests that it hasn't lost its atmosphere to stellar radiation, which is intriguing to scientists."
	},

	'Kepler-452 b': {
		name: 'Kepler-452b',
		description:
			'A potentially rocky world, larger than Earth. it is most likely a super-Earth with many active volcanoes due to its higher mass and density. The clouds on the planet would be thick and misty, covering much of the surface as viewed from space.', // 'An "Earth-cousin" that orbits a star like our sun in the habitable zone, where liquid water could exist.',
		emotion: 'Funny',
		whyEmotion: "because I'm a Super-Earth, with a similar host star, radius, and orbital period.",
		color: 'Unknown, maybe gray',
		planetType: 'Super Earth',
		distanceToStar: '1.046 AU (almost the same as ours)',
		oneYear: '385 days',
		mass: '5.0 x Earth mass',
		radius: '1.5 x Earth radius',
		temperature: '265K = (-8; 17°C) warmer than earth',
		interestingFact:
			"Earth 2.0 or Earth's Cousin / is in the habitable zone / to fly there at 59,000 km/h you need to spend 30 million years",
		llmContext:
			"She is often called Earth's cousin, as someone who is a little taller and more successful than her relative, but not too much so as not to cause envy. It also has its own dark past: due to its large mass and density, it is covered in active volcanoes and thick clouds that obscure the surface.",
		// starDescription: "The host star, Kepler-452, is a G-type and has about the same mass as the sun, only 3.7% more massive and 11% larger. It has a surface temperature of 5757 K, nearly the same as the Sun, which has a surface temperature of 5778 K.[12] The star's age is estimated to be about 6 billion years old, about 1.5 billion years older than the Sun, which is estimated to have existed for 4.6 billion years."
		habitable: true,
		whyResults:
			"Kepler is located in the habitable zone of its star, where conditions could potentially support life. Its radius is similar to Earth's, and the distance between Kepler and its star is comparable to the distance between Earth and the Sun. The planet completes its orbit in about 385 days, and the overall temperature is warm, making it a potentially Earth-like candidate in terms of habitability."
	},

	'Proxima Centauri b': {
		name: 'Proxima Centauri b',
		description: 'A potentially rocky world, larger than Earth',
		emotion: 'Playful',
		whyEmotion: "because I'm the younger brother of the famous Proxima Centauri a",
		planetType: 'Terrestrial',
		distanceToStar: '0.04856 AU (7.5 million km)',
		color: 'Yellow',
		oneYear: 'about 11.2 days',
		mass: '1.17 x Earth з',
		radius: '1.08 x Earth radius',
		temperature: 'Depending on the atmosphere, can support liquid water',
		interestingFact:
			'The closest exoplanet to the solar system, is in the habitable zone around its star. Despite its proximity to the star, it does not receive harmful doses of radiation due to its presumably dense atmosphere.',
		llmContext:
			'The closest exoplanet to Earth that is suitable for life, but at the same time remains the biggest mystery. Its star often arranges flares and storms, because of which it often has to hide and adapt. Scientists hope that at least this close exoplanet can contribute to maintaining life on it.',
		habitable: true,
		whyResults:
			'Proxima has a radius and mass that closely resemble Earth’s, and it’s situated in the habitable zone, meaning it could support liquid water. Despite being near its star, Proxima doesn’t receive harmful levels of radiation, which further increases its potential for sustaining life.'
	},

	// https://science.nasa.gov/exoplanet-catalog/hd-106906-b/
	'HD 106909 b': {
		name: 'HD 106909 b',
		description: 'A giant planet composed mainly of gas',
		emotion: 'Sad',
		whyEmotion: 'like a single planet in a distant orbit',
		planetType: 'Gas Giant',
		distanceToStar: '3.27 AU (490 million km)',
		color: 'red',
		radius: '1.03 Jupiter radii',
		mass: 'about 11 Jupiter masses',
		temperature: '~1500 k (about 1227°c)',
		oneYear: 'more than 15,000 years',
		interestingFact:
			'HD 106906 b is located in an extremely distant orbit (650 AU) and has puzzled scientists: perhaps it was ejected from the inner part of its star system due to gravitational interactions. Its existence raises questions about the formation and evolution of planetary systems.',
		llmContext:
			'She is like a child who quickly grew up into an adult. This factor is reflected in her uncertainty: she does not want to be too close to her star, but she also does not want to freeze in solitude.',
		habitable: false,
		whyResults:
			'HD 106906 b is located at an enormous distance of about 737 AU (Astronomical Units) from its host stars (1 AU is the distance between the Earth and the Sun). This means it receives very little heat and light, resulting in an extremely cold environment.'
	},

	'HR 5183 b': {
		name: 'HR 5183 b',
		description: 'A giant planet composed mainly of gas',
		emotion: 'Playful',
		whyEmotion: 'as an eccentric orbit around a star',
		planetType: 'Gas Giant',
		oneYear: '74 years',
		mass: 'about 3.31 Jupiters',
		radius: '1.17 x Jupiter (estimate)',
		temperature: 'UNKNOWN',
		distanceToStar: 'UNKNOWN',
		color: 'Red and purple',
		interestingFact:
			'The planet has one of the most elliptical orbits known for an exoplanet, its orbit resembling that of a dog looping around its owner, and it spends most of its time far from its star before darting toward it.',
		llmContext:
			'an unpredictable planet that is like the main character who returns to his home after long journeys. Scientists are still trying to figure out what makes it move in such an uncertain trajectory, moving away from its orbit and returning back after a while.',
		habitable: false,
		whyResults:
			'HR 5183 b has an extremely elongated (eccentric) orbit, taking it far from its host star at some points and bringing it relatively closer at others. This kind of orbit would cause extreme temperature fluctuations, making the climate wildly unpredictable and unsuitable for life.'
	}
};

// Retrieve the intersecting string keys
const expls: string[] = Object.keys(exoplanets);

// Seeded random shuffle based on current time
let seed = new Date().getTime();
const shuffleArray = (arr: string[]) =>
	arr
		.map((item) => ({ item, sort: Math.sin(seed++) * 10000 }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ item }) => item);

export const shuffledExpls = shuffleArray(expls);
