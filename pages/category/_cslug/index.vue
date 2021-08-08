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
          <v-row v-else-if="products.length">
            <v-col md="2" sm="12">
              <Filters :min="min" :max="max" :range="range"/>
            </v-col>
            <v-col md="10" sm="12">
              <v-container>
                <v-row v-if="filteredProducts.length">
                  <v-col md="3" sm="12" v-for="(product, i) in filteredProducts" :key="i">
                    <ProductCard :product="product"/>
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
    categories() {
      this.category = this.categories.find(item => item.slug === this.$route.params.cslug);
      console.log(this.category)
      if(!this.category.subs.length) {
        this.getProducts();
      }
    },
    range() {
      this.filterProducts();
    }
  },
  methods: {
    filterProducts() {
      let arr = [];
      this.products.map(item => {
        item.prices.map(price => {
          if(price.deal_price) {
            if(price.deal_price >= this.range[0] && price.deal_price <= this.range[1]) {
              item.selected_weight = price.weight_id
              arr.push(item)
            }
          } else {
            if(price.price >= this.range[0] && price.price <= this.range[1]) {
              item.selected_weight = price.weight_id
              arr.push(item)
            }
          }
        })
      });

      arr = arr.filter(item => item.prices.length > 0);
      console.log(arr)

      this.filteredProducts = arr;
    },
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

          let min = arr[0].prices[0].price, max = arr[0].prices[0].price;
          arr.map(item => {
            item.prices.map(price => {
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
          this.range = [min, max];

          this.filteredProducts = arr;
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
