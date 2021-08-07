<template>
  <div class="page">
    <div class="loading" v-if="loading">
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
            <li><nuxt-link :to="{name: 'category-cslug', params: {cslug: category.slug}}">{{ category.name }}</nuxt-link></li>
            <li>{{ sub.name }}</li>
          </ul>
        </nav>
      </v-container>

      <div class="products">
        <v-container>
          <v-row v-if="products.length">
            <v-col md="3" sm="12" v-for="(product, i) in products" :key="i">
              <ProductCard :product="product"/>
            </v-col>
          </v-row>
          <p class="text-center" v-else>No products found in this category</p>
        </v-container>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    'ProductCard': () => import('@/components/shop/ProductCard'),
  },
  data() {
    return {
      products: [],
      category: {},
      sub: {},
      loading: true,
    }
  },
  computed: {
    ...mapGetters({
      categories: 'shop/categories'
    })
  },
  watch: {
    categories() {
      if(this.categories.length) {
        this.getProducts();
      }
    }
  },
  methods: {
    getProducts() {
      this.loading = true;
      let category = this.categories.find(item => item.slug === this.$route.params.cslug);
      let sub = category.subs.find(item => item.slug === this.$route.params.sslug);
      this.category = category;
      this.sub = sub;
      if(!category) {
        this.categories.map(item => {
          item.subs.map(subItem => {
            if(subItem.slug === this.$route.params.cslug) {
              sub = {
                id: subItem.id,
                name: subItem.name,
                slug: subItem.slug
              }
              category = {
                id: item.id,
                name: item.name,
                slug: item.slug
              }
            }
          });
        })
      }
      this.category = category;
      this.sub = sub;
      let params = '';
      if(category.id) {
        params += `cid=${category.id}`;
      }
      if(sub.id) {
        params += `&sid=${sub.id}`;
      }
      this.$axios
        .get(`/products?${params}`)
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
      this.getProducts();
    }
  }
}
</script>

<style lang="scss" scoped>
  .products {
    margin-bottom: 60px;
  }
</style>
