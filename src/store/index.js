import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      { productId: 1, amount: 2 },
    ],
    productsLoading: true,
    productsLoadingFailed: false,
    userAccessKey: null,
    cartProductsData: [],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const product = state.cartProducts.find((item) => item.productId === productId);

      if (product) {
        product.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const product = state.cartProducts.find((item) => item.productId === productId);

      if (product) {
        product.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => {
        const mapedObject = {
          productId: item.product.id,
          amount: item.quantity,
        };

        return mapedObject;
      });
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === item.productId);
        return {
          ...item,
          product,
          image: product.image.file.url,
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => {
        const currentSum = (item.product.price * item.amount) + acc;
        return currentSum;
      }, 0);
    },
  },
  actions: {
    loadCart(context) {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      }).then((response) => {
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', response.data.user.accessKey);
          context.commit('updateUserAccessKey', response.data.user.accessKey);
        }
        context.commit('updateCartProductsData', response.data.items);
        context.commit('syncCartProducts');
      });
    },
  },
});
