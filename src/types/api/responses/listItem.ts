export type ListItemSeriesInfo = {
	seriesId: number;
	seriesName: string;
	seriesLink: string;
};

export type ListItemSubInfo = {
	eBookList?: unknown[]
	usedList?: unknown[]
	newBookList?: unknown[]
	paperBookList?: unknown[]
}

export type ListItem = {
	title: string;
	link: string;
	author: string;
	pubDate: string;
	description: string;
	isbn: string;
	isbn13: string;
	priceSales: number;
	priceStandard: number;
	mallType: "BOOK" | "DVD" | "MUSIC" | "EBOOK" | "FOREIGN" | "USED";
	stockStatus: string;
	mileage: number;
	cover: string;
	categoryId: number;
	categoryName: string;
	publisher: string;
	salesPoint: number;
	adult: boolean;
	fixedPrice?: boolean;
	customerReviewRank: number;
	bestDuration?: string;
	baseRank?: number;
	seriesInfo?: ListItemSeriesInfo;
	subInfo?: ListItemSubInfo;
	itemId: number;
}

export type ListItemResponse<T> = {
	title: string;
	link: string;
	logo: string;
	pubDate: string;
	totalResults: number;
	startIndex: number;
	itemsPerPage: number;
	query: string;
	version: string;
	searchCategoryId: number;
	searchCategoryName: string;
	item: T[];
};
