<template>
  <div class="page">
    <section class="offers">
      <v-container>
        <div class="offers__items">
          <a
            :href="banner.url"
            v-for="(banner, i) in banners"
            :key="i"
            class="offers__item"
            :style="{backgroundImage: `url(https://topbudstore.com/${banner.mobile_img})`}"
            v-ripple
          >
            <div class="offers__item-title">{{banner.mobile_title}}</div>
            <div class="offers__item-link">{{banner.btn_title}}</div>
          </a>
          <template v-if="$vuetify.breakpoint.smAndDown">
            <nuxt-link to="/shop/mix" class="buttons__item mnm" v-ripple>
              <div class="buttons__item-title">Mix And Match</div>
              <div class="buttons__item-text">An excellent option for sampling at a low price</div>
              <div class="buttons__item-link">Shop Now</div>
            </nuxt-link>
            <nuxt-link to="/shop/deals" class="buttons__item deals" v-ripple>
              <div class="buttons__item-title">Oz Deals</div>
              <div class="buttons__item-link">Shop Now</div>
            </nuxt-link>
          </template>
        </div>
      </v-container>
    </section>
    <section class="categories">
      <v-container>
        <div class="title">Categories</div>
        <div class="categories__items" v-if="$vuetify.breakpoint.mdAndUp">
          <div class="categories__item flower">
            <div class="categories__item-title">Flower</div>
            <v-btn to="/category/flower" depressed outlined>Shop now</v-btn>
            <img src="@/static/images/flower-category.png" alt="Flower">
            <div class="categories__item-bg"></div>
          </div>
          <div class="categories__item edibles">
            <div class="categories__item-title">Edibles</div>
            <v-btn to="/category/edibles" depressed outlined>Shop now</v-btn>
            <img src="@/static/images/edibles-category.png" alt="Edibles">
            <div class="categories__item-bg"></div>
          </div>
          <div class="categories__item vapes">
            <div class="categories__item-title">Vapes</div>
            <v-btn to="/category/vapes" depressed outlined>Shop now</v-btn>
            <img src="@/static/images/vapes-category.png" alt="Vapes">
            <div class="categories__item-bg"></div>
          </div>
          <div class="categories__item concentrate">
            <div class="categories__item-title">Concentrate</div>
            <v-btn to="/category/concentrate" depressed outlined>Shop now</v-btn>
            <img src="@/static/images/concentrate-category.png" alt="Concentrate">
            <div class="categories__item-bg"></div>
          </div>
          <div class="categories__item topicals">
            <div class="categories__item-title">Topicals</div>
            <v-btn to="/category/topicals" depressed outlined>Shop now</v-btn>
            <img src="@/static/images/topicals-category.png" alt="Topicals">
            <div class="categories__item-bg"></div>
          </div>
          <div class="categories__item accessories">
            <div class="categories__item-title">Accessories</div>
            <v-btn to="/category/accessories" depressed outlined>Shop now</v-btn>
            <img src="@/static/images/accessories-category.png" alt="Accessories">
            <div class="categories__item-bg"></div>
          </div>
        </div>
        <div class="categories__items" v-else>
          <nuxt-link to="/category/flower" class="categories__item flower" v-ripple>
            <div class="categories__item-title">Flower</div>
            <img src="@/static/images/flower-category.png" alt="Flower">
          </nuxt-link>
          <nuxt-link to="/category/edibles" class="categories__item edibles" v-ripple>
            <div class="categories__item-title">Edibles</div>
            <img src="@/static/images/edibles-category.png" alt="Edibles">
          </nuxt-link>
          <nuxt-link to="/category/vapes" class="categories__item vapes" v-ripple>
            <div class="categories__item-title">Vapes</div>
            <img src="@/static/images/vapes-category.png" alt="Vapes">
          </nuxt-link>
          <nuxt-link to="/category/concentrate" class="categories__item concentrate" v-ripple>
            <div class="categories__item-title">Concentrate</div>
            <img src="@/static/images/concentrate-category.png" alt="Concentrate">
          </nuxt-link>
          <nuxt-link to="/category/topicals" class="categories__item topicals" v-ripple>
            <div class="categories__item-title">Topicals</div>
            <img src="@/static/images/topicals-category.png" alt="Topicals">
          </nuxt-link>
          <nuxt-link to="/category/accessories" class="categories__item accessories" v-ripple>
            <div class="categories__item-title">Accessories</div>
            <img src="@/static/images/accessories-category.png" alt="Accessories">
          </nuxt-link>
        </div>
      </v-container>
    </section>
    <section class="products" v-if="popularProducts.length">
      <v-container>
        <div class="products__header">
          <div class="title">Popular products</div>
          <div class="products__cats">
            <div
              class="products__cats-item"
              :class="{active: Object.keys(selectedPopularCat).length === 0}"
              @click="selectedPopularCat = {}"
            >
              All
            </div>
            <div
              class="products__cats-item"
              :class="{active: selectedPopularCat === item}"
              v-for="item in popularProductsCategories"
              :key="item.id"
              @click="selectedPopularCat = item"
            >
              {{item.name}}
            </div>
          </div>
        </div>
        <Carousel :products="filteredPopularProducts" :key="selectedPopularCat.name" v-if="$vuetify.breakpoint.mdAndUp"/>
        <div v-for="product in filteredPopularProducts" :key="product.id" v-else>
          <ProductCardMobile :product="product"/>
        </div>
      </v-container>
    </section>
    <section class="products" v-if="newProducts.length">
      <v-container>
        <div class="products__header">
          <div class="title">New products</div>
          <div class="products__cats">
            <div
              class="products__cats-item"
              :class="{active: Object.keys(selectedNewCat).length === 0}"
              @click="selectedNewCat = {}"
            >
              All
            </div>
            <div
              class="products__cats-item"
              :class="{active: selectedNewCat === item}"
              v-for="item in newProductsCategories"
              :key="item.id"
              @click="selectedNewCat = item"
            >
              {{item.name}}
            </div>
          </div>
        </div>
        <Carousel :products="filteredNewProducts" :key="selectedNewCat.name" v-if="$vuetify.breakpoint.mdAndUp"/>
        <div v-for="product in filteredNewProducts" :key="product.id" v-else>
          <ProductCardMobile :product="product"/>
        </div>
      </v-container>
    </section>
    <section class="info">
      <v-container>
        <div class="info__items">
          <div class="info__item">
            <div class="info__item-image">
              <img src="@/static/images/our-products.png" alt="Our products">
            </div>
            <div class="info__item-title">Our products</div>
            <div class="info__item-text">Satisfied with what you<br/> have seen so far</div>
          </div>
          <div class="info__item">
            <div class="info__item-image">
              <img src="@/static/images/home-delivery.png" alt="Home Delivery">
            </div>
            <div class="info__item-title">Home Delivery</div>
            <div class="info__item-text">Your order will be delivered to your<br/> doorstep or right to your hands</div>
          </div>
          <div class="info__item">
            <div class="info__item-image">
              <img src="@/static/images/customer-service.png" alt="Customer Service">
            </div>
            <div class="info__item-title">Customer Service</div>
            <div class="info__item-text">We have a 24/7 Live Chat<br/> service at your disposal</div>
          </div>
        </div>
      </v-container>
    </section>
