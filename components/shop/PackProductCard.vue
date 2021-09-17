<template>
  <div>
    <div class="card" :class="{selected: selected}" @click="pushToSelected" v-if="$vuetify.breakpoint.mdAndUp">
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
    <div class="cardMobile" :class="{selected: selected}" @click="pushToSelected" v-else>
      <div class="cardMobile__row">
        <div class="cardMobile__content">
          <div class="card__title cardMobile__title">{{product.name}}</div>
          <div class="cardMobile__text">
            <span v-if="product.cbd">CBD: {{product.cbd.replace('CBD:', '')}}</span>
            <span v-if="product.thc">THC: {{product.thc.replace('THC:', '')}}</span>
          </div>
          <div class="cardMobile__text" style="font-weight: 700; margin-top: 6px;">
            ${{product.price}}
          </div>
        </div>
        <div class="cardMobile__img">
          <img :src="product.img" :alt="product.name">
        </div>
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
    },
    selected: Boolean
  },
  methods: {
    pushToSelected() {
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

      @media(max-width: 768px) {
        font-size: 14px;
      }
    }

    &__bottom {
      padding: 0 15px 15px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      @media(max-width: 768px) {
        padding: 0 10px 10px;
      }
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

  .cardMobile {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: #000 !important;

    @media(min-width: 769px) {
      display: none;
    }

    &.selected {
      border: 1px solid #7FAD39;
      padding: 10px;
      border-radius: 5px;
      position: relative;

      &:before {
        content: '✓';
        position: absolute;
        left: 0;
        right: 0;
        top: -15px;
        height: 30px;
        width: 30px;
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

    &__row {
      display: flex;
      width: 100%;
    }

    &__content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    &__img {
      width: 30%;
      height: 90%;
      border-radius: 10px;
      overflow: hidden;
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    &__title {
      justify-content: flex-start;
      text-align: left;
      width: 100%;
    }

    &__text {
      font-size: 14px;
      display: flex;
      flex-wrap: wrap;

      span {

        &:not(:last-of-type) {
          position: relative;
          padding-right: 3px;
          margin-right: 3px;
          display: flex;

          &:before {
            content: ',';
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
  }
</style>
