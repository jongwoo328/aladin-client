import {
	Aladin,
	AladinErrorTypes,
	type ListQueryType,
	type SearchTarget,
	isSuccess,
} from "../src";

import { key } from "./key.json";

describe("Aladin listItems", () => {
	let apiKey = "";

	beforeEach(() => {
		apiKey = key;
	});

	it("should list newly released eBooks", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItems({
			queryType: "ItemNewAll",
			searchTarget: "eBook",
			version: "20131101",
		});

		if (!isSuccess(result)) {
			throw new Error(result.error.message);
		}
		expect(result.success).toEqual(true);
		expect(result.data.item).toBeInstanceOf(Array);
	});

	it("should list books with all optional parameters", async () => {
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

	it("should fail when queryType is missing", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItems({
			queryType: null as unknown as ListQueryType,
			searchTarget: "Book",
			version: "20131101",
		});

		expect(result.success).toEqual(false);
	});

	it("should fail when searchTarget is missing", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItems({
			queryType: "ItemNewAll",
			searchTarget: null as unknown as SearchTarget,
			version: "20131101",
		});

		expect(result.success).toEqual(false);
	});

	it("should list weekly bestsellers in a category", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItems({
			queryType: "Bestseller",
			categoryId: 50963, // 예: 소설
			year: 2025,
			month: 4,
			week: 2,
		});

		expect(isSuccess(result)).toBe(true);
	});

	it("should handle invalid categoryId gracefully", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItems({
			queryType: "ItemNewAll",
			categoryId: 99999999,
			searchTarget: "Book",
		});

		expect(isSuccess(result)).toBe(false);
		if (!isSuccess(result)) {
			expect(result.error.type).toBe(AladinErrorTypes.ApiError);
		}
	});

	it("should return only one result with maxResults = 1", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItems({
			queryType: "ItemNewAll",
			searchTarget: "Book",
			maxResults: 1,
		});

		expect(isSuccess(result)).toBe(true);
		if (isSuccess(result)) {
			expect(result.data.item.length).toBeLessThanOrEqual(1);
		}
	});

	it("should list items with setPartner chaining", async () => {
		const aladin = new Aladin({ ttbKey: apiKey }).setPartner("testPartner");

		const result = await aladin.listItems({
			queryType: "ItemNewAll",
			searchTarget: "Book",
			version: "20131101",
		});

		expect(isSuccess(result)).toBe(true);
	});
});
