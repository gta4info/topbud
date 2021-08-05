<template>
  <v-container fluid class="carousel">
    <v-row>
      <button @click="$refs.carousel.prev()">
        <v-icon size="40">mdi-chevron-left</v-icon>
      </button>
      <v-container class="pl-0 pr-0">
        <slick v-bind="settings" ref="carousel">
          <div class="product" v-for="item in items" :key="item.id">
            <nuxt-link class="product__head" :to="{name: 'category-cslug-pslug', params: {cslug: item.cslug, pslug: item.pslug}}">
              <div class="product__head-deal" v-if="item.deal"><span>Deal</span></div>
              <div class="product__head-badges" v-if="item.badges.length">
                <div class="product__head-badge" :class="badge.type" v-for="(badge, index) in item.badges" :key="index">
                  {{badge.text}}
                </div>
              </div>
              <img :src="require(`@/assets/images/${item.image}`)" :alt="item.title">
            </nuxt-link>
            <h3 class="product__title">{{item.title}}</h3>
            <div class="product__weight">{{item.weight}}</div>
            <div class="product__prices">
              <span class="product__price-old" v-if="item.old_price">${{item.old_price}}</span>
              <span class="product__price-cur">${{item.price}}</span>
            </div>
            <v-btn class="product__btn" @click="addToCart(item.id)" depressed>Add to cart</v-btn>
          </div>
        </slick>
      </v-container>
      <button @click="$refs.carousel.next()">
        <v-icon size="40">mdi-chevron-right</v-icon>
      </button>
    </v-row>

  </v-container>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  data: () => ({
    settings: {
      dots: true,
      arrows: true,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 5,
      draggable: false
    },
    items: [
      {
        cslug: 'flower',
        pslug: 'la_kush_king_aaaaa',
        title: 'LA Kush King (AAAAA)',
        weight: '1 oz (28g)',
        old_price: '240',
        price: '220',
        image: '1.webp',
        id: 1,
        deal: true,
        badges: [
          {
            text: 'THC: 24-29 %',
            type: 'thc'
          },
          {
            text: 'CBD: 1 %',
            type: 'cbd'
          }
        ]
      },
      {
        cslug: 'edibles',
        pslug: 'tahoe_og_kush_aaaa',
        title: 'Tahoe OG Kush (AAAA)',
        weight: '1 oz (28g)',
        old_price: null,
        price: '180',
        image: '2.webp',
        id: 2,
        deal: true,
        badges: [
          {
            text: 'THC: 19-25 %',
            type: 'thc'
          }
        ]
      },
      {
        cslug: 'topicals',
        pslug: 'rockstar',
        title: 'Rockstar',
        weight: '1 oz (28g)',
        old_price: '150',
        price: '130',
        image: '3.webp',
        id: 3,
        deal: true,
        badges: [
          {
            text: 'THC: 19-26 %',
            type: 'thc'
          }
        ]
      },
      {
        cslug: 'flower',
        pslug: 'cake_pop_aaaaa',
        title: 'Cake Pop (AAAAA)',
        weight: '1 oz (28g)',
        old_price: '240',
        price: '220',
        image: '4.webp',
        id: 4,
        deal: true,
        badges: [
          {
            text: 'THC: 25-29 %',
            type: 'thc'
          }
        ]
      },
      {
        cslug: 'vapes',
        pslug: 'cherry_og_aaaa',
        title: 'Cherry OG (AAAA+)',
        weight: '1 oz (28g)',
        old_price: '220',
        price: '200',
        image: '5.webp',
        id: 5,
        deal: true,
        badges: [
          {
            text: 'THC: 22-25 %',
            type: 'thc'
          },
          {
            text: 'CBD: 1 %',
            type: 'cbd'
          }
        ]
      },
      {
        cslug: 'flower',
        pslug: 'la_kush_king_aaaaa',
        title: 'LA Kush King (AAAAA)',
        weight: '1 oz (28g)',
        old_price: '240',
        price: '220',
        image: '6.webp',
        id: 6,
        deal: true,
        badges: [
          {
            text: 'THC: 24-29 %',
            type: 'thc'
          },
          {
            text: 'CBD: 1 %',
            type: 'cbd'
          }
        ]
      },
      {
        cslug: 'concentrate',
        pslug: 'tahoe_og_kush_aaaa',
        title: 'Tahoe OG Kush (AAAA)',
        weight: '1 oz (28g)',
        old_price: '200',
        price: '180',
        image: '7.webp',
        id: 7,
        deal: true,
        badges: [
          {
            text: 'THC: 19-25 %',
            type: 'thc'
          }
        ]
      },
      {
        cslug: 'accessories',
        pslug: 'rockstar',
        title: 'Rockstar',
        weight: '1 oz (28g)',
        old_price: '150',
        price: '130',
        image: '8.webp',
        id: 8,
        deal: true,
        badges: [
          {
            text: 'THC: 19-26 %',
            type: 'thc'
          }
        ]
      }
    ]
  }),
  components: {
    'slick': () => import('vue-slick-carousel')
  },
  methods: {
    addToCart(id) {
      alert('id #' + id + ' added to cart')
    }
  }
}
</script>

