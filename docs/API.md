# API 상세
- [공통 반환 형식](#공통-반환-형식)
- [Aladin 클래스](#aladin)
  - [생성자](#시그니처)
  - [setTtbKey(ttbKey: string)](#setttbkeyttbkey-string-aladin)
  - [setPartner(partner: string)](#setpartnerpartner-string-aladin)
  - [searchItems(request)](#searchitemsrequest)
  - [listItems(request)](#listitemsrequest)
  - [lookupItem(request)](#lookupitemrequest)
  - [listItemOffStore(request)](#listitemoffstorerequest)

## Aladin
> Aladin 클래스는 알라딘 TTB(Open API)를 사용하기 위한 클라이언트를 초기화합니다. 생성자에는 API 인증을 위한 키와 (선택적으로)제휴사 ID를 전달해야 합니다. 

`Aladin` 클래스는 알라딘 TTB(Open API)를 사용하기 위한 클라이언트를 초기화합니다. 생성자에는 API 인증을 위한 키와(선택적으로) 제휴사 ID를 전달해야 합니다.

### 시그니처

```ts
new Aladin(config: { ttbKey: string; partner?: string });
```

### 매개변수

| 이름        | 타입        | 필수 여부 | 설명                                                     | 예시                |
|-----------|-----------|-------|--------------------------------------------------------|-------------------|
| `ttbKey`  | `string`  | ✅ 필수  | 알라딘에서 발급받은 TTB API 키입니다. API 요청의 인증에 사용됩니다.            | `"ttbexamplekey"` |
| `partner` | `string?` | ❌ 선택  | 제휴사 ID. 특정 파트너 연동 시 필요한 경우가 있으며 일반 사용자에게는 불필요할 수 있습니다. | `"myPartnerId"`   |

### 예외 처리

- `ttbKey`가 제공되지 않으면 예외가 발생합니다:

```ts
new Aladin({}) // ❌ Error: API key (ttbkey) is required
```
---

### `setTtbKey(ttbKey: string): Aladin`

API 키를 동적으로 변경합니다. 주로 다중 키 지원 또는 런타임 키 갱신 시 사용됩니다.

#### 매개변수

| 이름       | 타입       | 필수 여부 | 설명               | 예시            |
|----------|----------|-------|------------------|---------------|
| `ttbKey` | `string` | ✅ 필수  | 새로 설정할 TTB API 키 | `"newKey123"` |

#### 반환값

- 변경된 인스턴스를 반환하므로 체이닝이 가능합니다.

#### 예외

- 빈 문자열이나 falsy 값이 주어질 경우 예외 발생

```ts
aladin.setTtbKey("newKey").searchItems({ query: "..." })
```
---

### `setPartner(partner: string): Aladin`

제휴사 ID를 동적으로 설정합니다.

#### 매개변수

| 이름        | 타입       | 필수 여부 | 설명         | 예시              |
|-----------|----------|-------|------------|-----------------|
| `partner` | `string` | ✅ 필수  | 설정할 제휴사 ID | `"myPartnerId"` |

#### 반환값

- 변경된 인스턴스를 반환하므로 체이닝이 가능합니다.

#### 예외

- 빈 문자열 등 falsy 값이 주어질 경우 예외 발생

```ts
aladin.setPartner("myPartnerId").lookupItem({ itemId: 123 })
```
---

### `searchItems(request)`

알라딘 상품을 키워드로 검색합니다. `ItemSearch.aspx` API에 대응하는 메서드입니다.

#### 시그니처

```ts
searchItems(request: SearchItemRequest): Promise<AladinClientResponse<SearchItemResponse, AladinError>>
```

#### 매개변수

| 이름                    | 타입                | 필수 여부 | 설명                                                                                | 예시               |
|-----------------------|-------------------|-------|-----------------------------------------------------------------------------------|------------------|
| `query`               | `string`          | ✅ 필수  | 검색 키워드입니다.                                                                        | `"Harry Potter"` |
| `queryType`           | `string`          | ❌ 선택  | 검색 방식 지정. 기본값은 `"Keyword"`입니다. 가능한 값: `"Title"`, `"Author"`, `"Publisher"` 등      | `"Title"`        |
| `searchTarget`        | `string`          | ❌ 선택  | 검색 대상. 가능한 값: `"Book"`, `"Music"`, `"DVD"` 등                                      | `"Book"`         |
| `start`               | `number`          | ❌ 선택  | 검색 결과 시작 위치 (페이지네이션). 기본값은 1입니다.                                                  | `1`              |
| `maxResults`          | `number`          | ❌ 선택  | 최대 반환 항목 수. 기본값은 10이며, 최대 50까지 설정 가능합니다.                                          | `20`             |
| `sort`                | `string`          | ❌ 선택  | 정렬 기준. 가능한 값: `"Accuracy"`, `"PublishTime"`, `"SalesPoint"`, `"CustomerRating"` 등 | `"PublishTime"`  |
| `cover`               | `string`          | ❌ 선택  | 커버 이미지 크기. 가능한 값: `"Big"`, `"Mid"`, `"Small"`                                     | `"Big"`          |
| `categoryId`          | `number`          | ❌ 선택  | 특정 카테고리 ID를 지정합니다.                                                                | `50963`          |
| `partner`             | `string`          | ❌ 선택  | 제휴사 ID입니다.                                                                        | `"myPartnerId"`  |
| `includeKey`          | `string`          | ❌ 선택  | 결과에 포함할 추가 키를 지정합니다.                                                              | `"reviewRank"`   |
| `version`             | `string`          | ❌ 선택  | API 버전입니다. 기본값은 `"20131101"`입니다.                                                  | `"20131101"`     |
| `outOfStockFilter`    | `number` (0 또는 1) | ❌ 선택  | 품절 도서 제외 여부를 설정합니다. 1로 설정하면 품절 도서를 제외합니다.                                         | `1`              |
| `recentPublishFilter` | `number`          | ❌ 선택  | 최근 출간 도서만 포함합니다. 가능한 값: `30`, `90`, `180` (일 단위)                                  | `90`             |
| `optResult`           | `string`          | ❌ 선택  | 추가 옵션 결과를 지정합니다. 가능한 값: `"ebookList"`, `"usedList"` 등                             | `"usedList"`     |


#### 반환값

- `success: true`인 경우, `data` 필드에 검색 결과가 포함됩니다.
- `success: false`인 경우, `error` 객체가 포함됩니다.

#### 예외 케이스

- `query`가 없으면 `ValidationError`가 반환됩니다.
- 네트워크 오류, 파싱 오류, API 오류 발생 시 각각 대응하는 `AladinErrorTypes`으로 반환됩니다.

#### 사용 예제

```ts
const result = await aladin.searchItems({ query: "Harry Potter", maxResults: 5 });

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error.message);
}
```
---

### `listItems(request)`

특정 기준에 따라 상품 리스트를 조회합니다. `ItemList.aspx` API에 대응하는 메서드입니다. 신간, 베스트셀러, 유아 추천 도서 등 고정된 목록을 가져올 때 사용됩니다.

#### 시그니처

```ts
listItems(request: ListItemRequest): Promise<AladinClientResponse<ListItemResponse<ListItem>, AladinError>>
```

#### 매개변수

| 이름                 | 타입                | 필수 여부 | 설명                                                                     | 예시              |
|--------------------|-------------------|-------|------------------------------------------------------------------------|-----------------|
| `queryType`        | `string`          | ✅ 필수  | 조회할 리스트의 유형. 가능한 값: `"ItemNewSpecial"`, `"Bestseller"`, `"BlogBest"` 등 | `"ItemNewAll"`  |
| `categoryId`       | `number`          | ✅ 조건부 | 카테고리 ID. `searchTarget`가 없을 경우 필수입니다.                                  | `50963`         |
| `searchTarget`     | `string`          | ✅ 조건부 | 대상 자료 유형. `categoryId`가 없을 경우 필수입니다. 가능 값: `"Book"`, `"Music"` 등       | `"Book"`        |
| `subSearchTarget`  | `string`          | ❌ 선택  | 세부 자료 유형 (e.g. `"Foreign"` 외국도서 등)                                     | `"Foreign"`     |
| `start`            | `number`          | ❌ 선택  | 검색 결과 시작 위치 (기본값: 1)                                                   | `1`             |
| `maxResults`       | `number`          | ❌ 선택  | 최대 반환 항목 수 (기본값: 10, 최대: 50)                                           | `20`            |
| `cover`            | `string`          | ❌ 선택  | 커버 이미지 크기. `"Big"`, `"Mid"`, `"Small"` 중 선택                            | `"Mid"`         |
| `partner`          | `string`          | ❌ 선택  | 제휴사 ID.                                                                | `"myPartnerId"` |
| `includeKey`       | `string`          | ❌ 선택  | 결과에 포함할 추가 키                                                           | `"reviewRank"`  |
| `version`          | `string`          | ❌ 선택  | API 버전. 기본값은 `"20131101"`                                              | `"20131101"`    |
| `outOfStockFilter` | `number` (0 또는 1) | ❌ 선택  | 품절 도서 제외 여부                                                            | `1`             |
| `year`             | `number`          | ❌ 조건부 | 연간, 월간, 주간 리스트에서 필수 (e.g. `2024`)                                      | `2024`          |
| `month`            | `number`          | ❌ 조건부 | 월간 리스트 조회 시 필요                                                         | `4`             |
| `week`             | `number`          | ❌ 조건부 | 주간 리스트 조회 시 필요 (1~5)                                                   | `2`             |
| `optResult`        | `string`          | ❌ 선택  | 추가 옵션 결과 (`ebookList`, `usedList`, 등)                                  | `"usedList"`    |

> 🔎 `queryType`에 따라 `year`, `month`, `week`의 요구 여부가 달라지므로 주의 필요. 예: `"Bestseller"`는 `year/month/week` 필수.

#### 반환값

- `success: true`이면 `data` 필드에 상품 리스트가 포함됩니다.
- `success: false`이면 `error` 객체가 포함됩니다.

#### 예외 케이스

- `queryType`이 없으면 `ValidationError` 발생
- `categoryId`와 `searchTarget` 중 하나라도 없으면 `ValidationError`
- API 에러, 네트워크 오류, 파싱 오류 시 각각 해당 에러 타입 반환

#### 사용 예제

```ts
const result = await aladin.listItems({
  queryType: "ItemNewAll",
  categoryId: 50963,
  maxResults: 5
});

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error.message);
}
```
---

### `lookupItem(request)`

상품 ID를 기반으로 상세 정보를 조회합니다. `ItemLookUp.aspx` API에 대응하는 메서드입니다.

#### 시그니처

```ts
lookupItem(request: LookupItemRequest): Promise<AladinClientResponse<LookupItemResponse, AladinError>>
```

#### 매개변수

| 이름           | 타입               | 필수 여부 | 설명                                              | 예시                         |
|--------------|------------------|-------|-------------------------------------------------|----------------------------|
| `itemId`     | `number\|string` | ✅ 필수  | 조회할 상품의 ID입니다. `itemIdType`과 함께 사용됩니다.          | `12345678` or `'12345678'` |
| `itemIdType` | `string`         | ❌ 선택  | ID의 종류. 기본값은 `"ISBN"`이며, `"ItemId"`도 가능         | `"ItemId"`                 |
| `cover`      | `string`         | ❌ 선택  | 커버 이미지 크기. `"Big"`, `"Mid"`, `"Small"` 중 선택     | `"Big"`                    |
| `partner`    | `string`         | ❌ 선택  | 제휴사 ID. 클라이언트에서 기본값을 설정했어도 여기 값이 있으면 우선 적용됩니다.  | `"myPartnerId"`            |
| `includeKey` | `string`         | ❌ 선택  | 결과에 포함할 추가 필드. 예: `"usedList"`, `"ebookList"` 등 | `"usedList"`               |
| `offCode`    | `string`         | ❌ 선택  | 중고매장 코드. 지정 시 해당 매장에서의 중고 여부 확인 가능              | `"J1311"`                  |
| `optResult`  | `string`         | ❌ 선택  | 확장 결과 지정. 여러 값을 `,`로 구분하여 전달 가능                 | `"ebookList,usedList"`     |
| `version`    | `string`         | ❌ 선택  | API 버전. 기본값은 `"20131101"`                       | `"20131101"`               |

> 🔎 `itemIdType`을 지정하지 않으면 기본값은 `"ISBN"`으로 간주됩니다. 그러나 숫자 ID를 사용할 경우 반드시 `"ItemId"`로 지정해야 정확히 동작합니다.

#### 반환값

- `success: true`이면 `data` 필드에 해당 상품의 상세 정보가 포함됩니다.
- `success: false`이면 `error` 객체가 포함됩니다.

#### 예외 케이스

- `itemId`가 없으면 `ValidationError` 발생
- 알라딘 측 API 에러 또는 존재하지 않는 ID일 경우 `ApiError` 발생
- 네트워크 오류, 파싱 오류 발생 시 각각 해당 오류 타입으로 반환

#### 사용 예제

```ts
const result = await aladin.lookupItem({
  itemId: 343667067,
  itemIdType: "ItemId",
  includeKey: "usedList"
});

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error.message);
}
```
---

### `listItemOffStore(request)`

특정 상품의 중고 보유 매장 정보를 조회합니다. `ItemOffStoreList.aspx` API에 대응하는 메서드입니다.

#### 시그니처

```ts
listItemOffStore(request: ListItemOffStoreRequest): Promise<AladinClientResponse<ListItemOffStoreResponse, AladinError>>
```

#### 매개변수

| 이름           | 타입       | 필수 여부 | 설명                                              | 예시          |
|--------------|----------|-------|-------------------------------------------------|-------------|
| `itemId`     | `number` | ✅ 필수  | 조회할 상품의 ID. 보통 `ItemId` 타입으로 사용됩니다.             | `343667067` |
| `itemIdType` | `string` | ❌ 선택  | ID의 종류. 기본값은 `"ISBN"`. 숫자 기반이면 `"ItemId"` 지정 필요 | `"ItemId"`  |


#### 반환값

- `success: true`이면 `data` 필드에 중고 보유 매장 정보가 포함됩니다.
- `success: false`이면 `error` 객체가 포함됩니다.

#### 예외 케이스

- `itemId`가 없으면 `ValidationError` 발생
- 유효하지 않은 `itemId`일 경우 `ApiError` 반환
- 네트워크 오류, 파싱 오류가 발생할 경우 각각 해당 오류 타입으로 반환됨

#### 사용 예제

```ts
const result = await aladin.listItemOffStore({
  itemId: 343667067,
  itemIdType: "ItemId"
});

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error.message);
}
```
---

## 공통 반환 형식

모든 메서드는 다음과 같은 공통 구조의 `Promise`를 반환합니다:

```ts
type AladinClientResponse<T, E = AladinError> =
  | { success: true; data: T }
  | { success: false; error: E }
```

### 성공 시 (`success: true`)

| 필드     | 타입  | 설명                        |
|--------|-----|---------------------------|
| `data` | `T` | 각 API 응답에 해당하는 실제 데이터입니다. |

예시:
```ts
{
  success: true,
  data: {
    item: [...],
    totalResults: 30,
    ...
  }
}
```

### 실패 시 (`success: false`)

| 필드      | 타입            | 설명                                                               |
|---------|---------------|------------------------------------------------------------------|
| `error` | `AladinError` | 오류 정보가 담긴 객체입니다. 오류 타입별로 `type`, `message`, `raw` 등을 포함할 수 있습니다. |

예시:
```ts
{
  success: false,
  error: {
    type: "ApiError",
    message: "Error: 110 Invalid TTBKey",
    raw: { errorCode: 110, errorMessage: "Invalid TTBKey" }
  }
}
```
#### `AladinError` 구조

```ts
type AladinErrorTypes =
  | "ValidationError"   // 입력값 누락, 잘못된 파라미터
  | "NetworkError"      // fetch 실패 등 네트워크 문제
  | "ParseError"        // JSON 파싱 실패
  | "ApiError";         // 알라딘 서버가 반환한 오류

interface AladinError {
  type: AladinErrorTypes;
  message: string;
  raw?: unknown;
}
```

| 필드        | 타입                                                                          | 설명                                                                  | 예시                                                   |
|-----------|-----------------------------------------------------------------------------|---------------------------------------------------------------------|------------------------------------------------------|
| `type`    | `"ValidationError"`<br>`"NetworkError"`<br>`"ParseError"`<br>`"ApiError"` 등 | 오류의 유형을 나타냅니다. 오류의 발생 원인을 분류하는 데 사용됩니다.                             | `"ApiError"`                                         |
| `message` | `string`                                                                    | 사용자 또는 개발자가 읽을 수 있는 오류 메시지입니다.                                      | `"Query is required"`<br>`"Invalid TTBKey"`          |
| `raw`     | `unknown`                                                                   | 오류의 원시 데이터입니다. 에러 종류에 따라 없거나, `Error` 객체, API 오류의 경우 응답 객체 등이 담깁니다. | `{ errorCode: 110, errorMessage: "Invalid TTBKey" }` |
