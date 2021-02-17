export const setAttr = (
	contextElem: SVGElement,
	attrObj: Map<string, string>
): void => {
	for (const [attrName, attrVal] of attrObj.entries()) {
		if (!attrVal.includes('NaN') && attrVal !== 'undefined') {
			contextElem.setAttribute(attrName, attrVal);
		}
	}
};

export function hasParentWithId(elem: any, id: string) {
	elem = elem.parentNode;
	while (elem) {
		if (elem.id === id) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}
