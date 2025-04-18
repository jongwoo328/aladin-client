export type ListItemSeriesInfo = {
	seriesId: number;
	seriesName: string;
	seriesLink: string;
};

export type ListDVDItem = {
	title: string;
	link: string;
	author: string;
	pubDate: string;
	description: string;
	isbn: string;
	isbn13: string;
	priceSales: number;
	priceStandard: number;
	mallType: "DVD";
	stockStatus: string;
	mileage: number;
	cover: string;
	categoryId: number;
	categoryName: string;
	publisher: string;
	adult: boolean;
	customerReviewRank: number;
	subInfo: null;
	itemId: number;
	salesPoint: number;
};
export type ListBookItem = {
	title: string;
	link: string;
	author: string;
	pubDate: string;
	description: string;
	isbn: string;
	isbn13: string;
	priceSales: number;
	priceStandard: number;
	mallType: "BOOK";
	stockStatus: string;
	mileage: number;
	cover: string;
	categoryId: number;
	categoryName: string;
	publisher: string;
	adult: boolean;
	fixedPrice: boolean;
	customerReviewRank: number;
	seriesInfo: ListItemSeriesInfo;
	subInfo: null;
	itemId: number;
	salesPoint: number;
};
export type ListMusicItem = {
	title: string;
	link: string;
	author: string;
	pubDate: string;
	description: string;
	isbn: string;
	isbn13: string;
	priceSales: number;
	priceStandard: number;
	mallType: "MUSIC";
	stockStatus: string;
	mileage: number;
	cover: string;
	categoryId: number;
	categoryName: string;
	publisher: string;
	adult: boolean;
	customerReviewRank: number;
	subInfo: null;
	itemId: number;
	seriesInfo: ListItemSeriesInfo;
	salesPoint: number;
};
export type ListEbookItem = {
	title: string;
	link: string;
	author: string;
	pubDate: string;
	description: string;
	isbn: string;
	isbn13: string;
	priceSales: number;
	priceStandard: number;
	mallType: "EBOOK";
	stockStatus: string;
	mileage: number;
	cover: string;
	categoryId: number;
	categoryName: string;
	publisher: string;
	salesPoint: number;
	adult: boolean;
	fixedPrice: boolean;
	customerReviewRank: number;
	seriesInfo: ListItemSeriesInfo;
	subInfo: {
		paperBookList: {
			itemId: number;
			isbn: string;
			isbn13: string;
			priceSales: number;
			link: string;
		}[];
	};
	itemId: number;
};
export type ListItem =
	| ListBookItem
	| ListDVDItem
	| ListMusicItem
	| ListEbookItem;
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
