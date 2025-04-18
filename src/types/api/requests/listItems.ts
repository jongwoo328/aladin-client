// Types for ListItems API
import { Cover, SearchTarget, SubSearchTarget } from "./common";
import { SearchOptResult } from "./searchItems";

export type ListQueryType =
	| "ItemNewAll"
	| "ItemNewSpecial"
	| "ItemEditorChoice"
	| "Bestseller"
	| "BlogBest";
export type ListItemRequestRaw = {
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
	outofStockFilter?: number;
	Year?: number;
	Month?: number;
	Week?: number;
	OptResult?: SearchOptResult[];
};
