<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар"
            @click.prevent="currentQuantity--">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="currentQuantity">

    <button type="button" aria-label="Добавить один товар"
            @click.prevent="currentQuantity++">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SetQuantity',
  props: ['quantity'],
  data() {
    return {
      currentQuantity: this.quantity,
    };
  },
  watch: {
    currentQuantity(value) {
      if (value <= 0) {
        this.currentQuantity = 0;
      }

      this.changeQuanitty();
    },
  },
  methods: {
    changeQuanitty() {
      this.$emit('update:quantity', this.currentQuantity);
    },
  },
};
</script>
