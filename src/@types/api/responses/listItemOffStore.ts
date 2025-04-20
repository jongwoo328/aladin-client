export type ListItemOffStoreResponse = {
	version: string;
	link: string;
	pubDate: string;
	query: string;
	itemOffStoreList: Array<{
		offCode: string;
		offName: string;
		link: string;
	}>;
};
