<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :priceTo.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :available-colors.sync="filterColorCode"
        :current-color-id.sync="filterColorId"
      />

      <section class="catalog">
        <div v-if="productsLoading">Загрузка товаров...</div>
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров...
          <button @click.prevent="loadProducts">Попробовать еще раз</button>
        </div>
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
import API_BASE_URL from '@/config';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
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
      productsPerPage: 3,
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
