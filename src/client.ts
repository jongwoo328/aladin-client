import {
	isErrorObject,
	isNullish,
	parseStringToBool,
	stringifyValue,
} from "./util";
import { SearchItemRequestRaw } from "./types/api/requests";
import { ErrorResponse, SearchItemResponse } from "./types/api/responses";
import { ListItemRequestRaw } from "./types/api/requests/listItems";
import { ListItem, ListItemResponse } from "./types/api/responses/listItem";
import {
	AladinClientResponse,
	ListItemRequest,
	SearchItemRequest,
} from "./types/lib";
import { AladinError, AladinErrorTypes } from "./errors";
import { XMLParser } from "fast-xml-parser";

export class Aladin {
	ttbKey: string;
	partner?: string;
	baseUrl = "https://www.aladin.co.kr/ttb/api";

	constructor(config: { ttbKey: string; partner?: string }) {
		if (!config.ttbKey) {
			throw new Error("API key (ttbkey) is required");
		}
		this.ttbKey = config.ttbKey;
		this.partner = config.partner;
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
		const paramsData: SearchItemRequestRaw = {
			ttbkey: this.ttbKey,
			Query: request.query,
			Output: "xml",
			InputEncoding: "utf-8",
		};
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
		const xmlParser = new XMLParser({
			ignoreAttributes: (attrName) => {
				return attrName !== "itemId";
			},
			isArray: (name) => {
				return name === "item";
			},
			attributeNamePrefix: "",
			parseTagValue: false,
			parseAttributeValue: false,
		});
		try {
			const rawText = await response.text();
			parsed = xmlParser.parse(rawText).object;
			if (!isErrorObject(parsed)) {
				if (!parsed.item) {
					parsed.item = [];
				}
				parsed.totalResults = Number(parsed.totalResults);
				parsed.startIndex = Number(parsed.startIndex);
				parsed.itemsPerPage = Number(parsed.itemsPerPage);
				parsed.searchCategoryId = Number(parsed.searchCategoryId);
				parsed.item.forEach((item) => {
					item.priceSales = Number(item.priceSales);
					item.priceStandard = Number(item.priceStandard);
					item.mileage = Number(item.mileage);
					item.categoryId = Number(item.categoryId);
					item.customerReviewRank = Number(item.customerReviewRank);
					item.itemId = Number(item.itemId);
				});
			}
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
		if (!request.version) {
			return {
				success: false,
				error: {
					type: AladinErrorTypes.ValidationError,
					message: "Version is required",
				},
			};
		}

		const url = `${this.baseUrl}/ItemList.aspx`;
		const paramsData: ListItemRequestRaw = {
			ttbkey: this.ttbKey,
			QueryType: request.queryType,
			Output: "xml",
			InputEncoding: "utf-8",
		};
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

		let parsed: ListItemResponse<ListItem> | ErrorResponse;
		const xmlParser = new XMLParser({
			attributeNamePrefix: "",
			ignoreAttributes: (attrName) => {
				return attrName !== "itemId";
			},
			isArray: (name) => {
				return (
					name === "item" || name === "paperBookList" || name === "paperBook"
				);
			},
			parseTagValue: false,
			parseAttributeValue: false,
		});
		try {
			const rawText = await response.text();
			parsed = xmlParser.parse(rawText).object;
			if (!isErrorObject(parsed)) {
				if (!parsed.item) {
					parsed.item = [];
				}
				parsed.totalResults = Number(parsed.totalResults);
				parsed.startIndex = Number(parsed.startIndex);
				parsed.itemsPerPage = Number(parsed.itemsPerPage);
				parsed.searchCategoryId = Number(parsed.searchCategoryId);
				parsed.item.map((item) => {
					item.priceSales = Number(item.priceSales);
					item.priceStandard = Number(item.priceStandard);
					item.mileage = Number(item.mileage);
					item.categoryId = Number(item.categoryId);
					item.customerReviewRank = Number(item.customerReviewRank);
					item.itemId = Number(item.itemId);
					item.adult = parseStringToBool(item.adult);
					if ("salesPoint" in item) {
						item.salesPoint = Number(item.salesPoint);
					}
					if ("fixedPrice" in item) {
						item.fixedPrice = parseStringToBool(item.fixedPrice);
					}
					if ("seriesInfo" in item && typeof item.seriesInfo === "object") {
						item.seriesInfo.seriesId = Number(item.seriesInfo.seriesId);
					}
					if ("subInfo" in item) {
						if (!item.subInfo) {
							item.subInfo = null;
						} else if ("paperBookList" in item.subInfo) {
							if (!item.subInfo.paperBookList) {
								item.subInfo.paperBookList = [];
							} else {
								item.subInfo.paperBookList = item.subInfo.paperBookList
									// @ts-ignore
									.flatMap((entry) => entry.paperBook)
									.map((paperBook) => {
										return {
											itemId: Number(paperBook.itemId),
											isbn: paperBook.isbn,
											isbn13: paperBook.isbn13,
											priceSales: Number(paperBook.priceSales),
											link: paperBook.link,
										};
									});
							}
						}
					}
				});
			}
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
