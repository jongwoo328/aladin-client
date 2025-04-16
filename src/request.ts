export type SearchQueryType = "Keyword" | "Title" | "Author" | "Publisher";
export type SearchSearchTarget =
	| "Book"
	| "Foreign"
	| "Music"
	| "DVD"
	| "Used"
	| "eBook"
	| "All";
export type SearchSort =
	| "Accuracy"
	| "PublishTime"
	| "Title"
	| "SalesPoint"
	| "CustomerRating"
	| "MyReviewCount";
export type SearchCover = "Big" | "MidBig" | "Mid" | "Small" | "Mini" | "None";
export type SearchOptResult = "ebookList" | "usedList" | "fileFormatList";

export type SearchItemRequest = {
	query: string;
	queryType?: SearchQueryType;
	searchTarget?: SearchSearchTarget;
	start?: number;
	maxResults?: number;
	sort?: SearchSort;
	cover?: SearchCover;
	categoryId?: number;
	partner?: string;
	includeKey?: number;
	version?: number;
	outOfStockFilter?: number;
	recentPublishFilter?: number;
	optResult?: SearchOptResult[];
};

export type SearchItemRequestRaw = {
	ttbKey: string;
	Query: string;
	QueryType?: SearchQueryType;
	SearchTarget?: SearchSearchTarget;
	Start?: number;
	MaxResults?: number;
	Sort?: SearchSort;
	Cover?: SearchCover;
	CategoryId?: number;
	Output?: "js";
	Partner?: string;
	includeKey?: number;
	InputEncoding?: "utf-8";
	Version?: number;
	outofStockFilter?: number;
	RecentPublishFilter?: number;
	OptResult?: SearchOptResult[];
};

export class SearchItemRequestRawBuilder {
	private ttbKey: string = "";
	private data: SearchItemRequestRaw;

	constructor(ttbKey?: string) {
		if (ttbKey) {
			this.ttbKey = ttbKey;
		}
		this.data = {
			ttbKey: this.ttbKey,
			Query: "",
			Output: "js",
			InputEncoding: "utf-8",
		};
	}

	public withKey(ttbKey: string): SearchItemRequestRawBuilder {
		this.data.ttbKey = ttbKey;
		return this;
	}

	public build(): SearchItemRequestRaw {
		return this.data;
	}

	public static fromRequest(
		request: SearchItemRequest,
	): SearchItemRequestRawBuilder {
		const builder = new SearchItemRequestRawBuilder();
		builder.data.Query = request.query;
		if (request.queryType) {
			builder.data.QueryType = request.queryType;
		}
		if (request.searchTarget) {
			builder.data.SearchTarget = request.searchTarget;
		}
		if (request.start) {
			builder.data.Start = request.start;
		}
		if (request.maxResults) {
			builder.data.MaxResults = request.maxResults;
		}
		if (request.sort) {
			builder.data.Sort = request.sort;
		}
		if (request.cover) {
			builder.data.Cover = request.cover;
		}
		if (request.categoryId) {
			builder.data.CategoryId = request.categoryId;
		}
		if (request.partner) {
			builder.data.Partner = request.partner;
		}
		if (request.includeKey) {
			builder.data.includeKey = request.includeKey;
		}
		if (request.version) {
			builder.data.Version = request.version;
		}
		if (request.outOfStockFilter) {
			builder.data.outofStockFilter = request.outOfStockFilter;
		}
		if (request.recentPublishFilter) {
			builder.data.RecentPublishFilter = request.recentPublishFilter;
		}
		return builder;
	}
}
