const DUPLICATE_WINDOW_MS = 60 * 1000

function orderFingerprint(items, total) {
  const key = items
    .map((g) => `${g.name}|${g.count}|${g.price}`)
    .sort()
    .join(';')
  return `${key}::${total}`
}

export function isDuplicateOrder(orderList, items, total, userId) {
  const fp = orderFingerprint(items, total)
  const now = Date.now()
  const recent = orderList.filter((o) => {
    if (userId && o.userId && String(o.userId) !== String(userId)) return false
    const age = now - new Date(o.createdAt).getTime()
    return age < DUPLICATE_WINDOW_MS
  })
  return recent.some((o) => orderFingerprint(o.items, o.totalPrice) === fp)
}

export function validatePayment(deliveryInfo, paymentMethod) {
  if (!paymentMethod) {
    return { ok: false, message: '결제 수단을 선택해주세요.' }
  }
  const name = (deliveryInfo?.name || '').trim()
  const phone = (deliveryInfo?.phone || '').trim()
  const address = (deliveryInfo?.address || '').trim()
  if (!name) {
    return { ok: false, message: '수령인 이름을 입력해주세요.' }
  }
  if (!phone) {
    return { ok: false, message: '연락처를 입력해주세요.' }
  }
  if (!address) {
    return { ok: false, message: '배송 주소를 입력해주세요.' }
  }
  return { ok: true }
}
