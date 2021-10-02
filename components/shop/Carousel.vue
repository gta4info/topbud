<template>
  <v-container fluid class="carousel">
    <v-row>
      <v-container class="pl-0 pr-0">
        <slick v-bind="settings" ref="carousel">
          <div class="carousel__item" v-for="product in products" :key="product.id">
            <ProductCard :product="product"/>
          </div>
        </slick>
      </v-container>
    </v-row>

  </v-container>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    settings: {
      dots: true,
      arrows: false,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      draggable: false
    },
  }),
  components: {
    'slick': () => import('vue-slick-carousel'),
    'ProductCard': () => import('@/components/shop/ProductCard')
  },
}
</script>

<style lang="scss">
  .carousel {
    margin-top: 50px;

    &__item {
      padding: 10px;
      height: 100%;
    }

    .slick-dots {
      bottom: -50px;

      li {
        width: 14px;
        height: 14px;
        margin: 0 13px;

        &.slick-active {

          button {
            background: #699551;
          }
        }

        button {
          background: transparent;
          border: 1px solid #699551;
          width: 100%;
          height: 100%;
          border-radius: 50%;

          &:before {
            display: none;
          }
        }
      }
    }

    //.slick-slide {
    //  & > div {
    //    display: flex;
    //    justify-content: center;
    //  }
    //}
  }
</style>
