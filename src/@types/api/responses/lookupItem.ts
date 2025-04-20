import type {
	EbookListItem,
	FileFormatListItem,
	NewBookListItem,
	PaperBookListItem,
	UsedList,
	UsedType,
} from "./common";

export type LookupItemSubInfo = {
	subTitle: string;
	originalTitle: string;
	itemPage: number;
	cardReviewImgList?: string[];
	ratingInfo?: {
		ratingScore: number;
		ratingCount: number;
		commentReviewCount: number;
		myReviewCount: 105;
	};
	subBarcode?: string;
	c2bsales?: number;
	c2bsales_price?: {
		AA: number;
		A: number;
		B: number;
		C: number;
	};
	usedType?: UsedType;
	fileFormatList?: FileFormatListItem[];
	b2bSupply?: boolean;
	eBookList?: EbookListItem[];
	usedList?: UsedList;
	newBookList?: NewBookListItem[];
	paperBookList?: PaperBookListItem[];
	taxFree?: boolean;
	toc?: string;
	previewImgList?: string[];
	authors?: Array<{
		authorId: number;
		authorName: string;
		authorType?: string;
		authorTypeDesc?: string;
		authorInfo?: string;
		authroInfoLink?: string;
	}>;
	catno?: string;
	recommendationComment?: string;
	specialFeature?: string;
	story?: string;
	disc?: number;
	playtime?: string;
	language?: string;
	caption?: string;
	screenrate?: string;
	recordingtype?: string;
	areacode?: number;
	eventList?: Array<{
		title: string;
		link: string;
	}>;
	reviewList?: Array<{
		reviewRank: number;
		writer: string;
		link: string;
		title: string;
	}>;
	packing?: {
		styleDesc: string;
		weight: number;
		sizeDepth: number;
		sizeHeight: number;
		sizeWidth: number;
	};
	phraseList?: Array<{
		pageNo: string;
		phrase: string;
	}>;
	mdRecommendList: Array<{
		title: string;
		comment: string;
		mdName: string;
	}>;
	offStoreInfo?: Array<{
		offCode: string;
		offName: string;
		link: string;
		hasStock: boolean;
		maxPrice: number;
		minPrice: number;
		location: string;
	}>;
};
export type LookupItem = {
	title: string;
	link: string;
	author: string;
	pubDate: string;
	description: string;
	fullDescription?: string;
	fullDescription2?: string;
	isbn: string;
	isbn13: string;
	itemId: number;
	priceSales: number;
	priceStandard: number;
	mallType: "BOOK" | "DVD" | "MUSIC" | "EBOOK" | "FOREIGN" | "USED";
	stockStatus: string;
	mileage: number;
	cover: string;
	categoryId: number;
	publisher: string;
	salesPoint: number;
	adult: boolean;
	fixedPrice: boolean;
	customerReviewRank: number;
	subInfo: LookupItemSubInfo;
	categoryIdList?: Array<{
		categoryId: number;
		categoryName: string;
	}>;
	bestSellerRank?: string;
	bestRank?: number;
	bestDuration?: string;
};
export type LookupItemResponse = {
	version: string;
	logo?: string;
	title: string;
	link: string;
	pubDate: string;
	imageUrl: string;
	totalResults: number;
	startIndex: number;
	itemsPerPage: number;
	query: string;
	searchCategoryId: number;
	searchCategoryName: string;
	item: LookupItem[];
};
