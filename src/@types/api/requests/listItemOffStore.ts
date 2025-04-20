import type { ItemIdType } from "./lookupItem";

export type _ListItemOffStoreRequest = {
	ttbkey: string;
	ItemId: string | number;
	ItemIdType?: ItemIdType;
	InputEncoding: "utf-8";
	Output: "js";
};
