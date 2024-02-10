import httpInstance from '@/utils/http';

// 获取订单
export function getOrderAPI(id) {
  return httpInstance.get(`/member/order/${id}`)
}
