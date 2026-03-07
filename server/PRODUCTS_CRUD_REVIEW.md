# 상품 CRUD 라우터 검토 결과

## 1. 라우트 구조

| 메서드 | 경로 | 컨트롤러 | 인증 | 설명 |
|--------|------|----------|------|------|
| GET | `/api/products` | getAll | 없음 | 전체 상품 목록 |
| GET | `/api/products/:id` | getById | 없음 | 단일 상품 조회 |
| POST | `/api/products` | create | requireAuth + requireAdmin | 상품 생성 |
| PUT | `/api/products/:id` | update | requireAuth + requireAdmin | 상품 수정 |
| DELETE | `/api/products/:id` | remove | requireAuth + requireAdmin | 상품 삭제 |

**라우트 순서**: `GET /` → `GET /:id` 순서가 올바름 (특정 경로가 먼저 와야 함)

---

## 2. 컨트롤러 검토

### Read (getAll)
- ✅ `Product.find().sort({ order: 1, createdAt: -1 })`
- ✅ 500 에러 처리

### Read (getById)
- ✅ `Product.findById(req.params.id)`
- ✅ 404 처리
- ✅ 잘못된 ObjectId 시 400 "잘못된 상품 ID입니다."

### Create
- ✅ name, price 필수 검증
- ✅ SKU unique 중복 시 400 + "이미 사용 중인 SKU입니다."
- ✅ 201 Created 반환

### Update
- ✅ `findByIdAndUpdate` + `$set` / `$unset`
- ✅ 404 처리
- ✅ SKU 중복 시 400 처리
- ✅ 잘못된 ObjectId 시 400 처리

### Delete (remove)
- ✅ `findByIdAndDelete`
- ✅ 404 처리
- ✅ 잘못된 ObjectId 시 400 처리

---

## 3. 클라이언트 API 매칭

| 클라이언트 | 서버 | 일치 |
|------------|------|------|
| `productApi.getAll()` → GET /products | getAll | ✅ |
| `productApi.getById(id)` → GET /products/:id | getById | ✅ |
| `productApi.create(data)` → POST /products | create | ✅ |
| `productApi.update(id, data)` → PUT /products/:id | update | ✅ |
| `productApi.delete(id)` → DELETE /products/:id | remove | ✅ |

---

## 4. 권한 정리

- **읽기 (getAll, getById)**: 인증 없음 → 메인 쇼핑 페이지에서 누구나 조회
- **쓰기 (create, update, delete)**: 관리자만 → requireAuth + requireAdmin

---

## 5. 적용된 개선 사항

- ✅ **ObjectId 유효성 검사**: getById, update, remove에서 잘못된 id 시 400 반환
