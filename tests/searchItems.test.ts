import { Aladin, AladinErrorTypes, isSuccess } from "../src";
import { key } from "./key.json";

describe("Aladin searchItems", () => {
	let apiKey = "";

	beforeEach(() => {
		apiKey = key;
	});

	it("should search items with basic keyword", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.searchItems({ query: "요리" });

		expect(isSuccess(result)).toBe(true);
		if (isSuccess(result)) {
			expect(result.data.item.length).toBeGreaterThan(0);
		}
	});

	it("should search items by author name", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.searchItems({
			query: "무라카미",
			queryType: "Author",
		});

		expect(isSuccess(result)).toBe(true);
	});

	it("should search items with categoryId", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.searchItems({
			query: "다이어트",
			categoryId: 53471, // 건강요리
		});

		expect(isSuccess(result)).toBe(true);
	});

	it("should sort results by title", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.searchItems({
			query: "채소",
			sort: "Title",
		});

		expect(isSuccess(result)).toBe(true);
	});

	it("should return big cover image", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.searchItems({
			query: "요리책",
			cover: "Big",
		});

		expect(isSuccess(result)).toBe(true);
	});

	it("should filter results published in last 90 days", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.searchItems({
			query: "비건",
			recentPublishFilter: 90,
		});

		expect(isSuccess(result)).toBe(true);
	});

	it("should include usedList in result", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.searchItems({
			query: "한식",
			optResult: ["usedList"],
		});

		expect(isSuccess(result)).toBe(true);
	});

	it("should fail when query is empty", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.searchItems({ query: "" });

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.type).toBe(AladinErrorTypes.ValidationError);
		}
	});
});
