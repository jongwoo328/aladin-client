import { isSuccess } from "../src/helper";

import { Aladin } from "../src";
import { key } from "./key.json";

describe("Aladin searchItems", () => {
	let apiKey = "";

	beforeEach(() => {
		apiKey = key;
	});

	it("Simple search test", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.searchItems({
			query: "love",
			searchTarget: "Book",
		});

		if (!isSuccess(result)) {
			throw new Error("Result is not success");
		}
		expect(result.success).toEqual(true);
		expect(result.data.item).toBeInstanceOf(Array);
	});

	it("SearchItems test with full parameters", async () => {
		const alain = new Aladin({ ttbKey: apiKey });

		const result = await alain.searchItems({
			query: "hello",
			queryType: "Title",
			searchTarget: "Book",
			start: 1,
			maxResults: 3,
			sort: "Title",
			cover: "Small",
			categoryId: 27660,
			partner: "test",
			includeKey: 1,
			outOfStockFilter: 1,
			recentPublishFilter: 1,
			optResult: [],
		});

		if (!isSuccess(result)) {
			throw new Error("Result is not success");
		}
		expect(result.success).toEqual(true);
		expect(result.data.item).toBeInstanceOf(Array);
	});

	it("Query is required", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.searchItems({
			query: "",
		});

		expect(result.success).toEqual(false);
	});
});
