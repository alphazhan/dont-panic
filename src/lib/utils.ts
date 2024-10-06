// Function to convert HEX to vec3
export function hexToVec3(hex: string): number[] {
	// Convert hex color to RGB
	const bigint = parseInt(hex.slice(1), 16); // Remove the '#' and parse
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

	return [r / 255, g / 255, b / 255]; // Return RGB as normalized values between 0 and 1
}

// Function to check if a value is a string that starts with '#'
export function isStringAndStartsWithHash(value: unknown): value is string {
	return typeof value === 'string' && value.startsWith('#');
}
