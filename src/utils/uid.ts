let lastId = 0;
export function uid(): string {
	return String(lastId++);
	//return `${Date.now()}_${String(Math.random()).slice(2)}`;
}
