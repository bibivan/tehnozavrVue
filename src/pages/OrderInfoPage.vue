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
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'order' }">
            Оформление заказа
          </router-link>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">

        <ClientInfo :orderInfo="orderInfo"/>

        <OrderedProductsInfo :orderInfo="orderInfo"/>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import OrderedProductsInfo from '@/components/OrderedProductsInfo.vue';
import ClientInfo from '@/components/ClientInfo.vue';

export default {
  name: 'OrderInfoPage',
  components: { OrderedProductsInfo, ClientInfo },
  computed: {
    ...mapGetters({
      orderInfo: 'orderDetailProducts',
    }),
  },
  created() {
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === +this.$route.params.id) {
      console.log('work');
      return;
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id);
  },
};
</script>
