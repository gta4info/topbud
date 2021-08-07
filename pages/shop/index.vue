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
            <v-col md="3" sm="12" v-for="category in categories" :key="category.id">
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
    margin: 60px 0;
  }
</style>
