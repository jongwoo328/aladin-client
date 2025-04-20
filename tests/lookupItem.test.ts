import { Aladin, isSuccess } from "../src";
import { key } from "./key.json";

describe("Aladin lookupItem", () => {
	let apiKey = "";

	beforeEach(() => {
		apiKey = key;
	});

	it("Simple lookup test by ISBN13", async () => {
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

	it("Simple lookup test by itemId", async () => {
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

	it("Simple lookup test by ISBN", async () => {
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

	it("LookupItem test with full parameters", async () => {
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

	it("ItemId is required", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.lookupItem({
			itemId: null as unknown as number,
		});

		expect(result.success).toEqual(false);
	});
});