<!--    <section class="shopping">-->
<!--      <v-container>-->
<!--        <div class="shopping__items">-->
<!--          <div class="shopping__item under">-->
<!--            <div class="shopping__item-title">Ounces<br/> Under $100</div>-->
<!--            <v-btn to="/" depressed height="45" style="background: #F6C76F!important;color: #071F41!important">Shop Now</v-btn>-->
<!--          </div>-->
<!--          <div class="shopping__item mixnmatch">-->
<!--            <div class="shopping__item-title">Mix And Match</div>-->
<!--            <div class="shopping__item-text">An excellent option for sampling AAAA and AAA flowers at a low price</div>-->
<!--            <v-btn to="/shop/mix" depressed height="45" style="background: #071F41!important;color: #fff!important">Shop Now</v-btn>-->
<!--          </div>-->
<!--          <div class="shopping__item newdibles">-->
<!--            <div class="shopping__item-title">What's new in edibles</div>-->
<!--            <v-btn to="/category/edibles" depressed height="45" style="background: #F6C76F!important;color: #071F41!important">Shop Now</v-btn>-->
<!--          </div>-->
<!--        </div>-->
<!--      </v-container>-->
<!--    </section>-->
    <section class="blog">
      <v-container>
        <div class="title">Our blog</div>
        <div class="blog__items">
          <div class="blog__item" v-for="(article, index) in blog" :key="article.id">
            <div class="blog__item-image" :style="{backgroundImage: `url(/${article.img})`}"></div>
            <div class="blog__item-body">
              <div class="blog__item-title">{{article.name}}</div>
              <p class="blog__item-text">{{article.description}}. <nuxt-link class="blog__item-link" :to="{name: 'blog-slug', params: {slug: article.slug}}">Read more</nuxt-link></p>
            </div>
          </div>
        </div>
      </v-container>
    </section>
    <section class="facts">
      <v-container>
        <div class="facts__wrapper">
          <div class="facts__content">
            <div class="title">Get the facts</div>
            <v-list>
              <v-list-group
                v-for="(fact, i) in facts"
                :key="i"
                v-model="fact.active"
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title v-text="fact.title"></v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title v-html="fact.text"/>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </div>
          <img src="@/static/images/facts-img.png" alt="Get the facts">
        </div>
      </v-container>
    </section>
