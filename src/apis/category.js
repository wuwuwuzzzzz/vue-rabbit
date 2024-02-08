import httpInstance from '@/utils/http';

// 获取分类列表
export function getCategoryAPI(id) {
  return httpInstance.get(`/category?id=${id}`)
}
