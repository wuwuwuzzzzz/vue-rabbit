import { loginAPI } from '@/apis/user';
import { useCartStore } from '@/stores/cartStore';
import { mergeCartAPI } from '@/apis/cart';

export const useUserStore = defineStore('user', () => {

  const userInfo = ref({})
  const cartStore = useCartStore()

  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    await mergeCartAPI(cartStore.cartList.map(item => ({
      skuId: item.skuId,
      selected: item.selected,
      count: item.count
    })))
    await cartStore.updateCartList()
  }

  const clearUserInfo = () => {
    userInfo.value = {}
    cartStore.clearCart()
  }

  return { userInfo, getUserInfo, clearUserInfo }
}, {
  persist: true
})
