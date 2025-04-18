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

export function isNullish(value: any): value is null | undefined {
	return value === null || value === undefined;
}

export function sanitizeJsonLikeString(s: string) {
	if (s.trimEnd().endsWith(";")) {
		s = s.trimEnd().slice(0, -1);
	}
	return s.replaceAll("\r\n", "\n");
}
