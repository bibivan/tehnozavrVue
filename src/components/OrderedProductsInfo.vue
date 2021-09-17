<template>
  <ProductsInfoList :products="orderInfo.basket.items" :totalPrice="orderInfo.totalPrice"/>
</template>

<script>
import ProductsInfoList from '@/components/ProductsInfoList.vue';

export default {
  name: 'OrderedProductsInfo',
  components: { ProductsInfoList },
  props: ['orderInfo'],
  created() {
    console.log(this.orderInfo);
    console.log(this.orderInfo.totalPrice);
  },
};
</script>
