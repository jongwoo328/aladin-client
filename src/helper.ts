import { AladinClientResponse } from "./types/lib";

export function isSuccess<T, E>(
	result: AladinClientResponse<T, E>,
): result is { success: true; data: T } {
	return result.success;
}
