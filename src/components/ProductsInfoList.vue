<template>
  <div class="cart__block">
    <ul class="cart__orders"  v-show="products.length > 0">
      <li class="cart__order" v-for="item in products" :key="item.productId">
        <h3>{{ item.product.title }}</h3>
        <b>{{ (item.product.price * (item.amount ? item.amount : item.quantity)) | numberFormat }} ₽
        </b>
        <span>Артикул: {{ item.productId ? item.productId : item.product.id }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>
        Итого: <b>{{ products.length }}</b>
        <span v-if="products.length === 1"> товар на сумму </span>
        <span v-else-if="products.length < 5 && products.length !== 0"> товара на сумму </span>
        <span v-else> товаров на сумму </span>
        <b>{{ totalPrice | numberFormat }} ₽</b></p>
    </div>
    <slot/>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductsInfoList',
  props: ['products', 'totalPrice'],
  filters: {
    numberFormat,
  },
};
</script>
