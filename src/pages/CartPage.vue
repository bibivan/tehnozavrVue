<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info" v-if="products.length === 1">
        {{products.length}} товар
      </span>
      <span class="content__info" v-else-if="products.length < 5">
        {{products.length}} товара
      </span>
      <span class="content__info" v-else>
        {{products.length}} товаров
      </span>
      <span class="content__info"> товаров
      </span>

    </div>

    <section class="cart">
      <div v-if="productsLoading"> Загрузка товаров</div>
      <div v-else-if="$store.state.cartLoadingFailed"> Произошла ошибка</div>
      <div v-else-if="products.length === 0 && $store.state.cartLoadingFailed === false">
        Корзина пуста
      </div>
      <form class="cart__form form" action="#" method="POST" v-else>
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import CartItem from '@/components/CartItem.vue';

export default {
  name: 'CartPage',
  components: { CartItem },
  data() {
    return {
      cartProductsCount: 0,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
    }),
  },
  methods: {
    ...mapActions(['loadCart']),
    showLoading() {
      this.productsLoading = true;
      this.loadCart().then(() => {
        this.productsLoading = false;
      });
    },
  },
  created() {
    this.showLoading();
  },
};
</script>
