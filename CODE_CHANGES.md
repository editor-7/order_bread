# 코드 수정 내역 (학습용)

이 문서는 프로젝트에서 수정된 주요 코드를 정리한 것입니다.

---

## 1. 상품 수정 기능 (AdminPage)

### 수정 전
```javascript
// 수정 후 폼 초기화
setEditingId(null)
setProductForm({ name: '', desc: '', ... })
loadProducts()
```

### 수정 후
```javascript
// 수정 후에도 편집 모드 유지 - 폼에 수정된 데이터 유지
const updated = await productApi.update(editingId, payload)
setProducts((prev) => prev.map((p) => (String(p._id) === String(editingId) ? updated : p)))
setProductForm({
  sku: updated.sku || '',
  name: updated.name || '',
  // ...
})
```

**배운 점**: 수정 성공 시 응답 데이터로 폼과 목록을 갱신하면, 별도 API 호출 없이 화면 갱신 가능

---

## 2. 상품 ID (SKU) 추가

### Product 모델 (server/models/Product.js)
```javascript
// 추가된 필드
sku: { type: String, trim: true, unique: true, sparse: true },
```

- `unique`: SKU 값 중복 불가
- `sparse`: SKU가 없는 상품은 여러 개 허용 (null/undefined는 인덱스에 포함 안 함)

### products 컨트롤러 - create
```javascript
const skuVal = (sku || '').trim() || undefined;
const product = await Product.create({
  ...(skuVal && { sku: skuVal }),  // SKU가 있을 때만 추가
  name,
  ...
});
```

### products 컨트롤러 - update (SKU 없던 상품에 SKU 추가)
```javascript
const product = await Product.findById(req.params.id);
// ...
const skuVal = (sku || '').trim() || null;
if (skuVal) {
  product.sku = skuVal;      // 새 필드 추가
} else {
  product.unset('sku');      // SKU 제거
}
await product.save();
```

**배운 점**: `find` + `save` 방식은 기존 문서에 없는 필드를 추가할 때 유용함

---

## 3. 상품 수정 API - find vs findByIdAndUpdate

### findByIdAndUpdate 방식
```javascript
const updateOp = skuVal
  ? { $set: { ...$set, sku: skuVal } }
  : { $set, $unset: { sku: 1 } };
const product = await Product.findByIdAndUpdate(id, updateOp, { new: true });
```

### find + save 방식 (현재 사용)
```javascript
const product = await Product.findById(req.params.id);
product.name = String(name).trim();
product.sku = skuVal || product.unset('sku');
await product.save();
```

**배운 점**: 문서에 새 필드를 추가할 때는 `find` + `save`가 더 안정적

---

## 4. 상품 목록 표시 (3개 등록 시 3개 보이게)

### ShopContent.jsx - API 호출
```javascript
// API 실패 시 1.5초 후 재시도
useEffect(() => {
  let retried = false;
  const run = () => {
    productApi.getAll()
      .then((data) => {
        setProducts(Array.isArray(data) && data.length > 0 ? data : staticProducts);
      })
      .catch(() => {
        if (!retried) {
          retried = true;
          setTimeout(run, 1500);  // 재시도
        } else {
          setProducts(staticProducts);
          setProductsLoadError(true);
        }
      });
  };
  run();
}, []);
```

### API 캐시 방지 (api.js)
```javascript
const config = {
  cache: 'no-store',  // 브라우저 캐시 사용 안 함
  headers: { ... },
};
```

**배운 점**: API 실패 시 재시도, 캐시 방지로 최신 데이터 표시

---

## 5. 소개글 추가 (ShopBody.jsx)

```jsx
<section className="shop-intro">
  <h2 className="intro-title">가족이 안심하고 먹을 수 있는 빵</h2>
  <div className="intro-content">
    <p>가족이 안심하고 먹을 수 있는 빵을 만들고 싶었습니다...</p>
    ...
  </div>
</section>
```

---

## 6. 수정 버튼 및 취소 UI (AdminPage)

```jsx
{/* 수정 버튼 */}
<button type="button" className="edit-btn" onClick={() => handleProductEdit(p)}>
  수정
</button>

{/* 수정 모드일 때 취소 버튼 */}
{editingId && (
  <button type="button" className="cancel-btn" onClick={() => { ... }}>
    취소
  </button>
)}
```

---

## 7. 에러 처리 (중복 SKU)

```javascript
if (error.code === 11000 && error.keyPattern?.sku) {
  return res.status(400).json({ message: '이미 사용 중인 SKU입니다.' });
}
```

**배운 점**: MongoDB E11000 에러는 unique 제약 위반 시 발생

---

## 8. 파일별 수정 요약

| 파일 | 주요 변경 |
|------|-----------|
| `server/models/Product.js` | sku 필드 추가 (unique, sparse) |
| `server/controllers/products.js` | create/update에 sku 처리, find+save 방식 |
| `client/src/pages/AdminPage.jsx` | SKU 입력, 수정 모드 유지, 수정 목록 즉시 반영 |
| `client/src/components/ShopContent.jsx` | API 재시도, loadProducts, productsLoadError |
| `client/src/components/ShopBody.jsx` | 소개글, productsLoadError, 다시 시도 버튼 |
| `client/src/services/api.js` | cache: 'no-store' |
