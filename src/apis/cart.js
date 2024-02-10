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

// 删除购物车
export function delCartAPI(ids) {
  return httpInstance({
    url: `/member/cart`,
    method: 'DELETE',
    data: {
      ids
    }
  })
}

// 合并购物车
export function mergeCartAPI(data) {
  return httpInstance({
    url: '/member/cart/merge',
    method: 'POST',
    data: data
  })
}
