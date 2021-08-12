<template>
  <v-container class="header-wrap" fluid :class="{'show': categories.length}">
    <header class="header">
      <v-container>
        <nuxt-link to="/" class="header__logo">
          <img src="@/static/images/logo.png" alt="TOPBUD">
        </nuxt-link>
        <nav class="header__nav">
          <ul>
            <!--Categories with sub categories-->
            <li v-for="category in computedCategories.filter(item => item.subs && item.subs.length)" :key="category.slug">
              <!--Dropdown-->
              <v-menu v-if="category.subs" offset-y open-on-hover content-class="header__dropdown" close-delay="150">
                <template v-slot:activator="{on}">
                  <span v-on="on" class="header__dropdown-activator" @click="goToCategory(category.slug)" :class="{'active': category.active}">{{category.name}}</span>
                </template>
                <div
                  v-for="item in category.subs"
                  :key="item.slug"
                  class="header__dropdown-item"
                >
                  <nuxt-link :to="`/category/${category.slug}/${item.slug}`" active-class="active">{{item.name}}</nuxt-link>
                </div>
              </v-menu>
            </li>
            <!--Categories without sub categories-->
            <li>
              <!--Dropdown-->
              <v-menu offset-y open-on-hover content-class="header__dropdown" close-delay="150">
                <template v-slot:activator="{on}">
                  <span v-on="on" class="header__dropdown-activator" :class="{'active': othersState}">Other</span>
                </template>
                <div v-for="category in otherCategories" :key="category.slug" class="header__dropdown-item">
                  <nuxt-link :to="{name: 'category-cslug', params: {cslug: category.slug}}" active-class="active">{{category.name}}</nuxt-link>
                </div>
              </v-menu>
            </li>
            <!--Info menu-->
            <li>
              <v-menu offset-y open-on-hover content-class="header__dropdown" close-delay="150">
                <template v-slot:activator="{on}">
                  <span v-on="on" class="header__dropdown-activator" :class="{'active': infoState}">Info</span>
                </template>
                <div v-for="link in info" :key="link.link" class="header__dropdown-item">
                  <nuxt-link :to="`/${link.link}`" active-class="active">{{link.title}}</nuxt-link>
                </div>
              </v-menu>
            </li>
          </ul>
        </nav>

        <Search />

        <div class="header__buttons">
          <nuxt-link to="/shop/deals" v-ripple>OZ DEALS</nuxt-link>
          <a href="tel:4932-2231-3433" v-ripple>4932-2231-3433</a>
        </div>
      </v-container>
    </header>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    components: {
      'Search': () => import('@/components/shop/Search')
    },
    data: () => ({
      states: [],
      othersState: false,
      infoState: false,
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
        return this.categories.filter(item => item.slug !== 'cartridges' && item.slug !== 'vape-pens')
      },
      otherCategories() {
        return this.categories.filter(item => (item.subs && !item.subs.length) || (item.slug === 'cartridges' || item.slug === 'vape-pens'))
      }
    },
    methods: {
      goToCategory(slug) {
        this.$router.push({name: 'category-cslug', params: {cslug: slug}})
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
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    height: 100%;

    .container {
      height: 100%;
      display: flex;
      align-items: center;
    }

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
    }

    &__logo {
      display: flex;
      align-items: center;
      margin-right: 30px;
      img {
        height: 80px;
        width: auto;
      }
    }

    &__nav {
      margin-right: auto;
      ul {
        display: flex;
        li {
          margin-right: 20px;
          text-transform: uppercase;
          font-size: 15px;
          font-weight: 900;
          color: #cbe1be;
          cursor: pointer;

          @media(max-width: 1400px) {
            font-size: 12px;
          }

          a {
            color: #cbe1be;
          }
        }
      }
    }

    &__dropdown {
      margin-top: 20px;
      background: #000;
      padding: 10px 0;
      color: #fff !important;
      text-transform: uppercase;
      font-size: 15px;
      font-weight: 900;

      &-item {
        display: flex;
        align-items: center;
        transition: .3s;
        height: 30px;
        &:hover {
          background: #262626;
        }
      }

      a {
        padding: 0 20px;
        width: 100%;
        transition: .3s;
        color: #fff;

        &:hover, &.active {
          color: #cbe1be !important;
        }
      }

      &-activator {
        position: relative;
        display: flex;
        align-items: center;
        padding-right: 14px;

        &:before {
          content: '▼';
          position: absolute;
          right: 0;
          font-size: 7px;
          transition: .3s ease;
        }

        &.active {
          &:before {
            transform: rotate(180deg);
            margin-top: -1px;
          }
        }
      }
    }

    &__buttons {
      display: flex;

      a {
        color: #ffffff;
        border: 3px solid #cbe1be;
        border-radius: 30px;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 30px;
        font-weight: 900;
        transition: .3s ease;
        background: transparent;
        flex-shrink: 0;

        &:hover {
          background: #cbe1be;
        }

        &:not(:last-child) {
          margin-right: 10px;
        }
      }
    }
  }
</style>
