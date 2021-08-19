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
        <h1>Search</h1>
        <nav class="breadcrumbs">
          <ul>
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><nuxt-link to="/shop">Shop</nuxt-link></li>
            <li><nuxt-link to="/shop/search">Search</nuxt-link></li>
            <li>{{ $route.query.q }}</li>
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
          <p class="text-center" v-else>No products found by the query</p>
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
    'ProductCard': () => import('@/components/shop/ProductCard'),
  },
  data() {
    return {
      products: [],
      category: {},
      sub: {},
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      categories: 'shop/categories'
    })
  },
  watch: {
    categories() {
      if(this.categories.length && this.$route.query.q) {
        this.getProducts();
      }
    },
    '$route.query.q'() {
      this.getProducts();
    }
  },
  methods: {
    getProducts() {
      this.loading = true;
      this.$axios
        .get(`/search?q=${this.$route.query.q}`)
        .then(res => {
          let arr = [];
          Object.keys(res.data).map(key => {
            let category = this.categories.find(item => item.id === res.data[key].category_id);
            let sub = res.data[key].subcategory_id ? category.subs.find(item => item.id === res.data[key].subcategory_id) : null;
            res.data[key].search = {
              cslug: category.slug,
              sslug: sub ? sub.slug : null,
            }
            res.data[key].img = `/${res.data[key].img}`;
            arr.push(res.data[key]);
          });
          this.products = arr;
          this.loading = false;
        })
    }
  },
  created () {
    if(this.categories.length && this.$route.query.q) {
      this.getProducts();
    }
  }
}
</script>

<style lang="scss" scoped>
.products {
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
