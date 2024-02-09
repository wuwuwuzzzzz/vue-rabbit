import { getCategoryAPI } from '@/apis/category';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

export function useCategory () {

  const categoryData = ref({})
  const route = useRoute()

  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }

  onMounted(() => {
    getCategory().then()
  })

  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id).then()
  })

  return {
    categoryData
  }
}
