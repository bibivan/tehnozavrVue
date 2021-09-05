<template>
  <ul class="catalog__list">
    <li class="catalog__item" v-for="productItem in productItems" :key="productItem.title">
      <ProductElement :product="productItem"/>
    </li>
  </ul>
</template>

<script>
import ProductElement from './ProductElement.vue';

export default {
  components: { ProductElement },
  props: ['productItems'],
};
</script>
