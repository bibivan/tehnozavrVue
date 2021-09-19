import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    cartProductsData: [],
    orderInfo: null,
    userAccessKey: null,
    cartLoadingFailed: false,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, amount }) {
      const product = state.cartProducts.find((item) => item.productId === productId);

      if (product) {
        product.amount = amount;
      }
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
    checkCartLoadingFailed(state, loadingStatus) {
      state.cartLoadingFailed = loadingStatus;
    },
  },
  getters: {
    orderDetailProducts(state) {
      return state.orderInfo;
    },
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
    cartLoadingFailedStatus(state) {
      return state.cartLoadingFailed;
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return (new Promise((resolve) => setTimeout(resolve, 300)))
        .then(() => {
          const axiosResponse = axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          }).then((response) => {
            context.commit('updateOrderInfo', response.data);
          });

          return axiosResponse;
        });
    },
    loadCart(context) {
      return (new Promise((resolve) => setTimeout(resolve, 300)))
        .then(() => {
          const axiosResponse = axios.get(`${API_BASE_URL}/api/baskets`, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          }).then((response) => {
            if (!context.state.userAccessKey) {
              localStorage.setItem('userAccessKey', response.data.user.accessKey);
              context.commit('updateUserAccessKey', response.data.user.accessKey);
            }
            context.commit('checkCartLoadingFailed', false);
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
          }).catch(() => {
            context.commit('checkCartLoadingFailed', true);
          });

          return axiosResponse;
        });
    },
    addProductToCart(context, { productId, amount }) {
      return (new Promise((resolve) => setTimeout(resolve, 300)))
        .then(() => {
          const axiosResponse = axios.post(`${API_BASE_URL}/api/baskets/products`, {
            productId,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          }).then((response) => {
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
          });

          return axiosResponse;
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });
      let returnedProp;

      if (amount < 1) {
        returnedProp = null;
      } else {
        returnedProp = axios.put(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        }).then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        }).catch(() => {
          context.commit('syncCartProducts');
        });
      }

      return returnedProp;
    },
    deleteProductFromCart(context, { productId }) {
      return axios.delete(`${API_BASE_URL}/api/baskets/products`, {
        data: { productId },
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      }).then((response) => {
        context.commit('updateCartProductsData', response.data.items);
        context.commit('syncCartProducts');
      });
    },
  },
});