<!--    <section class="seo">-->
<!--      <v-container>-->
<!--        <div class="title">SEO text</div>-->
<!--        <div class="seo__items">-->
<!--          <div class="seo__item">-->
<!--            CBD is non-intoxicating, non-addictive, and easy to use hemp supplement that is completely natural and reported to help with a number of common mind and body ailments.<br/><br/>-->
<!--            Cannabidiol (CBD) comes from the hemp plant, a highly recognizable “multipurpose” plant with numerous medicinal, industrial, textile, and remedy uses. Cannabidiol is currently legal throughout most of the United States because it is not psychoactive (unlike THC, the active component of marijuana).-->
<!--          </div>-->
<!--          <div class="seo__item">-->
<!--            CBD is non-intoxicating, non-addictive, and easy to use hemp supplement that is completely natural and reported to help with a number of common mind and body ailments.<br/><br/>-->
<!--            Cannabidiol (CBD) comes from the hemp plant, a highly recognizable “multipurpose” plant with numerous medicinal, industrial, textile, and remedy uses. Cannabidiol is currently legal throughout most of the United States because it is not psychoactive (unlike THC, the active component of marijuana).</div>-->
<!--        </div>-->
<!--      </v-container>-->
<!--    </section>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductCard from '@/components/shop/PackProductCard'

