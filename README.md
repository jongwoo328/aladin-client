# aladin-client

> [!WARNING]
> **프로젝트 개발 및 유지보수 중단**
>
> [알라딘 OpenAPI 서비스 종료 공지](https://blog.aladin.co.kr/cscenter/17483675)에 따라 이 프로젝트의 개발 및 유지보수를 중단합니다.
>
> - 신규 OpenAPI 인증키 발급 종료: **2026년 9월 4일**
> - 기존 이용자 OpenAPI 서비스 종료: **2026년 10월 30일**
>

[알라딘 온라인 서점 API](https://www.aladin.co.kr/ttb/apiguide.aspx)를 JavaScript로 쉽게 사용할 수 있게 해주는 비공식 라이브러리입니다.

## 설치 방법
### npm
```bash
npm install aladin-client
```
### yarn
```bash
yarn add aladin-client
```
### pnpm
```bash
pnpm add aladin-client
```

## 기능
> 제공하는 메서드들은 OPEN API의 각 요청과 1:1 대응됩니다.
- 상품 검색 (ItemSearch.aspx)
- 상품 리스트 조회 (ItemList.aspx)
- 상품 조회 (ItemLookUp.aspx)
- 중고상품 보유 매장 검색 (ItemOffStoreList.aspx)

## 빠른 시작

```javascript
import { Aladin } from 'aladin-client'

// 클라이언트 초기화
const aladin = new Aladin({ttbKey: '<YOUR TTB KEY>'})

// 상품 검색
const searchResult = await aladin.searchItems({query: 'Harry Potter'})
if (searchResult.success) {
  console.log(searchResult.data)
} else {
  console.error(searchResult.error.message)
}

// 상품 리스트 조회
const listResult = await aladin.listItems({queryType: 'ItemNewAll', categoryId: 57923 })
if (listResult.success) {
  console.log(listResult.data)
} else {
  console.error(listResult.error.message)
}

// 상품 조회
const itemResult = await aladin.lookupItem({itemId: 343667067, itemIdType: 'ItemId'})
if (itemResult.success) {
  console.log(itemResult.data)
} else {
  console.error(itemResult.error.message)
}

// 중고상품 보유 매장 검색
const offStoreResult = await aladin.listItemOffStore({itemId:343667067 , itemIdType: "ItemId"})
if (offStoreResult.success) {
  console.log(offStoreResult.data)
} else {
  console.error(offStoreResult.error.message)
}
```

## API 문서
- 공식 설명은 [API 페이지](https://www.aladin.co.kr/ttb/apiguide.aspx?Version=20131101) 및 [문서](https://docs.google.com/document/d/1mX-WxuoGs8Hy-QalhHcvuV17n50uGI2Sg_GHofgiePE)에서 확인 가능합니다.
- 해당 라이브러리의 상세 API는 [API](docs/API.md) 페이지에서 확인 가능합니다.

## 개발 환경 설정
### 저장소 클론
```bash
# 저장소 클론
git clone https://github.com/username/aladin-client.git
cd aladin-client
```

### 의존성 설치
```bash
pnpm install
```

### 테스트 실행
테스트 실행을 위해 `tests/` 디렉토리에 `key.json` 파일을 `key.template.json` 형식에 맞게 생성하세요.
그 후,
```bash
pnpm test
```

### 빌드
```bash
pnpm build
```

### 코드 포맷
```bash
pnpm format
```

## 기여 방법

프로젝트 중단에 따라 신규 기능 개발 및 버그 수정 요청은 더 이상 받지 않습니다.

## 라이선스

이 프로젝트는 MIT 라이선스로 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

## 주의사항
1. KEY 필요 
    - 이 라이브러리를 사용하기 위해서는 알라딘 API 키가 필요합니다. 신규 키 발급은 2026년 9월 4일 종료되었으며, 기존 키도 2026년 10월 30일 서비스 종료 후에는 사용할 수 없습니다.
    - API 사용 시 알라딘의 이용 약관을 준수해야 합니다.
2. 비공식 라이브러리
    - 이 라이브러리는 알라딘 공식 라이브러리가 아닙니다. 따라서 알라딘 API의 변경에 따라 작동하지 않을 수 있습니다.
3. 타입스크립트 지원
    - 이 라이브러리는 타입스크립트를 지원합니다. 
    - 공식 API 문서가 정확하지 않은 점, 그리고 별도 협의로 제공되는 결과값은 테스트할 수 없어 타입이 완벽하지 않을 수 있습니다.
