import {
	Aladin,
	AladinErrorTypes,
	type ListItemOffStoreRequest,
	isSuccess,
} from "../src";

import { key } from "./key.json";

describe("Aladin listItemOffStore", () => {
	let apiKey = "";

	beforeEach(() => {
		apiKey = key;
	});

	it("should list used stores for a valid itemId", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItemOffStore({
			itemId: 343667067,
			itemIdType: "ItemId",
		});

		if (!isSuccess(result)) {
			throw new Error(result.error.message);
		}
		expect(result.success).toEqual(true);
	});

	it("should return empty or fail for non-existent itemId", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItemOffStore({
			itemId: 999999999, // 존재하지 않는 ID일 가능성 높음
			itemIdType: "ItemId",
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.type).toBe(AladinErrorTypes.ApiError);
		}
	});

	it("should fail when itemId is missing", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItemOffStore(
			{} as unknown as ListItemOffStoreRequest,
		);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.type).toBe(AladinErrorTypes.ValidationError);
		}
	});
});
