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

export function parseToJson<T extends Record<string, unknown>>(raw: string): T {
	// 1. remove the semicolon at the end
	let jsonStr = raw.trim();
	if (jsonStr.endsWith(";")) {
		jsonStr = jsonStr.slice(0, -1);
	}

	// 2. replace \' with ' (except for the case where it is preceded by \\)
	jsonStr = jsonStr.replaceAll(/(^|[^\\])\\'/g, "$1'");

	// 3. replace \r\n with \n
	jsonStr = jsonStr.replaceAll(/\r\n/g, "\\n");

	return JSON.parse(jsonStr);
}
