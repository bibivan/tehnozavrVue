<template>
  <li class="cart__item product"
      :key="item.productId">
    <div class="product__pic">
      <img :src="item.image" width="120" height="120" :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      {{ item.productId }}
    </span>

    <setQuantity :quantity.sync="amount"/>

    <b class="product__price">
      {{ (item.product.price * item.amount) | numberFormat }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
import SetQuantity from '@/components/SetQuantity.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'CartItem',
  props: ['item'],
  components: { SetQuantity },
  filters: {
    numberFormat,
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', {
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
  methods: {
    ...mapActions({ deleteProduct: 'deleteProductFromCart' }),
  },
};
</script>
