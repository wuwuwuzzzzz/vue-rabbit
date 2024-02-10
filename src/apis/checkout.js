import httpInstance from '@/utils/http.js';

// 获取详情
export function getCheckInfoAPI() {
  return httpInstance.get('/member/order/pre')
}

export function createOrderAPI(data) {
  return httpInstance.post('/member/order', data)
}
