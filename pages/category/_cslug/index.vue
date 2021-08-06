<template>
  <div>
<!--    <TopBar />-->
    <v-container>
      <nav class="breadcrumbs">
        <ul>
          <li><nuxt-link to="/">Home</nuxt-link></li>
          <li><nuxt-link to="/shop">Shop</nuxt-link></li>
          <li>{{ $route.params.cslug}}</li>
        </ul>
      </nav>
    </v-container>

    <div class="products">
      <v-container>
        <v-row>
          <v-col md="3" sm="12" v-for="(product, i) in products" :key="i">
            <ProductCard :product="product"/>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'TopBar': () => import('@/components/shop/TopBar'),
    'ProductCard': () => import('@/components/shop/ProductCard'),
  },
  data() {
    return {
      products: [
        {
          slug: 'product_1',
          category: {
            slug: this.$route.params.cslug
          },
          image: '1.webp',
          title: 'Product 1'
        },
        {
          slug: 'product_2',
          category: {
            slug: this.$route.params.cslug
          },
          image: '2.webp',
          title: 'Product 2'
        },
        {
          slug: 'product_3',
          category: {
            slug: this.$route.params.cslug
          },
          image: '3.webp',
          title: 'Product 3'
        },
        {
          slug: 'product_4',
          category: {
            slug: this.$route.params.cslug
          },
          image: '4.webp',
          title: 'Product 4'
        },
        {
          slug: 'product_5',
          category: {
            slug: this.$route.params.cslug
          },
          image: '5.webp',
          title: 'Product 5'
        },
        {
          slug: 'product_6',
          category: {
            slug: this.$route.params.cslug
          },
          image: '6.webp',
          title: 'Product 6'
        },
        {
          slug: 'product_7',
          category: {
            slug: this.$route.params.cslug
          },
          image: '7.webp',
          title: 'Product 7'
        },
        {
          slug: 'product_8',
          category: {
            slug: this.$route.params.cslug
          },
          image: '8.webp',
          title: 'Product 8'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumbs {
    display: flex;
    justify-content: center;
    margin: 10px 0 50px;

    ul {
      display: flex;

      li {
        font-size: 16px;
        display: flex;
        align-items: center;
        letter-spacing: 0.5px;

        &:last-child {
          color: #7FAD39;
        }

        &:not(:last-child) {
          padding-right: 15px;
          margin-right: 10px;
          position: relative;

          &:before {
            content: '›';
            position: absolute;
            right: 0;
            font-size: 22px;
            height: 100%;
            line-height: 1;
          }
        }

        a {
          color: #000;
        }
      }
    }
  }

  .products {
    margin-bottom: 60px;
  }
</style>
