export function lastItem<T>(array: T[]) {
	return array[array.length - 1];
}

export function delItem<T>(array: T[], item: T) {
	const index = array.indexOf(item);
	if (index !== -1) {
		array.splice(index, 1);
		return true;
	}
	return false;
}
