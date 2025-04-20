/** Aladin API responses are not always valid JSON.
 * Sometimes they are JavaScript object literals.
 * Thus, we need to preprocess the responses to ensure they become valid JSON.
 */
import { parseToJson } from "../src/util";

describe("parseToJson tests", () => {
	it("remove semicolon at the end", () => {
		const raw = `{"key": "value"};`;
		expect(parseToJson(raw)).toEqual({ key: "value" });
	});

	it("replace escaped single quote", () => {
		const raw = `{"key": "\'This\' is test value"};`;
		expect(parseToJson(raw)).toEqual({ key: "'This' is test value" });
	});

	it("replace CR + LF to LF ", () => {
		const raw = `{"key": "This\r\n is test value\r\n"};`;
		expect(parseToJson(raw)).toEqual({ key: "This\n is test value\n" });
	});
});
