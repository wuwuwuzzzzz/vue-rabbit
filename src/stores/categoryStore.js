import { getCategoryAPI } from '@/apis/layout.js';

export const useCategoryStore = defineStore('counter', () => {
  // state 导航列表数据
  const categoryList = ref([]);

  // action 获取导航列表
  const getCategory = () => {
    getCategoryAPI().then(res => {
      categoryList.value = res.result;
    });
  }

  return { categoryList, getCategory }
})
