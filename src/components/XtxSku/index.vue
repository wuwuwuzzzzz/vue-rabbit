<script setup>
import powerSet from './power-set'

const props = defineProps({
  goods: {
    type: Object,
    default: () => ({ specs: [], skus: [] })
  }
})

const emit = defineEmits(['change'])

let pathMap = {}

onMounted(() => {
  const pathMap = getPathMap(props.goods);
  initDisabledStatus(props.goods.specs, pathMap);
})

// 切换选中状态
const changeSelectedStatus = (item, val) => {
  if (val.disabled) return
  if (val.selected) {
    val.selected = false
  } else {
    item.values.forEach(v => v.selected = false)
    val.selected = true
  }
  updateDisabledStatus(props.goods.specs, pathMap)
  const index = getSelectedValues(props.goods.specs).findIndex(item => item === undefined);
  if (index === -1) {
    const key = getSelectedValues(props.goods.specs).join('-');
    const skuIds = pathMap[key]
    const skuObj = props.goods.skus.find(item => item.id === skuIds[0]);
    emit('change', {...skuObj, skuId: skuObj.id})
  } else {
    emit('change', {})
  }
}

// 生成有效路径字典对象
const getPathMap = goods => {
  const effectiveSkus = goods.skus.filter(sku => sku.inventory > 0)
  effectiveSkus.forEach(sku => {
    const selectedValArr = sku.specs.map(val => val.valueName)
    const valueArrPowerSet = powerSet(selectedValArr)
    valueArrPowerSet.forEach(arr => {
      const key = arr.join('-')
      if (!pathMap[key]) {
        pathMap[key] = []
      }
      pathMap[key].push(sku.id)
    })
  })
  return pathMap
}

// 初始化禁用状态
const initDisabledStatus = (specs, pathMap) => {
  specs.forEach(spec => {
    spec.values.forEach(val => {
      val.disabled = !pathMap[val.name];
    })
  })
}

// 获取选中项的匹配数组
const getSelectedValues = specs => {
  const arr = []
  specs.forEach(spec => {
    const val = spec.values.find(v => v.selected)
    arr.push(val ? val.name : undefined)
  })
  return arr
}

// 切换时更新禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((spec, index) => {
    const selectedValues = getSelectedValues(specs)
    spec.values.forEach(val => {
      selectedValues[index] = val.name
      const key = selectedValues.filter(value => value).join('-')
      val.disabled = !pathMap[key];
    })
  })
}
</script>

<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <!-- 图片类型规格 -->
          <img v-if="val.picture" :src="val.picture" :title="val.name" :class="{ selected: val.selected, disabled: val.disabled }"
               @click="changeSelectedStatus(item, val)">
          <!-- 文字类型规格 -->
          <span v-else :class="{ selected: val.selected, disabled: val.disabled }" @click="changeSelectedStatus(item, val)">{{ val.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: #27ba9b;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>
