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
            <li>Deals</li>
          </ul>
        </nav>
      </v-container>

      <div class="products">
        <v-container>
          <v-row v-if="products.length">
            <v-col md="2" sm="12" class="py-0 px-0">
              <Filters :min="min" :max="max" :range="range" :categories="categoriesFilter"/>
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
          <p class="text-center" v-else>No products with deals was found</p>
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
  data() {
    return {
      products: [],
      category: {},
      sub: {},
      loading: false,
      min: 0,
      max: 0,
      range: [0, 0],
      filteredProducts: [],
      categoriesFilter: []
    }
  },
  computed: {
    ...mapGetters({
      categories: 'shop/categories'
    }),
  },
  watch: {
    categories() {
      if(this.categories.length) {
        this.getProducts();
        this.setCategoriesFilter();
      }
    },
    range() {
      this.filterProducts();
    },
    categoriesFilter: {
      handler() {
        this.filterProducts();
      },
      deep: true
    }
  },
  methods: {
    setCategoriesFilter() {
      this.categories.map(item => {
        let subs = [];
        let data = {
          id: item.id,
          name: item.name,
          selected: true,
          showSubs: false
        };

        if(item.subs.length) {
          item.subs.map(sub => {
            subs.push({
              id: sub.id,
              name: sub.name,
              selected: true,
            })
          })
          data.subs = subs
        }

        this.categoriesFilter.push(data);
      })
    },
    async filterProducts() {
      let arr = [];
      await this.products.map(item => {
        item.prices.map(price => {
          let product = {};
          if(price.deal_price) {
            if(price.deal_price >= this.range[0] && price.deal_price <= this.range[1]) {
              item.selected_weight = price.weight_id
              product = item;
            }
          } else {
            if(price.price >= this.range[0] && price.price <= this.range[1]) {
              item.selected_weight = price.weight_id
              product = item;
            }
          }

          if(Object.keys(product).length) {
            this.categoriesFilter.map(cat => {
              if(cat.id === item.category_id && cat.selected) {
                if(item.subcategory_id) {
                  if(cat.subs.find(sub => sub.selected && sub.id === item.subcategory_id)) {
                    arr.push(item);
                  }
                } else {
                  arr.push(item);
                }
              }
            })
          }
        })
      });

      this.filteredProducts = arr;
    },
    getProducts() {
      this.loading = true;
      this.$axios
        .get('/deals')
        .then(res => {
          let arr = [];
          let cats = [];
          Object.keys(res.data.products).map(key => {
            let subs = [];

            let category = this.categories.find(item => item.id === res.data.products[key].category_id);
            let sub = res.data.products[key].subcategory_id ? category.subs.find(item => item.id === res.data.products[key].subcategory_id) : null;

            if(category.subs && category.subs.length) {
              category.subs.map(sub => {
                if(subs.length) {
                  if(!subs.find(i => i.id === sub.id)) {
                    subs.push({
                      id: sub.id,
                      name: sub.name,
                      selected: true,
                    })
                  }
                } else {
                  subs.push({
                    id: sub.id,
                    name: sub.name,
                    selected: true,
                  })
                }
              })
            }

            if(cats.length) {
              if(!cats.find(cat => cat.id === category.id)) {
                cats.push({
                  id: category.id,
                  name: category.name,
                  selected: true,
                  subs: subs
                });
              }
            } else {
              cats.push({
                id: category.id,
                name: category.name,
                selected: true,
                subs: subs,
                showSubs: true
              });
            }

            res.data.products[key].search = {
              cslug: category.slug,
              sslug: sub ? sub.slug : null,
            }
            res.data.products[key].img = `http://31.186.250.216:8000/${res.data.products[key].img}`;
            arr.push(res.data.products[key]);
          });

          console.log(cats)

          this.categoriesFilter = cats;

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
      this.getProducts();
      this.setCategoriesFilter();
    }

    this.$root.$on('change-filter-range', data => {
      this.range = data;
    })
    this.$root.$on('change-filter-categories', data => {
      this.categoriesFilter = data;
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
