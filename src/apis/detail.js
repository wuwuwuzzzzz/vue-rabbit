import httpInstance from '@/utils/http.js';

// 获取商品详情
export const getDetail = (id) => {
  return httpInstance.get(`/goods?id=${id}`)
}
