import { Aladin } from "../src";
import { isSuccess } from "../src/helper";
import { ListQueryType, SearchTarget } from "../src/types/api/requests";

const { key } = require("./key.json");

describe("Aladin listItems", () => {
	let apiKey = "";

	beforeEach(() => {
		apiKey = key;
	});

	it("Simple list test", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItems({
			queryType: "ItemNewAll",
			searchTarget: "eBook",
			version: "20131101",
			start: 3,
		});

		if (!isSuccess(result)) {
			throw new Error("Result is not success");
		}

		expect(result.success).toEqual(true);
		expect(result.data.item).toBeInstanceOf(Array);
	});

	it("ListItem test with full parameters", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItems({
			queryType: "ItemNewAll",
			searchTarget: "Book",
			subSearchTarget: "Book",
			start: 0,
			maxResults: 5,
			cover: "Small",
			version: "20131101",
			categoryId: 27660,
			partner: "test",
			includeKey: 1,
			outOfStockFilter: 1,
			year: 2025,
			month: 4,
			week: 1,
			optResult: ["ebookList"],
		});

		if (!isSuccess(result)) {
			throw new Error("Result is not success");
		}

		expect(result.success).toEqual(true);
		expect(result.data.item).toBeInstanceOf(Array);
	});

	it("QueryType is required", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItems({
			queryType: null as unknown as ListQueryType,
			searchTarget: "Book",
			version: "20131101",
		});

		expect(result.success).toEqual(false);
	});

	it("SearchTarget is required", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItems({
			queryType: "ItemNewAll",
			searchTarget: null as unknown as SearchTarget,
			version: "20131101",
		});

		expect(result.success).toEqual(false);
	});

	it("Version is required", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItems({
			queryType: "ItemNewAll",
			searchTarget: "Book",
			version: null as unknown as string,
		});

		expect(result.success).toEqual(false);
	});
});
