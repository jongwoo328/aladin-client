import type {
	AladinClientResponse,
	ErrorResponse,
	ListItem,
	ListItemOffStoreRequest,
	ListItemRequest,
	ListItemResponse,
	LookupItemRequest,
	LookupItemResponse,
	SearchItemRequest,
	SearchItemResponse,
	_ListItemOffStoreRequest,
	_ListItemRequest,
	_LookupItemRequest,
	_SearchItemRequest,
} from "./@types";
import type { ListItemOffStoreResponse } from "./@types/api/responses/listItemOffStore";
import { type AladinError, AladinErrorTypes } from "./errors";
import { isNullish, parseToJson, stringifyValue } from "./util";

export class Aladin {
	private ttbKey: string;
	private partner?: string;
	private baseUrl = "https://www.aladin.co.kr/ttb/api";

	constructor(config: { ttbKey: string; partner?: string }) {
		if (!config.ttbKey) {
			throw new Error("API key (ttbkey) is required");
		}
		this.ttbKey = config.ttbKey;
		this.partner = config.partner;
	}

	setTtbKey(ttbKey: string): Aladin {
		if (!ttbKey) {
			throw new Error("ttbKey is required");
		}
		this.ttbKey = ttbKey;
		return this;
	}

	setPartner(partner: string): Aladin {
		if (!partner) {
			throw new Error("partner is required");
		}
		this.partner = partner;
		return this;
	}

