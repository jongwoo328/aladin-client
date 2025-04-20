import type { Cover } from "./common";

export type LookupOptResultItem =
	| "ebookList"
	| "usedList"
	| "fileFormatList"
	| "c2binfo"
	| "packaging"
	| "b2bSupply"
	| "subbarcode"
	| "cardReviewImgList"
	| "ratingInfo"
	| "bestSellerRank"
	| "previewImgList"
	| "eventList"
	| "authors"
	| "reviewList"
	| "fulldescription"
	| "fulldescription2"
	| "Toc"
	| "Story"
	| "categoryIdList"
	| "mdrecommend"
	| "phraseList";
export type ItemIdType = "ISBN" | "ISBN13" | "ItemId";
export type _LookupItemRequest = {
	ttbkey: string;
	ItemId: number | string;
	ItemIdType?: ItemIdType;
	Cover?: Cover;
	Output: "js";
	Partner?: string;
	Version?: string;
	includeKey?: number;
	offCode?: string;
	OptResult?: LookupOptResultItem[];
};
