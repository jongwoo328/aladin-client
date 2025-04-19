export function stringifyValue(
	o: Record<string, unknown>,
): Record<string, string> {
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

export function isNullish(value: unknown): value is null | undefined {
	return value === null || value === undefined;
}

export function sanitizeJsonLikeString(s: string) {
	let result = s;
	if (s.trimEnd().endsWith(";")) {
		result = s.trimEnd().slice(0, -1);
	}
	return result.replaceAll("\r\n", "\n");
}
