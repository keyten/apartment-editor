export function debounce<F extends Function>(func: F, wait: number): F {
	let timeoutID: number;

	if (!Number.isInteger(wait)) {
		console.warn('Called debounce without a valid number');
		wait = 300;
	}

	return function (this: any, ...args: any[]) {
		clearTimeout(timeoutID);
		const context = this;

		timeoutID = window.setTimeout(function () {
			func.apply(context, args);
		}, wait);
	} as any;
}