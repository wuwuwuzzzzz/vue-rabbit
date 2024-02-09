import httpInstance from '@/utils/http.js';

// 获取商品详情
export const getDetail = (id) => {
  return httpInstance.get(`/goods?id=${id}`)
}

// 获取热榜商品
export const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return httpInstance({
    url:'/goods/hot',
    params:{
      id,
      type,
      limit
    }
  })
}
