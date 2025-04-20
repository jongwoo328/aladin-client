import { Aladin, isSuccess } from "../src";

import { key } from "./key.json";

describe("Aladin listItemOffStore", () => {
	let apiKey = "";

	beforeEach(() => {
		apiKey = key;
	});

	it("Simple list test", async () => {
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
});
