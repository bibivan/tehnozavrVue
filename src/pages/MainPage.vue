<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ products.length }} товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :priceTo.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :available-colors.sync="filterColorCode"
        :current-color-id.sync="filterColorId"
        :current-per-page.sync="productsPerPage"
      />

      <section v-if="productsLoading">
        <div class="preloader">
          <div class="preloader__spinner"></div>
        </div>
      </section>
      <section class="loading-failed" v-if="productsLoadingFailed">
        <p>Произошла ошибка при загрузке товаров...</p>
        <BaseButton class="button--failed" title="Попробовать еще раз"
                    @click.prevent="loadProducts"></BaseButton>
      </section>

      <section class="catalog" v-else>
        <ProductList :productItems="products"/>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>

    </div>
  </main>
</template>

<script>
import axios from 'axios';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import BaseButton from '../components/BaseButton.vue';
import API_BASE_URL from '@/config';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    BaseButton,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorCode: '',
      filterColorId: 0,
      productsLoading: true,
      productsLoadingFailed: false,
      page: 1,
      productsPerPage: 12,
      productsData: null,
    };
  },
  computed: {
    products() {
      return this.productsData ? this.productsData.items.map((product) => {
        const modifiedProductItem = {
          ...product,
          image: product.image.file.url,
        };

        return modifiedProductItem;
      }) : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            colorId: this.filterColorId,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          },
        }).then((response) => {
          this.productsData = response.data;
          return this.productsData;
        }).catch(() => {
          this.productsLoadingFailed = true;
        }).then(() => {
          this.productsLoading = false;
        });
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    productsPerPage() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorCode() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
