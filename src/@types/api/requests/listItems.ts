import type { Cover, SearchTarget, SubSearchTarget } from "./common";
import type { SearchOptResultItem } from "./searchItems";

export type ListQueryType =
	| "ItemNewAll"
	| "ItemNewSpecial"
	| "ItemEditorChoice"
	| "Bestseller"
	| "BlogBest";
export type _ListItemRequest = {
	ttbkey: string;
	QueryType: ListQueryType;
	SearchTarget?: SearchTarget;
	SubSearchTarget?: SubSearchTarget;
	Start?: number;
	MaxResults?: number;
	Cover?: Cover;
	CategoryId?: number;
	Output?: "js";
	Partner?: string;
	includeKey?: number;
	InputEncoding?: "utf-8";
	Version?: string;
	outofStockfilter?: number;
	Year?: number;
	Month?: number;
	Week?: number;
	OptResult?: SearchOptResultItem[];
};
