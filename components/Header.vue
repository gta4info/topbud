<template>
  <v-container class="header-wrap" fluid :class="{'show': categories.length}">
    <v-container>
      <header class="header">
        <nuxt-link to="/" class="header__logo">
          <img src="@/static/images/logo.png" alt="TOPBUD">
        </nuxt-link>
        <nav class="header__nav">
          <ul>
            <!--Categories with sub categories-->
            <li v-for="category in computedCategories.filter(item => item.subs && item.subs.length)" :key="category.slug">
              <!--Dropdown-->
              <v-menu v-if="category.subs" v-model="category.active" offset-y open-on-hover content-class="header__dropdown" close-delay="150">
                <template v-slot:activator="{on}">
                  <span v-on="on" class="header__dropdown-activator" :class="{'active': category.active}">{{category.name}}</span>
                </template>
                <div
                  v-for="item in category.subs"
                  :key="item.slug"
                >
                  <nuxt-link :to="`/category/${category.slug}/${item.slug}`" active-class="active">{{item.name}}</nuxt-link>
                </div>
              </v-menu>
            </li>
            <!--Categories without sub categories-->
            <li>
              <!--Dropdown-->
              <v-menu v-model="othersState" offset-y open-on-hover content-class="header__dropdown" close-delay="150">
                <template v-slot:activator="{on}">
                  <span v-on="on" class="header__dropdown-activator" :class="{'active': othersState}">Other</span>
                </template>
                <div v-for="category in otherCategories" :key="category.slug">
                  <nuxt-link :to="{name: 'category-cslug', params: {cslug: category.slug}}" active-class="active">{{category.name}}</nuxt-link>
                </div>
              </v-menu>
            </li>
            <!--Info menu-->
            <li>
              <v-menu v-model="infoState" offset-y open-on-hover content-class="header__dropdown" close-delay="150">
                <template v-slot:activator="{on}">
                  <span v-on="on" class="header__dropdown-activator" :class="{'active': infoState}">Info</span>
                </template>
                <div v-for="link in info" :key="link.link">
                  <nuxt-link :to="`/${link.link}`" active-class="active">{{link.title}}</nuxt-link>
                </div>
              </v-menu>
            </li>
          </ul>
        </nav>

        <Search />

        <div class="header__buttons">
          <nuxt-link to="/category/deals" v-ripple>OZ DEALS</nuxt-link>
          <a href="tel:4932-2231-3433" v-ripple>4932-2231-3433</a>
        </div>
      </header>
    </v-container>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    components: {
      'Search': () => import('@/components/shop/Search')
    },
    data: () => ({
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
      background: #111111;
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
        width: 80px;
        height: 80px;
        margin-right: 30px;
      }
    }

    &__nav {
      ul {
        display: flex;
        li {
          margin-right: 20px;
          text-transform: uppercase;
          font-size: 15px;
          font-weight: 900;
          color: #cbe1be;
          cursor: pointer;

          a {
            color: #cbe1be;
          }
        }
      }
    }

    &__dropdown {
      margin-top: 20px;
      background: #000;
      padding: 10px 20px;
      color: #fff !important;
      text-transform: uppercase;
      font-size: 15px;
      font-weight: 900;

      a {
        transition: .3s;
        color: #fff;

        &:hover, &.active {
          color: #cbe1be !important;
        }
      }

      div {
        margin-bottom: 10px;
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
      margin-left: auto;

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
