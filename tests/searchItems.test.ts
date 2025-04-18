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
			query: "hello",
			searchTarget: "Music",
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
