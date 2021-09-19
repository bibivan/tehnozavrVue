<template>
  <router-link class="header__cart" aria-label="Корзина с товарами" :to="{name: 'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="preloader__spinner"
          :style="styles"
          aria-label="Количество товаров"
          v-if="countLoading">
    </span>
    <span class="header__count" aria-label="Количество товаров"
          v-if="$store.state.cartLoadingFailed">
      &#10006;
    </span>
    <span class="header__count" aria-label="Количество товаров"
          v-show="$store.state.cartProducts.length > 0">
      {{$store.state.cartProducts.length}}
    </span>
  </router-link>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CartIndicator',
  data() {
    return {
      countLoading: false,
      styles: {
        top: '-20%',
        right: '-10%',
        border: '2px solid #9eff00',
        borderLeftColor: 'transparent',
        width: '14px',
        height: '14px',
      },
    };
  },
  methods: {
    ...mapActions(['loadCart']),
    showLoading() {
      this.countLoading = true;
      this.loadCart().then(() => {
        this.countLoading = false;
      });
    },
  },
  created() {
    this.showLoading();
  },
};
</script>

<style>
.preloader__spinner {

}
</style>
