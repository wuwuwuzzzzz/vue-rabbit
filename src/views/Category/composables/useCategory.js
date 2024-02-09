import { getCategoryAPI } from '@/apis/category';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

export function useCategory () {

  const categoryData = ref({
    children: []
  })
  const route = useRoute()
  const getCategory = async (id = route.params.id) => {
    console.log(id)
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }

  onMounted(() => {
    getCategory()
  })

  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })

  return {
    categoryData
  }
}
