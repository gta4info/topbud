<template>
  <div class="card" :class="{selected: product.selected}" @click="changeSelected">
    <div class="card__header">
      <div class="img">
        <img :src="product.img" :alt="product.name">
      </div>
    </div>
    <div class="card__bottom">
      <div class="card__title">{{product.name}}</div>
      <div class="card__prices">
        <span class="card__prices-full">${{product.price}}</span>
        <span class="card__prices-deal">${{product.deal_price}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    },
    selectedWeight: {
      type: Number,
      required: true
    }
  },
  methods: {
    changeSelected() {
      this.$store.commit('shop/PUSH_PRODUCT_TO_SELECTED_MIXS', {
        type: this.selectedWeight,
        product: this.product
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;
    border: 1px solid #E9E9E9;
    border-radius: 8px;
    position: relative;
    height: 100%;
    cursor: pointer;

    &.selected {
      border-color: #7FAD39;

      &:before {
        content: '✓';
        position: absolute;
        left: 0;
        right: 0;
        top: -20px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background: #7FAD39;
        margin: 0 auto;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-weight: 900;
        font-size: 20px;
      }
    }

    &__header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      transition: .3s;
      color: #000;
      border-bottom: 1px solid #E9E9E9;

      .img {
        overflow: hidden;
        height: 100%;
        width: 100%;
        border-radius: 8px 8px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          height: auto;
          transition: .3s;
        }
      }

      &:hover {
        .img {
          img {
            transform: scale(1.2);
          }
        }
      }
    }

    &__title {
      font-weight: 900;
      font-size: 16px;
      width: 100%;
      text-align: center;
      margin: 10px 0 0;
      display: flex;
      justify-content: center;
      flex-direction: column;
      color: #000;
    }

    &__bottom {
      padding: 0 15px 15px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }

    &__prices {
      display: flex;
      align-items: center;

      &-full {
        text-decoration: line-through;
        color: #8a8a8a;
        font-size: 14px;
        margin-top: 1px;
      }

      &-deal {
        color: #7FAD39;
        font-weight: 900;
        margin-left: 10px;
      }
    }
  }
</style>
