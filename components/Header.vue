<template>
  <v-container class="header-wrap" fluid>
    <v-container>
      <header class="header">
        <nuxt-link to="/" class="header__logo">
          <img src="@/static/images/logo.png" alt="TOPBUD">
        </nuxt-link>

        <nav class="header__nav">
          <ul>
            <li v-for="(group, i) in nav" :key="i">
              <!--Dropdown-->
              <v-menu v-if="group.category" v-model="group.active" offset-y open-on-hover content-class="header__dropdown" close-delay="150">
                <template v-slot:activator="{on}">
                  <span v-on="on" class="header__dropdown-activator" :class="{'active': group.active}">{{group.category}}</span>
                </template>
                <div
                  v-for="(item, i) in group.items"
                  :key="i"
                >
                  <nuxt-link :to="`/category/${item.title}`" active-class="active">{{item.title}}</nuxt-link>
                </div>
              </v-menu>
              <!--Single-->
              <nuxt-link :to="`/category/${group.title}`" active-class="active">{{group.title}}</nuxt-link>
            </li>
          </ul>
        </nav>

        <div class="header__buttons">
          <nuxt-link to="/category/deals" v-ripple>OZ DEALS</nuxt-link>
          <a href="tel:4932-2231-3433" v-ripple>4932-2231-3433</a>
        </div>
      </header>
    </v-container>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      nav: [
        {
          active: false,
          category: 'Flower',
          items: [
            {
              title: 'Indica',
            },
            {
              title: 'Indica dominant hybrid',
            },
            {
              title: 'Sativa'
            },
            {
              title: 'Dominant hybrid'
            },
            {
              title: 'Hybrid',
            },
            {
              title: 'Pre-rolls',
            }
          ],
        },
        {
          active: false,
          category: 'Edibles',
          items: [
            {
              title: 'Beverages',
            },
            {
              title: 'Candy',
            },
            {
              title: 'Chips and snacks',
            },
            {
              title: 'Chocolate',
            },
            {
              title: 'Cookies',
            },
            {
              title: 'Gummies',
            },
            {
              title: 'Tintures and oils',
            }
          ],
        },
        {
          active: false,
          category: 'Concentrate',
          items: [
            {
              title: 'Capsules and tablets',
            },
            {
              title: 'Diamonds',
            },
            {
              title: 'Distlillate and oils',
            },
            {
              title: 'Hash',
            },
            {
              title: 'Sause',
            },
            {
              title: 'Shatter',
            }
          ],
        },
        {
          active: false,
          category: 'Vapes',
          items: [
            {
              title: 'Carteidges',
            },
            {
              title: 'Disposables',
            },
            {
              title: 'Vape batteries',
            },
          ],
        },
        {
          title: 'Accessories'
        },
        {
          title: 'Topicals & tinctures'
        }
      ]
    })
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
      background: rgba(#000, .5);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;

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
          font-size: 12px;
          font-weight: 900;
          color: #cbe1be;
          cursor: pointer;
        }
      }
    }

    &__dropdown {
      margin-top: 20px;
      background: #000;
      padding: 10px;
      color: #fff !important;
      text-transform: uppercase;
      font-size: 12px;
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
