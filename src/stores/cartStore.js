import { useUserStore } from '@/stores/userStore';
import { insertCartAPI, getCartListAPI, delCartAPI } from '@/apis/cart';

export const useCartStore = defineStore('cart', () => {

  const userStore = useUserStore();
  const isLogin = computed(() => userStore.userInfo.token);
  const cartList = ref([]);

  const addCart = async (goods) => {
    if (isLogin.value) {
      const { skuId, count } = goods;
      await insertCartAPI({ skuId, count });
      const res = await getCartListAPI();
      cartList.value = res.result;
    } else {
      const item = cartList.value.find(item => goods.skuId === item.skuId);
      if (item) {
        item.count += goods.count;
      } else {
        cartList.value.push(goods);
      }
    }
  }

  const delCart = async (skuId) => {
    if (isLogin.value) {
      await delCartAPI([skuId]);
      const res = await getCartListAPI();
      cartList.value = res.result;
    } else {
      const index = cartList.value.findIndex(item => item.skuId === skuId);
      cartList.value.splice(index, 1);
    }
  }

  const clearCart = () => {
    cartList.value = [];
  }

  const singleCheck = (selected, skuId) => {
    const item = cartList.value.find(item => item.skuId === skuId);
    item.selected = selected;
  }

  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected);
  }

  // 购物车数量
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))

  // 购物车总价
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  // 是否全选
  const isAll = computed(() => cartList.value.every(item => item.selected))

  // 选中的数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))

  // 选中的总价
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  return {
    cartList,
    addCart,
    delCart,
    clearCart,
    singleCheck,
    allCheck,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice
  }
}, {
  persist: true
});
