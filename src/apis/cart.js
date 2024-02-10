import httpInstance from '@/utils/http.js';

// 加入购物车
export function insertCartAPI({ skuId, count }) {
  return httpInstance({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

// 获取购物车列表
export function getCartListAPI() {
  return httpInstance.get('/member/cart')
}
