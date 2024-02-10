import httpInstance from '@/utils/http';

// 获取订单列表
export function getUserOrder(params) {
  return httpInstance({
    url:'/member/order',
    method:'GET',
    params
  })
}
