<template>
  <div class="page">
    <div class="goBack" @click="$router.back()">Go back</div>
    <section class="buttons">
      <v-container>
        <v-row>
          <v-col sm="12" md="6">
            <nuxt-link to="/shop/mix" class="buttons__item mnm" v-ripple>
              <div class="buttons__item-title">Mix’n’Match</div>
              <div class="buttons__item-text">add a lot of buds with <span>lower</span> price</div>
            </nuxt-link>
          </v-col>
          <v-col sm="12" md="6">
            <nuxt-link to="/shop/deals" class="buttons__item deals" v-ripple>
              <div class="buttons__item-title">Oz Deals</div>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <div class="categories">
      <v-container>
        <v-row v-if="$vuetify.breakpoint.mdAndUp">
          <v-col cols="4" v-for="category in categories" :key="category.id">
            <CategoryCard :category="category"/>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col style="padding: 10px;" cols="12" v-for="category in categories" :key="category.id">
            <CategoryCardMobile :category="category"/>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  scrollToTop: true,
  head: {
    title: 'Weed delivery 🚬 in Toronto, best prices — TOPBUD store',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'TOPBUD store offer to you weeds in Toronto ✔ Best prices ✔ Weed delivery'
      }
    ]
  },
  components: {
    'CategoryCard': () => import('@/components/shop/CategoryCard'),
    'CategoryCardMobile': () => import('@/components/shop/CategoryCardMobile'),
  },
  data: () => ({
    breadcrumbs: [
      {
        link: '/',
        title: 'home'
      },
      {
        link: null,
        title: 'categories'
      },
    ]
  }),
  computed: {
    ...mapGetters({
      categories: 'shop/categories'
    })
  },
  created () {
    this.$root.$emit('set-breadcrumbs', this.breadcrumbs);
  }
}
</script>

<style lang="scss" scoped>
  .categories {

  }

  .buttons {
    margin-bottom: 36px;

    @media(max-width: 768px) {
      display: none;
    }

    &__content {
      display: flex;
      justify-content: space-between;
    }

    &__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 160px;
      background-size: cover;
      background-position: top left;
      border-radius: 5px;
      overflow-x: hidden;
      position: relative;

      &-title {
        font-size: 48px;
        font-family: "Courgette", serif;
        line-height: 1;
      }

      &-text {
        font-family: "Montserrat", sans-serif;
        font-size: 15px;
        font-weight: 500;

        span {
          font-weight: 700;
          margin: 0 5px;
        }
      }

      &.mnm {
        background-image: url("~/static/images/mnm-button-bg.jpg");
        color: #202536 !important;
        text-decoration: none;
        padding-left: 223px;

        &:before {
          content: '';
          position: absolute;
          background-image: url("~/static/images/mnm-button-img.png");
          background-repeat: no-repeat;
          background-position: top 28px left 29px;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          @media(max-width: 768px) {
            background-size: 110px;
            background-position: top 0 left 0;
          }
        }

        @media(max-width: 768px) {
          padding-left: 0;
          align-items: center;
        }

        &:hover {
          color: #202536 !important;
        }

        .buttons__item-title {
          margin-top: 20px;
        }
      }

      &.deals {
        background-image: url("~/static/images/deals-button-bg.jpg");
        color: #fff !important;
        text-decoration: none;
        padding-left: 194px;

        &:before {
          content: '';
          position: absolute;
          background-image: url("~/static/images/deals-button-img.png");
          background-repeat: no-repeat;
          background-position: top 31px left 73px;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          @media(max-width: 768px) {
            background-size: contain;
            background-position: top 50px left 0;
          }
        }

        @media(max-width: 768px) {
          padding-left: 0;
          align-items: center;
        }

        &:hover {
          color: #fff !important;
        }
      }
    }
  }
</style>
