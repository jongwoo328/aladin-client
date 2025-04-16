const { Aladin } = require("../src");
const { key } = require("./key.json");

describe("Aladin searchItems", () => {
	let apiKey = "";

	beforeEach(() => {
		apiKey = key;
	});

	it("Simple search test", async () => {
		const aladin = new Aladin(apiKey);

		const result = await aladin.searchItems({
			query: "AladinAPI",
		});

		expect(result).toBeDefined();
		expect(result.item).toBeInstanceOf(Array);
	});

	it("Query is required", async () => {
		const aladin = new Aladin(apiKey);

		await expect(
			aladin.searchItems({
				query: "",
			}),
		).rejects.toThrow();
	});
});
