<template>
  <header class="header">
    <v-btn icon @click="dialogMenu = true" class="mr-auto">
      <v-icon color="#fff" size="24">mdi-menu</v-icon>
    </v-btn>

    <nuxt-link to="/shop/mix" class="header__link">Mix &<br/> Match</nuxt-link>

    <nuxt-link to="/shop/cart" class="header__cart">
      <div class="header__cart-icon">
        <svg width="23" height="28" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.9866 26.8306L21.2956 7.85593C21.2495 7.33775 20.8184 6.94084 20.3022 6.94084H16.8151V5.35615C16.8151 2.40277 14.4306 0 11.4996 0C8.56878 0 6.18454 2.40277 6.18454 5.35615V6.94084H2.69503C2.17877 6.94084 1.74775 7.33775 1.7016 7.85593L0.00398821 26.9052C-0.0210138 27.1863 0.0723447 27.4649 0.261323 27.6732C0.450301 27.8814 0.717477 28 0.99742 28H22.0026C22.5536 28 23 27.55 23 26.995C22.9999 26.9391 22.9953 26.884 22.9866 26.8306ZM8.17938 5.35615C8.17938 3.51109 9.66887 2.01001 11.4997 2.01001C13.3307 2.01001 14.8203 3.51109 14.8203 5.35615V6.94084H8.17938V5.35615ZM2.08847 25.9901L3.60694 8.95085H6.18454V10.7481C6.18454 11.3031 6.63099 11.7531 7.18196 11.7531C7.73294 11.7531 8.17938 11.3031 8.17938 10.7481V8.95085H14.8203V10.7481C14.8203 11.3031 15.2668 11.7531 15.8178 11.7531C16.3687 11.7531 16.8152 11.3031 16.8152 10.7481V8.95085H19.3904L20.9089 25.9901H2.08847Z" fill="white"/>
          <path d="M19 19.429C19 19.429 17.1394 18.3546 14.8441 18.3546C14.721 18.3546 14.5993 18.3579 14.4789 18.3638C14.6712 18.2076 14.8609 18.0383 15.0445 17.8547C16.6675 16.2317 17.1883 14.1212 17.1883 14.1212C17.1883 14.1212 15.0778 14.642 13.4548 16.265C13.1654 16.5543 12.9113 16.8591 12.6888 17.1647C12.8093 16.4793 12.8885 15.7308 12.8885 14.9468C12.8885 11.6625 11.5 9 11.5 9C11.5 9 10.1115 11.6625 10.1115 14.9468C10.1115 15.7309 10.1908 16.4793 10.3112 17.1647C10.0887 16.8591 9.83453 16.5543 9.54525 16.265C7.92224 14.642 5.81172 14.1212 5.81172 14.1212C5.81172 14.1212 6.33256 16.2317 7.95552 17.8547C8.13906 18.0382 8.32885 18.2075 8.52112 18.3638C8.40077 18.3579 8.27901 18.3546 8.15594 18.3546C5.86064 18.3546 4 19.429 4 19.429C4 19.429 5.86064 20.5033 8.15591 20.5033C8.6655 20.5033 9.15344 20.4502 9.60455 20.3677C9.58662 20.385 9.56878 20.4024 9.55108 20.4201C8.47337 21.4978 8.25364 23.0255 8.25364 23.0255C8.25364 23.0255 9.78127 22.8057 10.859 21.728C10.9118 21.6752 10.9621 21.621 11.0109 21.5662V24H11.9891V21.5662C12.0379 21.621 12.0882 21.6752 12.141 21.7281C13.2188 22.8058 14.7464 23.0255 14.7464 23.0255C14.7464 23.0255 14.5267 21.4979 13.4489 20.4202C13.4312 20.4025 13.4134 20.385 13.3955 20.3678C13.8466 20.4502 14.3345 20.5033 14.8441 20.5033C17.1394 20.5033 19 19.429 19 19.429Z" fill="white"/>
        </svg>
        <div class="badge" v-if="totalCartLength">{{ totalCartLength }}</div>
      </div>
    </nuxt-link>

    <nuxt-link to="/shop/deals" class="header__link">Oz<br/> Deals</nuxt-link>

    <v-btn icon @click="dialogSearch = true" class="ml-auto">
      <v-icon color="#fff" size="34">mdi-magnify</v-icon>
    </v-btn>

    <div class="searchMenu" :class="{active: dialogSearch}">
      <div class="searchMenu__header">
        <v-text-field
          v-model="searchQuery"
          label="search"
          dense
          solo
          hide-details
        />
        <v-btn icon @click="dialogSearch = false" class="ml-4">
          <v-icon color="#000000" size="30">mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="results__items" v-if="results.length">
        <nuxt-link
          class="results__item"
          v-for="(product, i) in results"
          :key="i"
          :to="{name: 'category-cslug-sslug-pslug', params: {
            cslug: product.search.cslug,
            sslug: product.search.sslug ? product.search.sslug : 'product',
            pslug: product.slug
          }}"
          @click.native="dialogSearch = false"
        >
          {{product.name}}
        </nuxt-link>
      </div>
      <div v-else>No products was found by this query!</div>
      <nuxt-link :to="{name: 'shop-search', query: {q: searchQuery}}" class="results__btn" v-ripple v-if="results.length" @click.native="dialogSearch = false">Show all results</nuxt-link>
    </div>

    <div class="mobileMenu" :class="{active: dialogMenu}">
      <div class="mobileMenu__header">
        <v-btn icon @click="dialogMenu = false" class="mt-8">
          <v-icon color="#000000" size="24">mdi-close</v-icon>
        </v-btn>
      </div>
      <a href="tel:14373884091" class="mobileMenu__phone">1 (437) 388 - 4091</a>
      <div class="mobileMenu__scrollable">
        <v-expansion-panels class="mobileMenu__nav">
          <v-expansion-panel class="mobileMenu__nav-item" v-for="category in computedCategories.filter(item => item.subs && item.subs.length)" :key="category.slug">
            <v-expansion-panel-header>
              <h5 class="mobileMenu__nav-item--title">{{ category.name }}</h5>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div
                v-for="item in category.subs"
                :key="item.slug"
                class="mobileMenu__nav-item--link"
              >
                <nuxt-link :to="`/category/${category.slug}/${item.slug}`" active-class="active" @click.native="dialogMenu = false">{{item.name}}</nuxt-link>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel class="mobileMenu__nav-item">
            <v-expansion-panel-header>
              <h5 class="mobileMenu__nav-item--title">Other</h5>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div
                v-for="category in otherCategories"
                :key="category.slug"
                class="mobileMenu__nav-item--link"
              >
                <nuxt-link :to="`/category/${category.slug}`" active-class="active" @click.native="dialogMenu = false">{{category.name}}</nuxt-link>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <nuxt-link to="/about" class="mobileMenu__nav-item--title" style="margin-bottom: 20px;font-weight: 700;align-self: flex-start;" @click.native="dialogMenu = false">About Us</nuxt-link>
        <nuxt-link to="/delivery" class="mobileMenu__nav-item--title" style="margin-bottom: 20px;font-weight: 700;align-self: flex-start;" @click.native="dialogMenu = false">Delivery info</nuxt-link>
        <nuxt-link to="/blog" class="mobileMenu__nav-item--title" style="margin-bottom: 20px;font-weight: 700;align-self: flex-start;" @click.native="dialogMenu = false">Blog</nuxt-link>
      </div>

      <div class="mobileMenu__buttons">
        <v-btn depressed to="/shop/mix" @click="dialogMenu = false">Mix'N'Match</v-btn>
        <v-btn depressed to="/shop/deals" @click="dialogMenu = false">OZ deals</v-btn>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderNew',
  data: () => ({
    dialogSearch: false,
    dialogMenu: false,
    searchQuery: '',
    results: [],
    loadingResults: false,
    awaitingSearch: false,
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
    computedCategories() {
      return this.categories.map(item => {
        item.active = false;
        return item;
      })
    },
    otherCategories() {
      return this.computedCategories.filter(item => item.subs && !item.subs.length).map(item => {
        item.active = false;
        return item;
      })
    }
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
    },
    infoState() {
      if(this.infoState) {
        this.othersState = false;
        this.categories.map(item => {
          item.active = false;
          return item;
        })
        this.computedCategories.filter(item => item.subs && !item.subs.length).map(item => {
          item.active = false;
          return item;
        })
      }
    },
    othersState() {
      if(this.othersState) {
        this.infoState = false;
        this.categories.map(item => {
          item.active = false;
          return item;
        })
        this.computedCategories.filter(item => item.subs && !item.subs.length).map(item => {
          item.active = false;
          return item;
        })
      }
    },
  },
  methods: {
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
    this.$root.$on('close-mobile-header', () => this.dialogMenu = false);
  }
}
</script>

