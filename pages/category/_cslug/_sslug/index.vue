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
          <v-row>
            <v-col md="2" sm="12">
              <Filters :min="min" :max="max" :range="range"/>
            </v-col>
            <v-col md="10" sm="12">
              <v-container>
                <v-row v-if="products.length">
                  <v-col md="3" sm="12" v-for="product in products" :key="product.slug">
                    <ProductCard :product="product" :key="product.slug"/>
                  </v-col>
                </v-row>
                <p class="text-center" v-else>No products with selected filters was found</p>
              </v-container>
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
    'ProductCard': () => import('@/components/shop/ProductCard'),
    'Filters': () => import('@/components/shop/Filters'),
  },
  async asyncData({$axios, params, store}) {
    let category = store.state.shop.categories.find(item => item.slug === params.cslug);
    let sub = category.subs.find(item => item.slug === params.sslug);

    const data = await $axios.$get(`/products?cid=${category.id}&sid=${sub.id}`);

    let products = [];
    let min = 0, max = 0;

    Object.keys(data.products).map(key => {
      data.products[key].search = {
        cslug: category.slug,
        sslug: sub.slug,
      }
      data.products[key].img = `http://31.186.250.216:8000/${data.products[key].img}`
      products.push(data.products[key])

      data.products[key].prices.map(price => {
        if (price.deal_price) {
          if (min > price.deal_price) {
            min = price.deal_price;
          }
          if (max < price.deal_price) {
            max = price.deal_price;
          }
        } else {
          if (min > price.price) {
            min = price.price;
          }
          if (max < price.price) {
            max = price.price;
          }
        }
      })
    })

    if (min === 0) {
      min = products.length ? products[0].prices[0].price : 0
    }

    min = Math.ceil(min - 1);
    max = Math.ceil(max + 1);

    let range = [min, max];

    let loading = false;

    return {products, category, sub, min, max, range, loading}
  },
  data() {
    return {
      loadingFiltered: false
    }
  },
  computed: {
    ...mapGetters({
      categories: 'shop/categories'
    })
  },
  watch: {
    range() {
      this.getFilteredProducts();
    }
  },
  methods: {
    getFilteredProducts () {
      if (this.loadingFiltered) return;

      let data = {
        min: this.range[0],
        max: this.range[1]
      }

      this.loadingFiltered = true
      this.$axios
        .post(`/products?cid=${this.category.id}&sid=${this.sub.id}`, data)
        .then(res => {
          let arr = []
          Object.keys(res.data.products).map(key => {
            res.data.products[key].search = {
              cslug: this.category.slug,
              sslug: this.sub.slug,
            }
            res.data.products[key].img = `http://31.186.250.216:8000/${res.data.products[key].img}`
            arr.push(res.data.products[key])
          })

          this.products = arr

          this.loadingFiltered = false
        })
    }
  },
  created () {
    this.$root.$on('change-filter-range', data => {
      this.range = data;
    })
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