<style lang="scss">
  .carousel {
    margin-top: 50px;
    margin-bottom: 80px;

    & > .row > button {
      height: 100px;
      width: 40px;
      margin: auto 0;
      background: rgba(0, 0, 0, 0.2);
    }

    .slick-dots {
      bottom: -50px;

      li {
        margin: 0;

        button {
          &:before {
            font-size: 12px;
            transition: .3s;
          }
        }
      }
    }

    .slick-slide {
      & > div {
        display: flex;
        justify-content: center;
      }
    }

    .product {
      display: flex !important;
      flex-direction: column;
      width: 220px !important;

      &__head {
        height: 220px;
        position: relative;
        cursor: pointer;
        margin-bottom: 18px;

        &:before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          background: rgba(#000, .2);
          opacity: 0;
          transition: .3s;
        }

        &:hover {
          &:before {
            opacity: 1;
          }
        }

        &-badges {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 18px;
          left: -5px;
        }

        &-badge {
          clip-path: polygon(100% 0%, calc(100% - 0.75rem) 50%, 100% 100%, 0 100%, 0% 50%, 0 0);
          color: #fff;
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.03rem;
          padding: 0.3rem 1rem 0.3rem 0.3rem;
          text-shadow: 1px 1px 2px rgb(150 150 150 / 50%);
          white-space: nowrap;

          &:not(:last-child) {
            margin-bottom: 10px;
          }

          &.thc {
            background: hsl(24, 100%, 50%);
          }
          &.cbd {
            background: hsl(101, 93%, 28%);
          }
        }

        &-deal {
          position: absolute;
          right: -3px;
          top: -3px;
          z-index: 1;
          overflow: hidden;
          width: 93px;
          height: 93px;
          text-align: right;

          span {
            background: linear-gradient(#f70505 0%, #8f0808 100%);
            font-size: 1.1rem;
            color: #fff;
            text-transform: uppercase;
            text-align: center;
            font-weight: bold;
            line-height: 32px;
            transform: rotate(45deg);
            min-width: 125px;
            width: 100%;
            letter-spacing: 5px;
            display: block;
            position: absolute;
            top: 17px;

            &:before {
              content: '';
              position: absolute;
              left: 0;
              top: 100%;
              z-index: -1;
              border-left: 3px solid #8f0808;
              border-right: 3px solid transparent;
              border-bottom: 3px solid transparent;
              border-top: 3px solid #8f0808;
            }

            &:after {
              content: '';
              position: absolute;
              right: 0;
              top: 100%;
              z-index: -1;
              border-right: 3px solid #8f0808;
              border-left: 3px solid transparent;
              border-bottom: 3px solid transparent;
              border-top: 3px solid #8f0808;
            }
          }
        }

        img {
          width: 100%;
          height: auto;
          max-height: 100%;
        }
      }

      &__title {
        font-size: 16px;
        text-align: center;
        font-weight: 500;
        margin-bottom: 10px;
      }

      &__weight {
        text-align: center;
        font-weight: 900;
        margin-bottom: 10px;
      }

      &__prices {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
      }

      &__price {
        &-old {
          font-size: 14px;
          font-weight: 900;
          color: #999;
          margin-top: 4px;
          margin-right: 10px;
          text-decoration: line-through;
        }

        &-cur {
          color: #7FAD39;
          font-weight: 900;
          font-size: 20px;
        }
      }

      &__btn {
        height: 28px !important;
        border: 1px solid #ccc;
        border-radius: 0;
        font-size: 11px;
        font-weight: 900;
        align-self: center;
        color: #000;
        background: #fff;
        transition: .3s;

        &:hover {
          background: #000;
          color: #fff;
        }
      }
    }
  }
</style>