	async searchItems(
		request: SearchItemRequest,
	): Promise<AladinClientResponse<SearchItemResponse, AladinError>> {
		if (!request.query) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.ValidationError,
					message: "Query is required",
				},
			};
		}

		const url = `${this.baseUrl}/ItemSearch.aspx`;
		const paramsData: _SearchItemRequest = {
			ttbkey: this.ttbKey,
			Query: request.query,
			Output: "js",
			InputEncoding: "utf-8",
		};
		if (this.partner) {
			paramsData.Partner = this.partner;
		}

		if (!isNullish(request.queryType)) {
			paramsData.QueryType = request.queryType;
		}
		if (!isNullish(request.searchTarget)) {
			paramsData.SearchTarget = request.searchTarget;
		}
		if (!isNullish(request.start)) {
			paramsData.Start = request.start;
		}
		if (!isNullish(request.maxResults)) {
			paramsData.MaxResults = request.maxResults;
		}
		if (!isNullish(request.sort)) {
			paramsData.Sort = request.sort;
		}
		if (!isNullish(request.cover)) {
			paramsData.Cover = request.cover;
		}
		if (!isNullish(request.categoryId)) {
			paramsData.CategoryId = request.categoryId;
		}
		if (!isNullish(request.partner)) {
			paramsData.Partner = request.partner;
		}
		if (!isNullish(request.includeKey)) {
			paramsData.includeKey = request.includeKey;
		}
		if (!isNullish(request.version)) {
			paramsData.Version = request.version;
		}
		if (!isNullish(request.outOfStockFilter)) {
			paramsData.outofStockfilter = request.outOfStockFilter;
		}
		if (!isNullish(request.recentPublishFilter)) {
			paramsData.RecentPublishFilter = request.recentPublishFilter;
		}
		if (!isNullish(request.optResult)) {
			paramsData.OptResult = request.optResult;
		}

		const params = new URLSearchParams(stringifyValue(paramsData));
		let response: Response;
		try {
			response = await fetch(`${url}?${params.toString()}`, {
				method: "GET",
			});
		} catch (e) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.NetworkError,
					message: e instanceof Error ? e.message : "Network error",
					raw: e,
				},
			};
		}

		let parsed: SearchItemResponse | ErrorResponse;
		const rawText = await response.text();
		try {
			parsed = parseToJson(rawText);
		} catch (e) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.ParseError,
					message: e instanceof Error ? e.message : "Parse error",
					raw: e,
				},
			};
		}

		if ("errorCode" in parsed) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.ApiError,
					message: `Error: ${parsed.errorCode} ${parsed.errorMessage}`,
					raw: parsed,
				},
			};
		}

		return { success: true, data: parsed };
	}

	async listItems(
		request: ListItemRequest,
	): Promise<AladinClientResponse<ListItemResponse<ListItem>, AladinError>> {
		if (!request.queryType) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.ValidationError,
					message: "QueryType is required",
				},
			};
		}
		if (!request.categoryId && !request.searchTarget) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.ValidationError,
					message: "CategoryId or SearchTarget is required",
				},
			};
		}

		const url = `${this.baseUrl}/ItemList.aspx`;
		const paramsData: _ListItemRequest = {
			ttbkey: this.ttbKey,
			QueryType: request.queryType,
			Output: "js",
			InputEncoding: "utf-8",
			Version: request.version ?? "20131101",
		};
		if (this.partner) {
			paramsData.Partner = this.partner;
		}

		if (!isNullish(request.searchTarget)) {
			paramsData.SearchTarget = request.searchTarget;
		}
		if (!isNullish(request.subSearchTarget)) {
			paramsData.SubSearchTarget = request.subSearchTarget;
		}
		if (!isNullish(request.start)) {
			paramsData.Start = request.start;
		}
		if (!isNullish(request.maxResults)) {
			paramsData.MaxResults = request.maxResults;
		}
		if (!isNullish(request.cover)) {
			paramsData.Cover = request.cover;
		}
		if (!isNullish(request.categoryId)) {
			paramsData.CategoryId = request.categoryId;
		}
		if (!isNullish(request.partner)) {
			paramsData.Partner = request.partner;
		}
		if (!isNullish(request.includeKey)) {
			paramsData.includeKey = request.includeKey;
		}
		if (!isNullish(request.version)) {
			paramsData.Version = request.version;
		}
		if (!isNullish(request.outOfStockFilter)) {
			paramsData.outofStockfilter = request.outOfStockFilter;
		}
		if (!isNullish(request.year)) {
			paramsData.Year = request.year;
		}
		if (!isNullish(request.month)) {
			paramsData.Month = request.month;
		}
		if (!isNullish(request.week)) {
			paramsData.Week = request.week;
		}
		if (!isNullish(request.optResult)) {
			paramsData.OptResult = request.optResult;
		}

		const params = new URLSearchParams(stringifyValue(paramsData));

		let response: Response;
		try {
			response = await fetch(`${url}?${params.toString()}`, {
				method: "GET",
			});
		} catch (e) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.NetworkError,
					message: e instanceof Error ? e.message : "Network error",
					raw: e,
				},
			};
		}

		let parsed: ListItemResponse<ListItem> | ErrorResponse;
		const rawText = await response.text();
		try {
			parsed = parseToJson(rawText);
		} catch (e) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.ParseError,
					message: e instanceof Error ? e.message : "Parse error",
					raw: e,
				},
			};
		}

		if ("errorCode" in parsed) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.ApiError,
					message: `Error: ${parsed.errorCode} ${parsed.errorMessage}`,
					raw: parsed,
				},
			};
		}
		return { success: true, data: parsed };
	}

	async lookupItem(
		request: LookupItemRequest,
	): Promise<AladinClientResponse<LookupItemResponse, AladinError>> {
		if (!request.itemId) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.ValidationError,
					message: "ItemId is required",
				},
			};
		}

		const url = `${this.baseUrl}/ItemLookUp.aspx`;
		const paramsData: _LookupItemRequest = {
			ttbkey: this.ttbKey,
			ItemId: request.itemId,
			Output: "js",
		};
		if (this.partner) {
			paramsData.Partner = this.partner;
		}

		if (!isNullish(request.itemIdType)) {
			paramsData.ItemIdType = request.itemIdType;
		}
		if (!isNullish(request.cover)) {
			paramsData.Cover = request.cover;
		}
		if (!isNullish(request.partner)) {
			paramsData.Partner = request.partner;
		}
		if (!isNullish(request.version)) {
			paramsData.Version = request.version;
		}
		if (!isNullish(request.includeKey)) {
			paramsData.includeKey = request.includeKey;
		}
		if (!isNullish(request.offCode)) {
			paramsData.offCode = request.offCode;
		}
		if (!isNullish(request.optResult)) {
			paramsData.OptResult = request.optResult;
		}

		const params = new URLSearchParams(stringifyValue(paramsData));

		let response: Response;
		try {
			response = await fetch(`${url}?${params.toString()}`, {
				method: "GET",
			});
		} catch (e) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.NetworkError,
					message: e instanceof Error ? e.message : "Network error",
					raw: e,
				},
			};
		}

		let parsed: LookupItemResponse | ErrorResponse;
		const rawText = await response.text();
		try {
			parsed = parseToJson(rawText);
		} catch (e) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.ParseError,
					message: e instanceof Error ? e.message : "Parse error",
					raw: e,
				},
			};
		}

		if ("errorCode" in parsed) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.ApiError,
					message: `Error: ${parsed.errorCode} ${parsed.errorMessage}`,
					raw: parsed,
				},
			};
		}

		return { success: true, data: parsed };
	}

	async listItemOffStore(
		request: ListItemOffStoreRequest,
	): Promise<AladinClientResponse<ListItemOffStoreResponse, AladinError>> {
		if (!request.itemId) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.ValidationError,
					message: "ItemId is required",
				},
			};
		}

		const url = `${this.baseUrl}/ItemOffStoreList.aspx`;
		const paramsData: _ListItemOffStoreRequest = {
			ttbkey: this.ttbKey,
			ItemId: request.itemId,
			Output: "js",
			InputEncoding: "utf-8",
		};

		if (!isNullish(request.itemIdType)) {
			paramsData.ItemIdType = request.itemIdType;
		}

		const params = new URLSearchParams(stringifyValue(paramsData));

		let response: Response;
		try {
			console.log(`${url}?${params.toString()}`);
			response = await fetch(`${url}?${params.toString()}`, {
				method: "GET",
			});
		} catch (e) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.NetworkError,
					message: e instanceof Error ? e.message : "Network error",
					raw: e,
				},
			};
		}

		let parsed: ListItemOffStoreResponse | ErrorResponse;
		const rawText = await response.text();
		console.log(rawText);
		console.log(rawText.includes("\r\n"));
		try {
			parsed = parseToJson(rawText);
		} catch (e) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.ParseError,
					message: e instanceof Error ? e.message : "Parse error",
					raw: e,
				},
			};
		}

		if ("errorCode" in parsed) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.ApiError,
					message: `Error: ${parsed.errorCode} ${parsed.errorMessage}`,
					raw: parsed,
				},
			};
		}

		return { success: true, data: parsed };
	}
}
