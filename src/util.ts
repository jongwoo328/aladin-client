export function stringifyValue(o: Record<string, any>): Record<string, string> {
	const result: Record<string, string> = {};
	for (const key in o) {
		if (o[key] !== undefined && o[key] !== null) {
			if (Array.isArray(o[key])) {
				result[key] = o[key].join(",");
			} else {
				result[key] = String(o[key]);
			}
		}
	}
	return result;
}

export function trimEndSemiColon(text: string): string {
	if (text.endsWith(";")) {
		return text.slice(0, -1);
	}
	return text;
}
