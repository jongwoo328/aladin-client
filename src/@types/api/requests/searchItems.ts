import type { Cover, SearchTarget } from "./common";

export type SearchQueryType = "Keyword" | "Title" | "Author" | "Publisher";
export type SearchSort =
	| "Accuracy"
	| "PublishTime"
	| "Title"
	| "SalesPoint"
	| "CustomerRating"
	| "MyReviewCount";
export type SearchOptResultItem = "ebookList" | "usedList" | "fileFormatList";
export type _SearchItemRequest = {
	ttbkey: string;
	Query: string;
	QueryType?: SearchQueryType;
	SearchTarget?: SearchTarget;
	Start?: number;
	MaxResults?: number;
	Sort?: SearchSort;
	Cover?: Cover;
	CategoryId?: number;
	Output?: "js";
	Partner?: string;
	includeKey?: number;
	InputEncoding?: "utf-8";
	Version?: string;
	outofStockfilter?: number;
	RecentPublishFilter?: number;
	OptResult?: SearchOptResultItem[];
};
