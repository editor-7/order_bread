// 제과점 빵 상품 데이터 (client/jpg 이미지 사용, 가격 15,000~20,000원 랜덤)
const BREAD_NAMES = [
  '크로아상',
  '바게트',
  '소보로빵',
  '호밀빵',
  '치아바타',
  '베이글',
  '팬미니',
  '단호박빵',
]

const BREAD_CATEGORIES = ['식빵', '크로아상', '베이글', '건강빵', '스페셜', '클래식', '소프트', '시그니처']

// 15000~20000 랜덤 가격 (고정된 랜덤값)
const RANDOM_PRICES = [15200, 17800, 16500, 19900, 16800, 19200, 15500, 18500]

export const products = BREAD_NAMES.map((name, i) => ({
  name,
  desc: `정성스럽게 구운 ${name}`,
  size: '1개',
  unit: 'EA',
  qty: 1,
  price: RANDOM_PRICES[i],
  img: `/jpg/${String(i + 1).padStart(2, '0')}.jpg`,
}))

export function getCategory(product) {
  const idx = BREAD_NAMES.indexOf(product.name)
  return BREAD_CATEGORIES[idx % BREAD_CATEGORIES.length]
}
