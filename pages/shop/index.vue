<template>
  <div class="page">
    <div class="loading" v-if="!categories.length">
      <v-progress-circular
        indeterminate
        color="#699551"
        size="30"
      />
    </div>
    <template v-else>
      <v-container>
        <h1>Shop categories</h1>
        <nav class="breadcrumbs">
          <ul>
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li>Shop</li>
          </ul>
        </nav>
      </v-container>
      <div class="categories">
        <v-container>
          <v-row>
            <v-col cols="12" md="3" sm="6" v-for="category in categories" :key="category.id">
              <CategoryCard :category="category"/>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
  },
  computed: {
    ...mapGetters({
      categories: 'shop/categories'
    })
  }
}
</script>

<style lang="scss" scoped>
  .categories {
    margin-bottom: 60px;

    @media(max-width: 768px) {
      margin-top: 0;

      .col-sm-6 {
        max-width: 50%;
      }
    }
  }
</style>
