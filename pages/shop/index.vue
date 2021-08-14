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
            <v-col sm="12" md="3" v-for="category in categories" :key="category.id">
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
    title: 'Shop categories | TOPBUD store',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Our shop categories of products we offer with TOPBUD store'
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

      .container {

        .row {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
</style>