export default {
  scrollToTop: true,
  components: {
    ProductCard,
    'Carousel': () => import('@/components/shop/Carousel'),
    'ProductCardMobile': () => import('@/components/shop/ProductCardMobile'),
  },
  async asyncData({$axios}) {
    const blog = await $axios.$get('blog');
    return { blog };
  },
  head: {
    title: 'Best weed in Vaughan | TOPBUD store',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Fast, Reliable Weed Delivery In Vaughan And Surrounding Areas'
      }
    ]
  },
  data: () => ({
    selectedMainScreen: null,
    popularProducts: [],
    newProducts: [],
    popularProductsCategories: [],
    newProductsCategories: [],
    selectedPopularCat: {},
    selectedNewCat: {},
    banners: [],
    facts: [
      {
        title: 'What exactly is CBD?',
        text: 'CBD is non-intoxicating, non-addictive, and easy to use hemp supplement that is completely natural and reported to help with a number of common mind and body ailments.<br/> Cannabidiol (CBD) comes from the hemp plant, a highly recognizable “multipurpose” plant with numerous medicinal, industrial, textile, and remedy uses. Cannabidiol is currently legal throughout most of the United States because it is not psychoactive (unlike THC, the active component of marijuana).'
      },
      {
        title: 'What are the differences between Sativa, Indica, and Hybrid strains?',
        text: 'What are the differences between Sativa, Indica, and Hybrid strains?'
      },
      {
        title: 'How does THC help treat illness or pain? Is More THC “better”?',
        text: 'How does THC help treat illness or pain? Is More THC “better”?'
      },
    ]
  }),
  methods: {
    getCategoriesSlugsForProduct(product) {
      let cat = this.categories.find(c => c.id === product.category_id);
      let sub = product.subcategory_id ? cat.subs.find(s => s.id === product.subcategory_id) : null;

      return {
        cslug: cat.slug,
        sslug: sub ? sub.slug : null,
      }
    },
  },
  computed: {
    ...mapGetters({
      categories: 'shop/categories'
    }),
    filteredPopularProducts() {
      if(Object.keys(this.selectedPopularCat).length === 0) {
        return this.popularProducts
      }

      return this.popularProducts.filter(item => item.category_id === this.selectedPopularCat.category_id);
    },
    filteredNewProducts() {
      if(Object.keys(this.selectedNewCat).length === 0) {
        return this.newProducts
      }

      return this.newProducts.filter(item => item.category_id === this.selectedNewCat.category_id);
    }
  },
  async mounted () {
    if(this.$vuetify.breakpoint.smAndDown) {
      await this.$axios
        .get('/mainBanners')
        .then(res => {
          this.banners = res.data.data;
        })
    }
    await this.$axios
      .get('/mainProds/pop')
      .then(res => {
        let prods = [];
        let cats = [];
        Object.keys(res.data.products).map(item => {
          prods.push(res.data.products[item]);
        })

        this.popularProducts = prods.map(item => {
          let slugs = this.getCategoriesSlugsForProduct(item);
          item.search = {
            cslug: slugs.cslug,
            sslug: slugs.sslug
          }
          item.img = 'https://topbudstore.com/' + item.img;

          cats.push({
            category_id: item.category_id,
            name: this.categories.find(c => c.id === item.category_id).name
          })
          return item;
        })

        cats.map(c => {
          if(!this.popularProductsCategories.find(ppc => ppc.name === c.name)) {
            if(this.popularProductsCategories.length < 3) {
              this.popularProductsCategories.push(c)
            }
          }
        })
      })

    await this.$axios
      .get('/mainProds/new')
      .then(res => {
        let prods = [];
        let cats = [];
        Object.keys(res.data.products).map(item => {
          prods.push(res.data.products[item]);
        })

        this.newProducts = prods.map(item => {
          let slugs = this.getCategoriesSlugsForProduct(item);
          item.search = {
            cslug: slugs.cslug,
            sslug: slugs.sslug
          }
          item.img = 'https://topbudstore.com/' + item.img;

          cats.push({
            category_id: item.category_id,
            subcategory_id: item.subcategory_id,
            name: this.categories.find(c => c.id === item.category_id).name
          })
          return item;
        })

        cats.map(c => {
          if(!this.newProductsCategories.find(npc => npc.name === c.name)) {
            if(this.newProductsCategories.length < 3) {
              this.newProductsCategories.push(c)
            }
          }
        })
      })
  },
  created () {
    this.$root.$emit('set-breadcrumbs', []);
  }
}
</script>

