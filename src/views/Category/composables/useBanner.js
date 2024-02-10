import { getBannerAPI } from '@/apis/home.js';

export function useBanner() {

  const bannerList = ref([]);

  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: '2'
    });
    bannerList.value = res.result;
  };

  onMounted(() => {
    getBanner().then()
  })

  return {
    bannerList
  }
}
