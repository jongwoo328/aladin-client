import { Aladin, AladinErrorTypes, isSuccess } from "../src";
import { key } from "./key.json";

describe("Aladin lookupItem", () => {
	let apiKey = "";

	beforeEach(() => {
		apiKey = key;
	});

	it("lookup by ISBN13", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.lookupItem({
			itemId: "9791197903007",
			itemIdType: "ISBN13",
		});

		if (!isSuccess(result)) {
			throw new Error(result.error.message);
		}
		expect(result.success).toEqual(true);
	});

	it("lookup by ItemId", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.lookupItem({
			itemId: 343667067,
			itemIdType: "ItemId",
		});

		if (!isSuccess(result)) {
			throw new Error(result.error.message);
		}
		expect(result.success).toEqual(true);
	});

	it("lookup by ISBN", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.lookupItem({
			itemId: "K312932004",
			itemIdType: "ISBN",
		});

		if (!isSuccess(result)) {
			throw new Error(result.error.message);
		}
		expect(result.success).toEqual(true);
	});

	it("lookup with all optional parameters", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.lookupItem({
			itemId: 343667067,
			itemIdType: "ItemId",
			cover: "Small",
			version: "20131101",
			optResult: [
				"ebookList",
				"usedList",
				"fileFormatList",
				"c2binfo",
				"packaging",
				"b2bSupply",
				"subbarcode",
				"cardReviewImgList",
				"ratingInfo",
				"bestSellerRank",
				"previewImgList",
				"eventList",
				"authors",
				"reviewList",
				"fulldescription",
				"fulldescription2",
				"Toc",
				"Story",
				"categoryIdList",
				"mdrecommend",
				"phraseList",
			],
		});

		if (!isSuccess(result)) {
			throw new Error("Result is not success");
		}

		expect(result.success).toEqual(true);
	});

	it("should fail when itemId is missing", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.lookupItem({
			itemId: null as unknown as number,
		});

		expect(result.success).toEqual(false);
	});

	it("should fail with invalid ISBN", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.lookupItem({
			itemId: "&*(0000000000",
			itemIdType: "ISBN13",
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.type).toBe(AladinErrorTypes.ApiError);
		}
	});

	it("lookup with setTtbKey chaining", async () => {
		const result = await new Aladin({ ttbKey: "1" })
			.setTtbKey(apiKey)
			.lookupItem({
				itemId: "9791197903007",
				itemIdType: "ISBN13",
			});

		expect(isSuccess(result)).toBe(true);
	});

	it("lookup with offCode", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.lookupItem({
			itemId: 343667067,
			itemIdType: "ItemId",
			offCode: "J1311",
		});

		expect(isSuccess(result)).toBe(true);
	});

	it("lookup with custom partner", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.lookupItem({
			itemId: 343667067,
			itemIdType: "ItemId",
			partner: "testpartner",
		});

		expect(isSuccess(result)).toBe(true);
	});
});
