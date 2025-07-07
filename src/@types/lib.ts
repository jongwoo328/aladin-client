import type {
	Cover,
	ListQueryType,
	SearchOptResultItem,
	SearchQueryType,
	SearchSort,
	SearchTarget,
	SubSearchTarget,
} from "./api";
import type { ItemIdType, LookupOptResultItem } from "./api";

type BestsellerDateFields =
	| { year: number; month: number; week: number }
	| { year?: undefined; month?: undefined; week?: undefined };

type BestsellerListItemRequest = {
	queryType: "Bestseller";
} & BestsellerDateFields & {
		version?: string;
		searchTarget?: SearchTarget;
		subSearchTarget?: SubSearchTarget;
		start?: number;
		maxResults?: number;
		cover?: Cover;
		categoryId?: number;
		partner?: string;
		includeKey?: number;
		outOfStockFilter?: number;
		optResult?: SearchOptResultItem[];
	};

type NonBestsellerListItemRequest = {
	queryType: Exclude<ListQueryType, "Bestseller">;
	version?: string;
	searchTarget?: SearchTarget;
	subSearchTarget?: SubSearchTarget;
	start?: number;
	maxResults?: number;
	cover?: Cover;
	categoryId?: number;
	partner?: string;
	includeKey?: number;
	outOfStockFilter?: number;
	optResult?: SearchOptResultItem[];
	year?: never;
	month?: never;
	week?: never;
};

export type ListItemRequest =
	| BestsellerListItemRequest
	| NonBestsellerListItemRequest;
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
	optResult?: SearchOptResultItem[];
};
export type LookupItemRequest = {
	itemId: number | string;
	itemIdType?: ItemIdType;
	cover?: Cover;
	partner?: string;
	version?: string;
	includeKey?: number;
	offCode?: string;
	optResult?: LookupOptResultItem[];
};
export type ListItemOffStoreRequest = {
	itemId: string | number;
	itemIdType?: ItemIdType;
};

export type AladinClientResponse<T, E> =
	| { success: true; data: T }
	| { success: false; error: E };
