import httpInstance from '@/utils/http.js';

// 获取首页轮播图
export function getBannerAPI() {
  return httpInstance.get('/home/banner')
}
