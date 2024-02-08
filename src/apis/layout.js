import httpInstance from '@/utils/http.js';

// 获取导航栏列表
export function getCategoryAPI() {
  return httpInstance.get('/home/category/head');
}
