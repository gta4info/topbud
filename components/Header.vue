<template>
  <div class="header__wrapper">
    <div class="bg"></div>
    <v-container>
      <div class="header">
        <nuxt-link to="/" class="header__logo">
          <img src="@/static/images/logo.png" alt="TOPBUD Store">
        </nuxt-link>
        <nav class="header__nav">
          <ul>
            <v-hover v-slot="{ hover }" close-delay="200" v-model="showShop">
              <li style="cursor:default;">
                <nuxt-link to="/shop" style="display:flex;align-items:center;" @click.native="showShop = false">
                  <v-icon color="#fff">mdi-menu</v-icon>Shop
                </nuxt-link>
                <v-expand-transition>
                  <div class="header__shop-wrapper" v-if="hover">
                    <div class="header__shop">
                      <div class="header__shop-left">
                        <v-btn
                          color="#071F41"
                          depressed
                          height="45"
                          width="150"
                          to="/shop"
                        >
                          Shop Now
                        </v-btn>
                      </div>
                      <div class="header__shop-content">
                        <div class="header__shop-category" v-for="(category, i) in categories" :key="i">
                          <template v-if="i < (windowWidth > 1264 ? 6 : 5)">
                            <nuxt-link
                              :to="{name: 'category-cslug', params: {cslug: category.slug}}"
                              class="header__shop-category--title"
                              @click.native="showShop = false"
                            >
                              {{category.name}}
                            </nuxt-link>
                            <template v-if="category.subs.length">
                              <nuxt-link
                                :to="{name: 'category-cslug-sslug', params: {cslug: category.slug, sslug: sub.slug}}"
                                class="header__shop-category--sub"
                                v-for="(sub, index) in category.subs"
                                :key="index"
                                @click.native="showShop = false"
                              >
                                {{sub.name}}
                              </nuxt-link>
                            </template>
                            <nuxt-link :to="{name: 'category-cslug', params: {cslug: category.slug}}" class="header__shop-category--sub" @click.native="showShop = false" v-else>
                              {{category.name}}
                            </nuxt-link>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-expand-transition>
              </li>
            </v-hover>
            <li>
              <nuxt-link to="/shop/deals">OZ deals</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/shop/mix">Mix'N'Match</nuxt-link>
            </li>
            <li class="lg">
              <nuxt-link to="/blog">Blog</nuxt-link>
            </li>
            <li class="lg">
              <nuxt-link to="/delivery">Delivery info</nuxt-link>
            </li>
            <li class="lg">
              <nuxt-link to="/about">About Us</nuxt-link>
            </li>
          </ul>
        </nav>
        <div class="header__search" v-click-outside="onClickOutside">
          <v-text-field
            v-model="searchQuery"
            label="search"
            prepend-inner-icon="mdi-magnify"
            dense
            solo
            hide-details
            @keydown.enter="submitSearch"
            @click:prepend-inner="submitSearch"
            @focus="showResults = true"
          />

          <div class="results" :class="{active: showResults && searchQuery.length >= 3}">
            <div class="results__title">Matched results:</div>
            <template v-if="results.length">
              <nuxt-link
                class="results__item"
                v-for="(product, i) in results"
                :key="i"
                :to="{name: 'category-cslug-sslug-pslug', params: {
                cslug: product.search.cslug,
                sslug: product.search.sslug ? product.search.sslug : 'product',
                pslug: product.slug
              }}"
                @click.native="showResults = false"
              >
                {{product.name}}
              </nuxt-link>
            </template>
            <div v-else>No products was found by this query!</div>
            <nuxt-link :to="{name: 'shop-search', query: {q: searchQuery}}" class="results__btn" v-ripple @click.native="showResults = false" v-if="results.length">Show all results</nuxt-link>
          </div>

        </div>
        <nuxt-link to="/shop/cart" class="header__cart">
          <div class="header__cart-icon">
            <svg width="23" height="28" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.9866 26.8306L21.2956 7.85593C21.2495 7.33775 20.8184 6.94084 20.3022 6.94084H16.8151V5.35615C16.8151 2.40277 14.4306 0 11.4996 0C8.56878 0 6.18454 2.40277 6.18454 5.35615V6.94084H2.69503C2.17877 6.94084 1.74775 7.33775 1.7016 7.85593L0.00398821 26.9052C-0.0210138 27.1863 0.0723447 27.4649 0.261323 27.6732C0.450301 27.8814 0.717477 28 0.99742 28H22.0026C22.5536 28 23 27.55 23 26.995C22.9999 26.9391 22.9953 26.884 22.9866 26.8306ZM8.17938 5.35615C8.17938 3.51109 9.66887 2.01001 11.4997 2.01001C13.3307 2.01001 14.8203 3.51109 14.8203 5.35615V6.94084H8.17938V5.35615ZM2.08847 25.9901L3.60694 8.95085H6.18454V10.7481C6.18454 11.3031 6.63099 11.7531 7.18196 11.7531C7.73294 11.7531 8.17938 11.3031 8.17938 10.7481V8.95085H14.8203V10.7481C14.8203 11.3031 15.2668 11.7531 15.8178 11.7531C16.3687 11.7531 16.8152 11.3031 16.8152 10.7481V8.95085H19.3904L20.9089 25.9901H2.08847Z" fill="white"/>
              <path d="M19 19.429C19 19.429 17.1394 18.3546 14.8441 18.3546C14.721 18.3546 14.5993 18.3579 14.4789 18.3638C14.6712 18.2076 14.8609 18.0383 15.0445 17.8547C16.6675 16.2317 17.1883 14.1212 17.1883 14.1212C17.1883 14.1212 15.0778 14.642 13.4548 16.265C13.1654 16.5543 12.9113 16.8591 12.6888 17.1647C12.8093 16.4793 12.8885 15.7308 12.8885 14.9468C12.8885 11.6625 11.5 9 11.5 9C11.5 9 10.1115 11.6625 10.1115 14.9468C10.1115 15.7309 10.1908 16.4793 10.3112 17.1647C10.0887 16.8591 9.83453 16.5543 9.54525 16.265C7.92224 14.642 5.81172 14.1212 5.81172 14.1212C5.81172 14.1212 6.33256 16.2317 7.95552 17.8547C8.13906 18.0382 8.32885 18.2075 8.52112 18.3638C8.40077 18.3579 8.27901 18.3546 8.15594 18.3546C5.86064 18.3546 4 19.429 4 19.429C4 19.429 5.86064 20.5033 8.15591 20.5033C8.6655 20.5033 9.15344 20.4502 9.60455 20.3677C9.58662 20.385 9.56878 20.4024 9.55108 20.4201C8.47337 21.4978 8.25364 23.0255 8.25364 23.0255C8.25364 23.0255 9.78127 22.8057 10.859 21.728C10.9118 21.6752 10.9621 21.621 11.0109 21.5662V24H11.9891V21.5662C12.0379 21.621 12.0882 21.6752 12.141 21.7281C13.2188 22.8058 14.7464 23.0255 14.7464 23.0255C14.7464 23.0255 14.5267 21.4979 13.4489 20.4202C13.4312 20.4025 13.4134 20.385 13.3955 20.3678C13.8466 20.4502 14.3345 20.5033 14.8441 20.5033C17.1394 20.5033 19 19.429 19 19.429Z" fill="white"/>
            </svg>
            <div class="badge" v-if="totalCartLength">{{ totalCartLength }}</div>
          </div>
          <span>CART</span>
        </nuxt-link>
        <div class="header__contacts">
          <a href="tel:+14373884091" class="header__contacts-phone">+1 (437) 388 - 4091</a>
        </div>
      </div>
    </v-container>
    <v-container v-if="breadcrumbs.length">
      <div class="header__breadcrumbs">
        <div class="header__breadcrumbs-links">
          <div class="header__breadcrumbs-link" v-for="(item, i) in breadcrumbs.filter(b => b.link !== null)" :key="i">
            <nuxt-link :to="item.link">{{item.title}}</nuxt-link>
          </div>
        </div>
        <h1 class="header__breadcrumbs-current">{{breadcrumbs.find(b => b.link === null).title}}</h1>
      </div>
    </v-container>
    <v-container v-if="$route.name === 'index'">
      <div class="header__slider" v-if="banners.length">
        <div class="header__slider-slider">
          <slick v-bind="settings" ref="carousel">
            <div
              v-for="(banner, i) in banners"
              :key="i"
              class="header__slider-banner"
              :style="{backgroundImage: `url(https://topbudstore.com/${$vuetify.breakpoint.mdAndUp ? banner.pc_img : banner.mobile_img})`}"
            >
              <div class="header__slider-banner--title">
                <template v-if="$vuetify.breakpoint.mdAndUp">{{banner.pc_title}}</template>
                <template v-else>{{banner.mobile_title}}</template>
              </div>
              <a :href="banner.url" v-ripple>{{banner.btn_title}}</a>
            </div>
          </slick>
        </div>
        <div class="header__slider-static">
          <div class="buttons">
            <nuxt-link to="/shop/mix" class="buttons__item mnm" v-ripple>
              <div class="buttons__item-title">Mix And Match</div>
              <div class="buttons__item-text">An excellent option for sampling AAAA and AAA flowers at a low price</div>
              <div class="buttons__item-link">Shop Now</div>
            </nuxt-link>
            <nuxt-link to="/shop/deals" class="buttons__item deals" v-ripple>
              <div class="buttons__item-title">Oz Deals</div>
              <div class="buttons__item-link">Shop Now</div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </v-container>

    <ticker />

  </div>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderNew',
  components: {
    'slick': () => import('vue-slick-carousel'),
    'ticker': () => import('@/components/Ticker'),
  },
  props: {
    breadcrumbs: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    showShop: false,
    searchQuery: '',
    results: [],
    loadingResults: false,
    awaitingSearch: false,
    showResults: false,
    windowWidth: null,
    settings: {
      dots: true,
      arrows: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false
    },
    banners: []
  }),
  computed: {
    ...mapGetters({
      categories: 'shop/categories',
      cartLength: 'shop/cartLength',
      mixs: 'shop/mixs'
    }),
    totalCartLength() {
      return this.cartLength + (this.mixs.cart && this.mixs.cart.data ? this.mixs.cart.data.length : 0)
    },
  },
  watch: {
    searchQuery() {
      if(this.searchQuery.length) {
        if(!this.awaitingSearch) {
          this.getSearch();
        }
        this.awaitingSearch = true;
      } else {
        this.results = [];
      }
    }
  },
  methods: {
    submitSearch() {
      if(this.searchQuery.length) {
        this.$router.push({name: 'shop-search', query: {q: this.searchQuery}})
      }
    },
    setWindowWidth() {
      this.windowWidth = window.outerWidth;
    },
    onClickOutside () {
      this.showResults = false
    },
    getSearch() {
      if(this.loadingResults) return;
      this.loadingResults = true;
      this.$axios
        .get(`/search?q=${this.searchQuery}`)
        .then(res => {
          let arr = [];
          Object.keys(res.data).map(key => {
            let category = this.categories.find(item => item.id === res.data[key].category_id);
            let sub = res.data[key].subcategory_id ? category.subs.find(item => item.id === res.data[key].subcategory_id) : null;
            res.data[key].search = {
              cslug: category.slug,
              sslug: sub ? sub.slug : null,
            }
            if(arr.length < 8) {
              arr.push(res.data[key]);
            }
          });
          this.products = arr;
          this.results = arr;
          this.showResults = true;
        })
        .finally(() => {
          this.loadingResults = false;
          this.awaitingSearch = false;
        })
    },
  },
  created () {
    if (process.browser) {
      this.windowWidth = window.outerWidth;
      window.addEventListener("resize", this.setWindowWidth);
    }

    this.$axios
      .get('/mainBanners')
      .then(res => {
        this.banners = res.data.data;
      })
  },

}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    position: relative;
    height: 100px;
    padding-top: 10px;

    &__wrapper {
      position: relative;
      top: 0;
      z-index: 2;

      .bg {
        background: url("~/static/images/stars-bg.png"), #202536;
        background-position: top center;
        background-repeat: no-repeat;
        background-size: 100%;
        opacity: 1;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;

        &.hide {
          opacity: 0;
        }
      }
    }

    &__logo {
      width: 134px;
      height: 100%;
      flex-shrink: 0;

      @media(max-width: 1024px) {
        width: 100px;
        height: 67px;
      }

      img {
        max-width: 100%;
        height: 100%;
      }
    }

    &__shop {
      display: flex;
      background: #fff;
      width: 100%;
      height: 100%;

      &-wrapper {
        width: 100%;
        height: 500px;
        z-index: 2;
        position: absolute;
        left: 0;
        right: 0;
        padding-top: 25px;
        cursor: default;
      }

      &-left {
        background: url("~/static/images/header-shop-left.jpg");
        background-size: cover;
        width: 209px;
        height: 100%;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding: 60px 26px 26px 26px;

        .v-btn {
          color: #ffffff !important;
          font-weight: 700;
          font-size: 18px;
          text-transform: none;
        }
      }

      &-content {
        padding: 54px 51px;
        display: flex;

        @media(max-width: 1264px) {
          padding: 30px;
        }
      }

      &-category {
        display: flex;
        flex-direction: column;

        &:not(:last-of-type) {
          margin-right: 30px;
        }

        &--title {
          color: #000 !important;
          font-size: 24px !important;
          font-weight: 700;
          margin-bottom: 17px;
        }

        &--sub {
          color: #000 !important;
          font-size: 16px !important;
          margin-bottom: 10px;
          transition: .3s;

          &:hover {
            color: #F6C76F !important;
          }
        }
      }
    }

    &__nav {
      margin: auto 30px 10px 15px;

      ul {
        display: flex;
        align-items: center;

        li {
          font-size: 18px;
          color: #FFFFFF;
          transition: .3s;
          cursor: pointer;

          @media(max-width: 1024px) {
            font-size: 14px;

            .v-icon {
              font-size: 24px !important;
            }
          }

          &.lg {
            display: none;
          }

          @media (min-width: 1264px) {
            &.lg {
              display: flex;
            }
          }

          &:hover {
            color: #F6C76F;

            a {
              color: #F6C76F;
            }

            .v-icon {
              color: #F6C76F !important;
            }
          }

          .v-icon {
            margin-right: 12px;
            transition: .3s;
          }

          &:not(:last-of-type) {
            margin-right: 36px;
          }

          a {
            font-size: 18px;
            color: #FFFFFF;
            transition: .3s;
            display: flex;
            align-items: center;

            @media(max-width: 1024px) {
              font-size: 14px;
            }
          }
        }
      }
    }

    &__search {
      width: 150px;
      margin-left: auto;
      margin-top: auto;
      margin-bottom: 5px;
    }

    &__cart {
      display: flex;
      align-items: center;
      margin-left: 36px;
      height: 32px;
      margin-top: auto;
      margin-bottom: 10px;

      &:hover {

        span {
          color: #F6C76F;
        }

        .header__cart-icon {
          svg path {
            fill: #F6C76F;
          }
        }
      }

      &-icon {
        position: relative;
        width: 23px;
        height: 28px;

        svg path {
          transition: .3s;
        }

        .badge {
          padding: 1px 7px;
          background-color: #FF4B55;
          font-size: 13px;
          color: #fff;
          text-align: center;
          font-weight: 700;
          border-radius: 5px;
          position: absolute;
          top: -4px;
          right: -14px;
          height: 17px !important;
          line-height: 17px !important;
          display: flex;
          align-items: center;
        }
      }

      span {
        font-weight: 700;
        font-size: 18px;
        margin-left: 22px;
        color: #fff;
        transition: .3s;

        @media(max-width: 1024px) {
          font-size: 14px;
          margin-left: 16px;
        }
      }
    }

    &__contacts {
      position: absolute;
      right: 0;
      top: 5px;
      display: flex;
      align-items: center;

      &-phone {
        font-size: 18px;
        color: #fff;
        transition: .3s;
        height: 22px;
        line-height: 1;

        @media(max-width: 1024px) {
          font-size: 14px;
        }

        &:hover {
          color: #F6C76F;
        }
      }
    }

    &__breadcrumbs {
      z-index: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      margin-top: 34px;
      margin-bottom: 10px;

      &-links {
        display: flex;
        align-items: center;
      }

      &-link {
        color: #ffffff !important;
        font-size: 24px;
        font-weight: 700;
        padding-right: 24px;
        margin-right: 17px;
        position: relative;
        font-family: "Montserrat", sans-serif;
        display: flex;
        align-items: center;

        &:before {
          content: '›';
          position: absolute;
          right: 0;
          font-size: 36px;
          margin-bottom: 4px;
          font-weight: 500;
        }

        a {
          color: #ffffff !important;
        }
      }

      &-current {
        color: #ffffff !important;
        font-size: 48px;
        font-weight: 700;
        font-family: "Montserrat", sans-serif;
        text-transform: capitalize;
      }
    }

    &__slider {
      height: 460px;
      display: flex;
      margin-top: 50px;
      margin-bottom: 47px;

      &-slider {
        max-width: 820px;
        flex-grow: 1;
        margin-right: 28px;
        height: 100%;
        border-radius: 5px;
      }

      &-banner {
        height: 100%;
        padding: 30px 62px 30px 30px;
        display: flex !important;
        align-items: flex-start;

        &--title {
          font-size: 48px;
          line-height: 1.2;
          color: #ffffff;
          font-weight: 700;
          font-family: "Montserrat", sans-serif;
          z-index: 1;
          position: relative;
          max-width: 60%;
          margin-right: 20px;
        }

        a {
          border: 1px solid #fff;
          border-radius: 25px;
          height: 50px;
          padding: 15px 32px;
          font-size: 16px;
          text-transform: none;
          font-weight: 700;
          color: #fff;
          font-family: "Montserrat", sans-serif;
          margin-left: auto;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .buttons {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__item {
      display: flex;
      flex-direction: column;
      height: 215px;
      width: 310px;
      background-size: cover;
      background-position: top left;
      border-radius: 5px;
      overflow-x: hidden;
      position: relative;
      padding: 20px;

      &-title {
        font-size: 30px;
        font-weight: 700;
        font-family: "Montserrat", serif;
        line-height: 1;
        margin-bottom: 10px;
      }

      &-text {
        font-family: "Montserrat", sans-serif;
        font-size: 18px;
        font-weight: 700;
        color: #fff;

        span {
          font-weight: 700;
          margin: 0 5px;
        }
      }

      &-link {
        font-weight: 700;
        font-size: 16px;
        color: #202536;
        font-family: "Roboto", sans-serif;
        margin-top: auto;
      }

      &.mnm {
        background-image: url("~/static/images/mnm-button-bg.jpg");
        color: #202536 !important;
        text-decoration: none;

        &:hover {
          color: #202536 !important;
        }
      }

      &.deals {
        background-image: url("~/static/images/deals-button-bg.jpg");
        color: #fff !important;
        text-decoration: none;

        &:hover {
          color: #fff !important;
        }

        .buttons__item-link {
          color: #ffffff;
        }
      }
    }
  }


  .results {
    border: 1px solid #DEE2E6;
    border-radius: 4px;
    overflow: hidden;
    width: 500px;
    position: absolute;
    background: #fff;
    right: 0;
    opacity: 0;
    transition: .3s;
    padding: 20px;
    z-index: 3;
    display: flex;
    flex-direction: column;

    &.active {
      opacity: 1;
    }

    &__title {
      font-weight: 700;
      font-size: 24px;
      color: #333333;
      margin-bottom: 20px;
    }

    &__item {
      color: #333333;
      padding-left: 10px;
      transition: .3s;
      font-weight: 700;

      &:not(:last-of-type) {
        margin-bottom: 10px;
      }

      &:hover {
        color: #F6C76F;
      }
    }

    &__btn {
      height: 40px;
      padding: 2px 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      border: 2px solid #51BC7E;
      border-radius: 5px;
      margin-top: 20px;
      font-size: 18px;
      font-weight: 700;
      transition: .3s;
      color: #333333;

      &:before {
        content: '';
        position: absolute;
        right: 20px;
        width: 54px;
        height: 2px;
        background: #333333;
        transition: .3s;
        margin-top: -2px;
      }

      &:after {
        content: '';
        position: absolute;
        right: 20px;
        width: 8px;
        height: 8px;
        border-right: 2px solid #333333;
        border-bottom: 2px solid #333333;
        transform: rotate(-45deg);
        transition: .3s;
        margin-top: -2px;
      }

      &:hover {
        background: #51BC7E;
        color: #fff;

        &:before {
          background: #fff;
        }

        &:after {
          border-color: #fff;
        }
      }
    }
  }
</style>
