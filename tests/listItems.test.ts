import { Aladin } from "../src";
import { ListBookItem } from "../src/types/api/responses/listItem";
import { isSuccess } from "../src/helper";

const { key } = require("./key.json");

describe("Aladin listItems", () => {
	let apiKey = "";

	beforeEach(() => {
		apiKey = key;
	});

	it("Simple list test", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItems<ListBookItem>({
			queryType: "ItemNewAll",
			searchTarget: "Book",
			version: "20131101",
		});

		if (!isSuccess(result)) {
			throw new Error("Result is not success");
		}
		expect(result.data.item).toBeInstanceOf(Array);
	});

	it("QueryType is required", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItems<ListBookItem>({
			queryType: null,
			searchTarget: "Book",
			version: "20131101",
		});

		expect(result.success).toEqual(false);
	});

	it("SearchTarget is required", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItems<ListBookItem>({
			queryType: "ItemNewAll",
			searchTarget: null,
			version: "20131101",
		});

		expect(result.success).toEqual(false);
	});

	it("Version is required", async () => {
		const aladin = new Aladin({ ttbKey: apiKey });

		const result = await aladin.listItems<ListBookItem>({
			queryType: "ItemNewAll",
			searchTarget: "Book",
			version: null,
		});

		expect(result.success).toEqual(false);
	});
});
