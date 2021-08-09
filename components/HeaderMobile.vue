<template>
  <v-container class="header-wrap" fluid :class="{'show': categories.length}">
    <header class="header">
      <nuxt-link to="/" class="header__logo">
        <img src="@/static/images/logo.png" alt="TOPBUD">
      </nuxt-link>

      <v-btn icon class="ml-auto mr-4" @click="dialog = !dialog">
        <v-icon color="#699551" size="40">mdi-hamburger</v-icon>
      </v-btn>

      <div class="mobileMenu" :class="{active: dialog}">
        <v-expansion-panels class="mobileMenu__nav">
          <v-expansion-panel class="mobileMenu__nav-item" v-for="category in computedCategories.filter(item => item.subs && item.subs.length)" :key="category.slug">
            <v-expansion-panel-header>
              <h5 class="mobileMenu__nav-item--title">{{ category.name }}</h5>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div
                v-for="item in category.subs"
                :key="item.slug"
                @click="dialog = false"
              >
                <nuxt-link :to="`/category/${category.slug}/${item.slug}`" active-class="active">{{item.name}}</nuxt-link>
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
                @click="dialog = false"
              >
                <nuxt-link :to="`/category/${category.slug}`" active-class="active">{{category.name}}</nuxt-link>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel class="mobileMenu__nav-item">
            <v-expansion-panel-header>
              <h5 class="mobileMenu__nav-item--title">Info</h5>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-for="link in info" :key="link.link" @click="dialog = false">
                <nuxt-link :to="`/${link.link}`" active-class="active">{{link.title}}</nuxt-link>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <SearchMobile/>

        <div class="header__buttons">
          <nuxt-link to="/shop/deals" v-ripple @click="dialog = false">OZ DEALS</nuxt-link>
          <a href="tel:4932-2231-3433" v-ripple @click="dialog = false">4932-2231-3433</a>
        </div>
      </div>
    </header>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    components: {
      'SearchMobile': () => import('@/components/shop/SearchMobile')
    },
    data: () => ({
      dialog: false,
      navShow: [],
      info: [
        {
          title: 'About US',
          link: 'about'
        },
        {
          title: 'Delivery Information',
          link: 'delivery'
        },
        {
          title: 'Contacts',
          link: 'contacts'
        },
        {
          title: 'Blog',
          link: 'blog'
        },
      ]
    }),
    computed: {
      ...mapGetters({
        categories: 'shop/categories'
      }),
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
    created () {
      this.$root.$on('close-mobile-header', () => this.dialog = false)
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    height: 100%;

    &-wrap {
      padding-top: 0;
      padding-bottom: 0;
      z-index: 2;
      height: 85px;
      background: #262626;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      opacity: 0;
      transition: opacity .5s;

      &.show {
        opacity: 1;
      }

      .container {
        padding: 0;
        height: 100%;
      }
    }

    &__logo {
      display: flex;
      align-items: center;
      img {
        width: 65px;
        height: 65px;
      }
    }

    &__buttons {
      display: flex;
      flex-direction: column;
      width: 100%;

      a {
        color: #ffffff;
        border: 3px solid #cbe1be;
        border-radius: 30px;
        height: 48px;
        display: flex;
        align-items: center;
        padding: 0 30px;
        font-weight: 900;
        transition: .3s ease;
        background: transparent;
        width: 100%;

        &:hover {
          background: #cbe1be;
        }

        &:not(:last-child) {
          margin-bottom: 30px;
        }
      }
    }
  }

  .mobileMenu {
    position: fixed;
    top: 85px;
    right: -100vw;
    background: #262626;
    opacity: 0;
    width: 100%;
    height: calc(100% - 85px);
    padding: 30px 15px;
    transition: .3s;
    border-top: 1px solid #699551;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;

    &.active {
      opacity: 1;
      right: 0;
    }

    &__nav {

      &-item {
        background: #cbe1be !important;

        &--title {
          color: #000;
          font-size: 20px;
        }

        div {
          &:not(:last-child) {
            margin-bottom: 15px;
          }

          a {
            color: #000;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
