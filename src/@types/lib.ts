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

export type ListItemRequest = {
	queryType: ListQueryType;
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
	year?: number;
	month?: number;
	week?: number;
	optResult?: SearchOptResultItem[];
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
export type AladinClientResponse<T, E> =
	| { success: true; data: T }
	| { success: false; error: E };
