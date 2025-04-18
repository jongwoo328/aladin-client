import {
	Cover,
	ListQueryType,
	SearchOptResult,
	SearchQueryType,
	SearchSort,
	SearchTarget,
	SubSearchTarget,
} from "./api/requests";

export type ListItemRequest = {
	queryType: ListQueryType;
	version: string;
	searchTarget?: SearchTarget;
	subSearchTarget?: SubSearchTarget;
	start?: number;
	maxResults?: number;
	cover?: Cover;
	categoryId?: number;
	partner?: string;
	includeKey?: number;
	outOfStockFilter?: number;
	year?: number;
	month?: number;
	week?: number;
	optResult?: SearchOptResult[];
};
export type SearchItemRequest = {
	query: string;
	queryType?: SearchQueryType;
	searchTarget?: SearchTarget;
	start?: number;
	maxResults?: number;
	sort?: SearchSort;
	cover?: Cover;
	categoryId?: number;
	partner?: string;
	includeKey?: number;
	version?: string;
	outOfStockFilter?: number;
	recentPublishFilter?: number;
	optResult?: SearchOptResult[];
};
export type AladinClientResponse<T, E> =
	| { success: true; data: T }
	| { success: false; error: E };
