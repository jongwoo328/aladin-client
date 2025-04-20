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

	// 2. Replace \' with ' — but only when not preceded by a backslash (i.e., ignore \\\')
	// RegExp explanation:
	// 1. (^|[^\\]) — capture group 1:
	//     - either the beginning of the string (^)
	//     - or any character that is not a backslash ([^\\])
	// 2. \\' — matches a backslash followed by a single quote
	// Replace with: group 1 (the safe context) + single quote
	// Effect: unescapes \' → ', except when it's actually an escaped backslash like \\\'
	jsonStr = jsonStr.replaceAll(/(^|[^\\])\\'/g, "$1'");

	// 3. normalize new lines in string value
	// Regular expression explanation:
	// 1. " — matches the opening double quote of the string literal
	// 2. (?:[^\\"]|\\.)* — matches the content inside the string:
	//     - [^\\"]: any character except backslash or double quote
	//     - \\.   : any escaped character (e.g., \n, \", \\)
	// 3. " — matches the closing double quote
	// Result: matches a full double-quoted string literal, including its content and escape sequences
	jsonStr = jsonStr.replace(/"(?:[^\\"]|\\.)*"/g, (match) =>
		match.replace(/\r\n/g, "\\n"),
	);

	return JSON.parse(jsonStr);
}
