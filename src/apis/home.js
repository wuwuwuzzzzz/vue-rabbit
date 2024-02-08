import httpInstance from '@/utils/http.js';

// 获取首页轮播图
export function getBannerAPI() {
  return httpInstance.get('/home/banner')
}

// 获取新鲜好物
export const findNewAPI = () => {
  return httpInstance.get('/home/new')
}

// 获取人气推荐
export const getHotAPI = () => {
  return  httpInstance.get('home/hot')
}