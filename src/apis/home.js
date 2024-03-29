import httpInstance from '@/utils/http';

// 获取首页轮播图
export function getBannerAPI({ distributionSite = '1' }) {
  return httpInstance({
    url: '/home/banner',
    method: 'get',
    params: {
      distributionSite
    }
  })
}

// 获取新鲜好物
export const findNewAPI = () => {
  return httpInstance.get('/home/new')
}

// 获取人气推荐
export const getHotAPI = () => {
  return  httpInstance.get('home/hot')
}

// 获取商品列表
export const getGoodsAPI = () => {
  return httpInstance.get('/home/goods')
}