<style lang="scss" scoped>
  @media (min-width: 1904px) {
    .container--fluid {
      padding: 0 !important;
    }
  }

  @media(max-width: 768px) {
    .page .title, .page h1 {
      display: flex !important;
    }
  }

  .mainScreen {
    background: url("~/static/images/stars-bg.png"), #202536;
    background-size: cover;
    height: 745px;
    display: flex;
    padding-bottom: 40px !important;
    transition: 2s;

    @media(max-width: 1264px) {
      height: 700px;
    }

    @media (max-width: 768px) {
      display: none;
    }

    &.sativa {
      background: url("~/static/images/stars-bg.png"), linear-gradient(to left, rgba(0, 0, 0, 0) 26.35%, rgba(255, 97, 75, 0.192) 65.42%, rgba(255, 97, 75, 0.8) 100%), #202536;
      background-size: cover;
    }

    &.indica {
      background: url("~/static/images/stars-bg.png"), linear-gradient(to right, rgba(0, 0, 0, 0) 26.35%, rgba(52, 166, 100, 0.32) 65.42%, #34A664 100%), #202536;
      background-size: cover;
    }

    .container {
      margin-top: auto;
    }

    &__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    img {
      transition: .3s;

      &.default {
        opacity: 1;
      }
      &.active {
        opacity: 0;
      }
    }

    &__center {
      font-weight: 700;
      color: #F6C76F;
      font-size: 24px;
      text-transform: uppercase;
      width: 195px;
      text-align: center;
      align-self: flex-start;
      margin-top: 110px;

      @media(max-width: 1264px) {
        display: flex;
        font-size: 18px;
        flex-shrink: 0;
        width: 150px;
      }
    }

    &__left, &__right {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 50%;

      @media(max-width: 1264px) {
        width: calc(100% - 75px);
        height: 385px;
      }

      .mainScreen__image {

        @media(max-width: 1264px) {
          width: 100%;
        }

        div {
          width: 500px;
          height: 385px;
          position: relative;

          @media(max-width: 1264px) {
            width: 100%;
            height: 346px;
          }

          @media(max-width: 1024px) {
            width: 350px;
            height: 270px;
          }

          img {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;

            @media(max-width: 1264px) {
              top: auto;
              right: auto;
              bottom: auto;
              left: auto;
              max-width: 100%;
              height: auto;
            }

            @media(max-width: 1024px) {
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
      }

      a {
        opacity: 0;
        transition: .3s;
        background: #D41B27;
        border-radius: 50px;
        color: #ffffff;
        padding: 12px 22px;
        font-size: 18px;
        margin-top: 40px;
        margin-right: 30px;

        @media(max-width: 1264px) {
          margin-right: 13px;
          margin-top: 0;
        }
      }
    }

    &__left {

      &.active {

        img {
          transition: .3s;

          &.default {
            opacity: 0;
          }
          &.active {
            opacity: 1;
          }
        }

        a {
          opacity: 1;
        }
      }
    }

    &__right {

      &.active {

        img {
          transition: .3s;

          &.default {
            opacity: 0;
          }
          &.active {
            opacity: 1;
          }
        }

        a {
          opacity: 1;
        }
      }
    }
  }

  .title {
    margin: 60px 0;
    font-size: 48px !important;
    font-weight: 700;
    font-family: 'Montserrat', sans-serif !important;
    color: #333333;

    @media(max-width: 768px) {
      margin: 30px 0 40px;
      font-size: 36px !important;
      line-height: 1.2;
    }
  }

  .categories {

    .title {
      margin-top: 0;
    }

    &__items {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-gap: 60px;

      @media(max-width: 1264px) {
        grid-gap: 20px;
      }

      @media(max-width: 768px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
      }
    }

    &__item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      height: 100%;
      padding: 20px 25px 20px;
      border-radius: 10px;
      position: relative;
      overflow: hidden;

      @media(max-width: 1264px) {
        padding: 17px 0;
        height: 170px;
      }

      &:hover {
        .categories__item-bg {
          opacity: 1;
        }

        .v-btn {
          opacity: 1;
          left: calc(50% - 75px);
        }

        .categories__item-title {
          width: 100%;
        }
      }

      .v-btn {
        border: 2px solid #FFFFFF !important;
        border-radius: 5px !important;
        color: #fff !important;
        font-size: 18px;
        height: 45px !important;
        width: 150px !important;
        opacity: 0;
        z-index: 1;
        transition: .7s;
        left: 0;

        &:hover {
          color: #F6C76F !important;
          border-color: #F6C76F !important;
        }
      }

      &-bg {
        background-size: cover !important;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transition: .5s;
        opacity: 0;
      }

      &.flower {
        background: #071F41;

        .categories__item-bg {
          background: url("~/static/images/flower-bg.jpg");
        }
      }

      &.vapes {
        background: #00A0BB;

        .categories__item-bg {
          background: url("~/static/images/vapes-bg.jpg");
        }
      }

      &.concentrate {
        background: #ED4534;

        .categories__item-bg {
          background: url("~/static/images/concentrate-bg.jpg");
        }
      }

      &.edibles {
        background: #569871;

        .categories__item-bg {
          background: url("~/static/images/edibles-bg.jpg");
        }
      }

      &.topicals {
        background:#F6C76F;

        .categories__item-bg {
          background: url("~/static/images/topicals-bg.jpg");
        }
      }

      &.accessories {
        background: #004B5A;

        .categories__item-bg {
          background: url("~/static/images/accessories-bg.jpg");
        }
      }

      &-title {
        font-family: Courgette, cursive;
        font-size: 48px;
        color: #FFFFFF;
        margin-bottom: 20px;
        z-index: 1;
        position: relative;
        transition: .5s;
        width: 0;
        text-align: center;
        white-space: nowrap;

        @media(max-width: 1264px) {
          font-size: 32px;
        }

        @media(max-width: 1024px) {
          font-size: 28px;
        }

        @media(max-width: 768px) {
          font-size: 24px;
          width: 100%;
          text-align: center;
        }
      }

      img {
        margin-top: auto;

        @media(max-width: 1264px) {
          transform: scale(.6);
        }

        @media(max-width: 768px) {
          transform: scale(1);
          max-width: 90px;
          max-height: 84px;
          align-self: center;
          margin-bottom: auto;
        }
      }
    }
  }

  .info {
    margin-top: 130px;
    margin-bottom: 176px;
    background: none !important;

    @media(max-width: 768px) {
      margin: 60px 0;
    }

    &__items {
      display: flex;
      justify-content: space-evenly;

      @media(max-width: 768px) {
        flex-direction: column;
      }
    }

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;

      @media(max-width: 768px) {
        &:not(:last-of-type) {
          margin-bottom: 40px;
        }
      }

      &-image {
        height: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 57px;
      }

      &-title {
        font-size: 24px;
        margin-bottom: 35px;
        font-weight: 700;
      }

      &-text {
        font-size: 18px;
        text-align: center;
      }
    }
  }

  .shopping {

    &__items {
      display: flex;

      @media(max-width: 768px) {
        flex-direction: column;
      }
    }

    &__item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background-size: cover;
      height: 260px;
      padding: 40px;
      width: 100%;

      @media(max-width: 1024px) {
        min-height: 260px;
        height: auto;
        border-radius: 5px;
        overflow-x: hidden;
      }

      @media(max-width: 768px) {
        height: auto;
        background-size: cover !important;

        &:not(:last-of-type) {
          margin-bottom: 20px;
        }
      }

      &:not(:last-of-type) {
        margin-right: 40px;

        @media(max-width: 768px) {
          margin-right: 0;
        }
      }

      &.under {
        background: url("~/static/images/under100.png");
      }

      &.mixnmatch {
        background: url("~/static/images/mixnmatch.png");
      }

      &.newdibles {
        background: url("~/static/images/newedibles.png");
      }

      &-title {
        font-family: "Montserrat", sans-serif;
        font-weight: 700;
        font-size: 26px;
        color: #fff;
        margin-bottom: 15px;
        line-height: 1.2;
      }

      &-text {
        font-weight: 700;
        font-size: 16px;
        color: #071F41;
        margin-bottom: 30px;
        line-height: 1.2;
      }

      .v-btn {
        margin-top: auto;
      }
    }
  }

  .blog {
    margin-bottom: 100px;

    @media(max-width: 768px) {
      margin-bottom: 40px;
    }

    &__items {
      display: flex;

      @media(max-width: 768px) {
        flex-direction: column;
      }
    }

    &__item {
      width: 50%;

      @media(max-width: 768px) {
        width: 100%;
      }

      &:not(:last-of-type) {
        margin-right: 40px;
      }

      &-image {
        width: 100%;
        height: 387px;
        margin-bottom: 25px;
        border-radius: 5px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      &-title {
        font-size: 24px;
        font-weight: 700;
        color: #333333;
        margin-bottom: 23px;
      }

      &-text {
        font-size: 18px;
      }

      &-link {
        color: #008DE3 !important;
      }
    }
  }

  .facts {
    margin-left: auto;
    margin-bottom: 80px;

    img {
      width: 40%;
      margin-left: 60px;
    }

    @media(max-width: 1024px) {
      img {
        display: none;
      }
    }

    &__wrapper {
      display: flex;
    }

    .title {
      margin-bottom: 44px;
    }

    &__content {
      flex-shrink: 0;
      flex-grow: 1;

      @media(max-width: 1024px) {
        width: 100%;
      }
    }
  }

  .seo {
    margin-bottom: 142px;

    @media(max-width: 768px) {
      margin-bottom: 40px;
    }

    &__items {
      display: flex;

      @media(max-width: 1024px) {
        flex-direction: column;
      }
    }

    &__item {

      &:not(:last-of-type) {
        margin-right: 50px;

        @media(max-width: 1024px) {
          margin-right: 0;
          margin-bottom: 50px;
        }
      }
    }
  }

  .products {
    margin-top: 60px;

    @media(max-width: 768px) {
      margin-top: 0;
    }

    &__header {
      display: flex;
      align-items: center;

      @media(max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
      }

      .title {
        margin-right: 97px;

        @media(max-width: 768px) {
          margin-right: 0;
          margin-bottom: 34px;
        }
      }
    }

    &__cats {
      display: flex;
      align-items: center;

      @media(max-width: 768px) {
        margin-bottom: 28px;
        overflow-x: auto;
      }

      &-item {
        height: 44px;
        padding: 0 20px;
        border-radius: 30px;
        background: #fff;
        color: #333333;
        text-transform: lowercase;
        font-weight: 700;
        font-size: 24px;
        display: flex;
        align-items: center;
        cursor: pointer;

        @media(max-width: 768px) {
          height: 30px;
          font-size: 14px;
          flex-shrink: 0;
        }

        &:not(:last-of-type) {
          margin-right: 20px;

          @media(max-width: 768px) {
            margin-right: 0;
          }
        }

        &.active {
          background: #F6C76F;
          color: #ffffff;
          cursor: default;
        }
      }
    }
  }

  .offers {

    &__items {
      display: flex;
      align-items: center;
      overflow-x: auto;
    }

    &__item {
      width: 150px;
      height: 110px;
      background-size: cover;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-shrink: 0;
      border-radius: 10px;
      overflow-x: hidden;
      position: relative;

      &:nth-of-type(even) {
        &:before {
          background: linear-gradient(0deg, rgba(50, 76, 255, 0.7), rgba(50, 76, 255, 0.7))
        }
      }

      &:nth-of-type(odd) {
        &:before {
          background: linear-gradient(0deg, rgba(255, 98, 63, 0.8), rgba(255, 98, 63, 0.8));
        }
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }

      &:not(:last-of-type) {
        margin-right: 10px;
      }

      &-title, &-link {
        font-weight: 700;
        font-size: 12px;
        line-height: 1.2;
        z-index: 1;
        position: relative;
        color: #ffffff;
      }
    }
  }


  .buttons {
    flex-direction: column;
    justify-content: space-between;
    display: flex;

    &__item {
      display: flex;
      flex-direction: column;
      height: 110px;
      width: 150px;
      background-size: cover;
      background-position: top left;
      border-radius: 10px;
      overflow-x: hidden;
      position: relative;
      padding: 10px;
      flex-shrink: 0;

      &-title {
        font-size: 12px;
        font-weight: 700;
        font-family: "Montserrat", serif;
        line-height: 1.2;
        margin-bottom: 10px;
      }

      &-text {
        font-size: 12px;
        font-family: "Montserrat", serif;
        line-height: 1.2;
        color: #ffffff;

        span {
          font-weight: 700;
          margin: 0 5px;
        }
      }

      &-link {
        font-weight: 700;
        font-size: 12px;
        text-transform: uppercase;
        color: #202536;
        font-family: "Roboto", sans-serif;
        margin-top: auto;
        line-height: 1;
      }

      &.mnm {
        background-image: url("~/static/images/mnm-button-bg.jpg");
        color: #202536 !important;
        text-decoration: none;
        margin-right: 10px;

        &:hover {
          color: #202536 !important;
        }
      }

      &.deals {
        background-image: url("~/static/images/deals-button-bg.jpg");
        color: #fff !important;
        text-decoration: none;

        &:hover {
          color: #fff !important;
        }

        .buttons__item-link {
          color: #ffffff;
        }
      }
    }
  }

</style>
