<template>
  <v-container>
    <div class="header">
      <nuxt-link to="/" class="header__logo">
        <img src="@/static/images/logo.png" alt="TOPBUD Store">
      </nuxt-link>
      <nav class="header__nav">
        <ul>
          <v-hover v-slot="{ hover }" close-delay="200">
            <li style="cursor:default;">
              <div style="display:flex;align-items:center;">
                <v-icon color="#fff">mdi-menu</v-icon>Shop
              </div>
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
                          >
                            {{category.name}}
                          </nuxt-link>
                          <template v-if="category.subs.length">
                            <nuxt-link
                              :to="{name: 'category-cslug-sslug', params: {cslug: category.slug, sslug: sub.slug}}"
                              class="header__shop-category--sub"
                              v-for="(sub, index) in category.subs"
                              :key="index"
                            >
                              {{sub.name}}
                            </nuxt-link>
                          </template>
                          <nuxt-link :to="{name: 'category-cslug', params: {cslug: category.slug}}" class="header__shop-category--sub">
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
          <li class="lg">
            <nuxt-link to="/about">About Us</nuxt-link>
          </li>
          <li class="lg">
            <nuxt-link to="/delivery">Delivery info</nuxt-link>
          </li>
          <li class="lg">
            <nuxt-link to="/blog">Blog</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/shop/mix">Mix'N'Match</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/shop/deals">OZ deals</nuxt-link>
          </li>
<!--          <li>-->
<!--            <nuxt-link to="/">How to order?</nuxt-link>-->
<!--          </li>-->
        </ul>
      </nav>
      <div class="header__search new">
        <v-text-field
          v-model="search"
          label="search"
          prepend-inner-icon="mdi-magnify"
          dense
          solo
          hide-details
          @keydown.enter="submitSearch"
          @click:prepend-inner="submitSearch"
        />
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
        <a href="tel:+14163884091" class="header__contacts-phone">+1 (416) 388 - 4091</a>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderNew',
  data: () => ({
    showShop: false,
    search: '',
    windowWidth: null,
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
  methods: {
    submitSearch() {
      if(this.search.length) {
        this.$router.push({name: 'shop-search', query: {q: this.search}})
      }
    },
    setWindowWidth() {
      this.windowWidth = window.outerWidth;
    }
  },
  created () {
    if (process.browser) {
      this.windowWidth = window.outerWidth;
      window.addEventListener("resize", this.setWindowWidth);
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
    height: 100px;
    padding-top: 10px;

    &__logo {
      width: auto;
      height: 100%;
      flex-shrink: 0;

      @media(max-width: 1024px) {
        width: 100px;
        height: 67px;
      }

      img {
        width: 100%;
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
        z-index: 1;
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
      margin: 0 30px 0 50px;
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
    }

    &__cart {
      display: flex;
      align-items: center;
      margin-left: 36px;

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
          display: inline-block;
          border-radius: 5px;
          position: absolute;
          top: -4px;
          right: -14px;
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

        @media(max-width: 1024px) {
          font-size: 14px;
        }

        &:hover {
          color: #F6C76F;
        }
      }
    }
  }
</style>