<style lang="scss" scoped>
  .header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: #21AA5B;

    &__link {
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      line-height: 1.1;
      margin: 0 auto;
    }

    &__cart {
      display: flex;
      align-items: center;
      margin: 0 auto;

      @media(max-width: 768px) {
        height: 28px;
      }

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

        @media(max-width: 768px) {
          height: 28px;
        }

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
    }
  }

  .mobileMenu {
    position: fixed;
    top: 0;
    bottom: 0;
    right: -100vw;
    background: #fff;
    opacity: 0;
    width: 100%;
    padding: 0 25px 60px 30px;
    transition: .3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    z-index: 1;

    &.active {
      opacity: 1;
      right: 0;
    }

    &__header {
      height: 85px;
      display: flex;
      align-items: center;
      width: 100%;
      position: sticky;
      top: 0;
      background: #fff;
      flex-shrink: 0;
      z-index: 2;
    }

    &__scrollable {
      overflow-y: auto;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }

    &__phone {
      font-size: 18px;
      color: #333;
      margin-bottom: 30px;
    }

    &__buttons {
      display: flex;
      justify-content: space-between;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 10px 30px;
      background: #21AA5B;

      .v-btn {
        width: calc(50% - 7px);
        height: 40px !important;
        background-color: #F6C76F !important;
        font-size: 14px !important;
        text-transform: none;
        color: #071F41 !important;
        font-weight: 700;
      }
    }

    &__nav {

      &-item {
        background: transparent !important;
        margin-bottom: 24px;

        &:before {
          display: none;
        }

        .v-expansion-panel-header {
          padding: 0;
        }

        &--link {
          height: auto;
          border: 0;
          margin-bottom: 20px;

          a {
            width: 100%;
            color: #000;
            font-size: 18px;
            height: 100%;
            display: flex;
            align-items: center;
          }

          .v-expansion-panel-header {
            padding: 0 !important;
          }
        }

        &--title {
          color: #000;
          font-size: 20px;
          text-align: left;
          transition: .3s;
        }
      }
    }
  }

  .searchMenu {
    position: fixed;
    top: 0;
    bottom: 0;
    right: -100vw;
    background: #fff;
    opacity: 0;
    width: 100%;
    padding: 30px 35px;
    transition: .3s;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 1;

    &.active {
      opacity: 1;
      right: 0;
    }

    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
    }
  }

  .results {
    display: flex;
    width: 100%;
    flex-direction: column;
    height: 100%;

    &__items {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      margin-bottom: 20px;
    }

    &__item {
      color: #333333;
      padding-left: 10px;
      transition: .3s;
      font-size: 18px;

      &:not(:last-of-type) {
        margin-bottom: 15px;
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
      font-size: 18px;
      font-weight: 700;
      transition: .3s;
      color: #333333;
      margin-top: auto;

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
