export const useCartStore = defineStore('cart', () => {

  const cartList = ref([]);

  const addCart = goods => {
    const item = cartList.value.find(item => goods.skuId === item.skuId);
    if (item) {
      item.count += goods.count;
    } else {
      cartList.value.push(goods);
    }
  }

  const delCart = skuId => {
    const index = cartList.value.findIndex(item => item.skuId === skuId);
    cartList.value.splice(index, 1);
  }

  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))

  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  return { cartList, addCart, delCart, allCount, allPrice }
});
