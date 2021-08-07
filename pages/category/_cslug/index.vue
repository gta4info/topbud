<template>
  <div class="page">
    <div class="loading" v-if="!Object.keys(categories).length || loading">
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
            <li><nuxt-link to="/shop">Shop</nuxt-link></li>
            <li>{{ category.name }}</li>
          </ul>
        </nav>
      </v-container>

      <div class="products">
        <v-container>
          <v-row v-if="category.subs.length">
            <v-col md="3" sm="12" v-for="(item, i) in category.subs" :key="i">
              <SubCategoryCard :category="category" :sub="item"/>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col md="3" sm="12" v-for="(product, i) in products" :key="i">
              <ProductCard :product="product"/>
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
    'SubCategoryCard': () => import('@/components/shop/SubCategoryCard'),
    'ProductCard': () => import('@/components/shop/ProductCard'),
  },
  data: () => ({
    products: [],
    category: {},
    loading: false
  }),
  computed: {
    ...mapGetters({
      categories: 'shop/categories'
    }),
  },
  watch: {
    categories() {
      this.category = this.categories.find(item => item.slug === this.$route.params.cslug);
      console.log(this.category)
      if(!this.category.subs.length) {
        this.getProducts();
      }
    }
  },
  methods: {
    async getProducts() {
      this.loading = true;
      await this.$axios
        .get(`/products?cid=${this.category.id}`)
        .then(res => {
          let arr = [];
          Object.keys(res.data).map(key => {
            res.data[key].img = `http://31.186.250.216:8000/${res.data[key].img}`;
            arr.push(res.data[key]);
          });
          this.products = arr;
          this.loading = false;
        })
    }
  },
  created () {
    if(this.categories.length) {
      this.category = this.categories.find(item => item.slug === this.$route.params.cslug);
      if(Object.keys(this.category).length &&!this.category.subs.length) {
        this.getProducts();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .products {
    margin-bottom: 60px;
  }
</style>
