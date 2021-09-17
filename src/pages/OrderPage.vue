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
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText title="ФИО"
                          :error="formError.name"
                          v-model="formData.name"
                          placeholder="Введите ваше полное имя"/>

            <BaseFormText title="Адрес доставки"
                          :error="formError.address"
                          v-model="formData.address"
                          placeholder="Введите ваш адрес"/>

            <BaseFormText title="Телефон"
                          :error="formError.phone"
                          v-model="formData.phone"
                          type="tel"
                          placeholder="Введите ваш телефон"/>

            <BaseFormText title="Email"
                          :error="formError.email"
                          v-model="formData.email"
                          type="email"
                          placeholder="Введите ваш Email"/>

            <BaseFormTextarea title="Комментарий к заказу"
                              :error="formError.comment"
                              v-model="formData.comment"
                              placeholder="Ваши пожелания">
            </BaseFormTextarea>

          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                         name="delivery" value="0">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                         name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                         name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                         name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <OrderingProductsInfo :dataSending="formDataSending"
                              :sendingFailed="formDataSendingFailed"/>

        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{  formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '../components/BaseFormTextarea.vue';
import OrderingProductsInfo from '@/components/OrderingProductsInfo.vue';
import API_BASE_URL from '@/config';

export default {
  name: 'OrderPage',
  components: {
    BaseFormText,
    BaseFormTextarea,
    OrderingProductsInfo,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      formDataSending: false,
      formDataSendingFailed: false,
    };
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.formDataSending = true;

      return axios.post(`${API_BASE_URL}/api/orders`, {
        ...this.formData,
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        },
      }).then((response) => {
        this.formDataSending = false;
        this.$store.commit('resetCart');
        this.$store.commit('updateOrderInfo', response.data);
        this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
      }).catch((error) => {
        this.formDataSending = false;
        this.formError = error.response.data.error.request || {};
        this.formErrorMessage = error.response.data.error.message;
      });
    },
  },
};
</script>
