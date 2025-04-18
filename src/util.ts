import { ErrorResponse } from "./types/api/responses";

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

export function isErrorObject(
	resp: Record<string, unknown>,
): resp is ErrorResponse {
	if (resp.errorCode && resp.errorMessage) {
		return true;
	}
	return false;
}

export function parseStringToBool(value: any): boolean {
	if (typeof value === "boolean") {
		return value;
	}
	if (typeof value === "string") {
		if (value === "true") {
			return true;
		} else if (value === "false") {
			return false;
		}
	}
	throw new Error(`Cannot convert ${value} to boolean`);
}
