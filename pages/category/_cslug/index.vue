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
            <li>
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/shop">Shop</nuxt-link>
            </li>
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
            <v-col md="2" sm="12">
              <Filters :min="min" :max="max" :range="range"/>
            </v-col>
            <v-col md="10" sm="12">
              <v-container>
                <div class="loading" v-if="loadingFiltered">
                  <v-progress-circular
                    indeterminate
                    color="#699551"
                    size="30"
                  />
                </div>
                <v-row v-else-if="products.length">
                  <v-col md="3" sm="12" v-for="product in products" :key="product.slug">
                    <ProductCard :product="product" :key="product.slug"/>
                  </v-col>
                </v-row>
                <p class="text-center" v-else>No products with selected filters was found</p>
              </v-container>
            </v-col>
          </v-row>
          <p class="text-center" v-else>No products was found in this category</p>
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
    'Filters': () => import('@/components/shop/Filters'),
  },
  data: () => ({
    products: [],
    category: {},
    loading: false,
    loadingFiltered: false,
    min: 0,
    max: 0,
    range: [0, 0],
    filteredProducts: []
  }),
  computed: {
    ...mapGetters({
      categories: 'shop/categories'
    }),
  },
  watch: {
    categories () {
      this.category = this.categories.find(item => item.slug === this.$route.params.cslug)
      if (!this.category.subs.length) {
        this.getProducts()
      }
    },
    range () {
      if (this.range[1] > 0) {
        this.getFilteredProducts()
      }
    },
  },
  methods: {
    getProducts () {
      this.loading = true;

      let category = this.categories.find(item => item.slug === this.$route.params.cslug);
      this.category = category;

      this.$axios
        .get(`/products?cid=${category.id}`)
        .then(res => {
          let arr = [];
          let min = 0, max = 0;

          Object.keys(res.data.products).map(key => {
            let category = this.categories.find(item => item.id === res.data.products[key].category_id)
            let sub = res.data.products[key].subcategory_id ? category.subs.find(item => item.id === res.data.products[key].subcategory_id) : null

            res.data.products[key].search = {
              cslug: category.slug,
              sslug: sub ? sub.slug : null,
            }
            res.data.products[key].img = `http://31.186.250.216:8000/${res.data.products[key].img}`
            arr.push(res.data.products[key])

            res.data.products[key].prices.map(price => {
              if(price.deal_price) {
                if(min > price.deal_price) {
                  min = price.deal_price;
                }
                if(max < price.deal_price) {
                  max = price.deal_price;
                }
              } else {
                if(min > price.price) {
                  min = price.price;
                }
                if(max < price.price) {
                  max = price.price;
                }
              }
            })
          })

          this.min = min;
          this.max = max;
          this.range = [min,max];

          this.products = arr

          this.loading = false
        })
    },
    getFilteredProducts () {
      if (this.loadingFiltered) return;

      let data = {
        min: this.range[0],
        max: this.range[1]
      }

      this.loadingFiltered = true
      this.$axios
        .post(`/products?cid=${this.category.id}`, data)
        .then(res => {
          let arr = []
          Object.keys(res.data.products).map(key => {
            let category = this.categories.find(item => item.id === res.data.products[key].category_id)
            let sub = res.data.products[key].subcategory_id ? category.subs.find(item => item.id === res.data.products[key].subcategory_id) : null

            res.data.products[key].search = {
              cslug: category.slug,
              sslug: sub ? sub.slug : null,
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
    if (this.categories.length) {
      this.category = this.categories.find(item => item.slug === this.$route.params.cslug)
      if (Object.keys(this.category).length && !this.category.subs.length) {
        this.getProducts()
      }
    }

    this.$root.$on('change-filter-range', data => {
      this.range = data
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
