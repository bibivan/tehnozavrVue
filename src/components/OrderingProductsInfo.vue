<template>
  <ProductsInfoList :products="cartDetailProducts" :totalPrice="cartTotalPrice">
    <BaseButton title="Оформить заказ"/>
  </ProductsInfoList>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductsInfoList from '@/components/ProductsInfoList.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'OrderingProductsInfo',
  components: { ProductsInfoList, BaseButton },
  computed: {
    ...mapGetters(['cartDetailProducts', 'cartTotalPrice']),
  },
};
</script>
