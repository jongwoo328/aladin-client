import { Aladin } from "../src";
import { isSuccess } from "../src/helper";
import { key } from "./key.json";

describe("Aladin lookupItem", () => {
	let apiKey = "";

	beforeEach(() => {
		apiKey = key;
	});

	it("Simple lookup test", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.lookupItem({
			itemId: 106319298,
			itemIdType: "ItemId",
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
