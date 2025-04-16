import {
	SearchItemRequestRaw,
	SearchItemRequest,
	SearchItemRequestRawBuilder,
} from "./request";
import { stringifyValue, trimEndSemiColon } from "./util";
import { ErrorResponse, SearchItemResponse } from "./response";

export class Aladin {
	key: string;
	baseUrl = "http://www.aladin.co.kr/ttb/api";

	constructor(key: string) {
		if (!key) {
			throw new Error("API key (TTBKey) is required");
		}
		this.key = key;
	}

	async searchItems(
		searchRequest: SearchItemRequest,
	): Promise<SearchItemResponse> {
		const url = `${this.baseUrl}/itemSearch.aspx`;
		const paramsData: SearchItemRequestRaw =
			SearchItemRequestRawBuilder.fromRequest(searchRequest)
				.withKey(this.key)
				.build();
		const params = new URLSearchParams(stringifyValue(paramsData));
		const r = await fetch(`${url}?${params.toString()}`, {
			method: "GET",
		});

		return r
			.text()
			.then(trimEndSemiColon)
			.then((text): SearchItemResponse | ErrorResponse => {
				return JSON.parse(text);
			})
			.then((resp) => {
				if ("errorCode" in resp) {
					throw new Error(`Error: ${resp.errorCode} ${resp.errorMessage}`);
				}
				return resp;
			});
	}
}
