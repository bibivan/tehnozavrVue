<template>
  <div>
    <router-link class="catalog__pic" :to="{ name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title"/>
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }}
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="colorItem in product.colors" :key="colorItem.code">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="colorItem.code"
                 v-model="currentColor"/>
          <span class="colors__value"
                :style="{ backgroundColor: colorItem.code, boxShadow: shadow }"> </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      currentColor: '',
      shadow: '0 0 3px 1px #666',
    };
  },
  props: ['product'],
  filters: {
    numberFormat,
  },
  methods: {
    goToPage,
  },
};
</script>
