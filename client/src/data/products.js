// 제과점 빵 상품 데이터 (API 없을 때 fallback)
const BREAD_NAMES = ['깜바뉴', '바게트']
const RANDOM_PRICES = [18000, 15000]

export const staticProducts = BREAD_NAMES.map((name, i) => ({
  name,
  desc: `정성스럽게 구운 ${name}`,
  category: name === '깜바뉴' ? '클래식' : '바게트',
  size: '1개',
  unit: 'EA',
  qty: 1,
  price: RANDOM_PRICES[i],
  img: name === '깜바뉴' ? '/jpg/08.jpg' : `/jpg/${String(i + 1).padStart(2, '0')}.jpg`,
}))

export function getCategory(product) {
  if (product.category) return product.category
  if (product.name === '깜바뉴') return '클래식'
  if (product.name === '바게트') return '바게트'
  return product.name
}
