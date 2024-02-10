import httpInstance from '@/utils/http';

// 获取分类列表
export function getCategoryAPI(id) {
  return httpInstance.get(`/category?id=${id}`)
}

// 获取二级分类列表数据
export const getCategoryFilterAPI = (id) => {
  return httpInstance(`/category/sub/filter?id=${id}`)
}

// 获取导航数据
export const getSubCategoryAPI = (data) => {
  return httpInstance({
    url: '/category/goods/temporary',
    method: 'POST',
    data
  })
}
