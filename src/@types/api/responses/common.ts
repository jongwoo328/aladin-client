export type ErrorResponse = {
	errorCode: number;
	errorMessage: string;
};

export type EbookListItem = {
	itemId: string;
	isbn: string;
	isbn13: string;
	priceSales: number;
	link: string;
};
export type UsedList = {
	aladinUsed: {
		itemCount: number;
		minPrice: number;
		link: string;
	};
	userUsed: {
		itemCount: number;
		minPrice: number;
		link: string;
	};
	spaceUsed: {
		itemCount: number;
		minPrice: number;
		link: string;
	};
};
export type UsedType = "aladinUsed" | "userUsed" | "spaceUsed";
export type NewBookListItem = {
	itemId: number;
	isbn: string;
	isbn13: string;
	priceSales: number;
	link: string;
};
export type PaperBookListItem = {
	itemId: number;
	isbn: string;
	priceSales: number;
	link: string;
};
export type FileFormatListItem = {
	fileType: string;
	fileSize: number;
};
