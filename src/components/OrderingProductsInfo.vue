<template>
  <ProductsInfoList :products="cartDetailProducts" :totalPrice="cartTotalPrice">
    <BaseButton title="Оформить заказ"/>
    <span v-if="dataSending">Отправка данных</span>
    <span v-if="sendingFailed">Произошла ошибка</span>
  </ProductsInfoList>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductsInfoList from '@/components/ProductsInfoList.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'OrderingProductsInfo',
  components: { ProductsInfoList, BaseButton },
  props: ['dataSending', 'sendingFailed'],
  computed: {
    ...mapGetters(['cartDetailProducts', 'cartTotalPrice']),
  },
};
</script>
