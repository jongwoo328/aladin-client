export const AladinErrorTypes = {
	ValidationError: "ValidationError",
	ApiError: "ApiError",
	ParseError: "ParseError",
	NetworkError: "NetworkError",
} as const;

export type AladinErrorType =
	(typeof AladinErrorTypes)[keyof typeof AladinErrorTypes];
export type AladinError = {
	type: AladinErrorType;
	message: string;
	raw?: unknown;
};
