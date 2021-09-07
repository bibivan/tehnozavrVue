<template>
  <div>
    <a class="catalog__pic" href="#"
       @click.prevent="goToPage('product', {id: product.id})">
      <img :src="product.image" :alt="product.title"/>
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }}
    </span>

    <ul class="colors colors--black" v-if="product.availableColors.length !== 0">
      <li class="colors__item" v-for="color in product.availableColors" :key="color">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="color" v-model="currentColor"/>
          <span class="colors__value" :style="{ backgroundColor: color, }"> </span>
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
      currentColor: this.product.availableColors[0],
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
