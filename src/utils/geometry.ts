export function angleFrom0To2Pi(angle: number) {
	while (angle < 0) {
		angle += Math.PI * 2;
	}
	while (angle > 2 * Math.PI) {
		angle -= 2 * Math.PI;
	}
	return angle;
}
