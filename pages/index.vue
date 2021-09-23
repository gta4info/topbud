<template>
  <div class="page">
<!--    <v-container fluid class="mainScreen" :class="selectedMainScreen > 0 ? selectedMainScreen === 1 ? 'sativa' : 'indica' : ''">-->
<!--      <v-container>-->
<!--        <div class="mainScreen__content">-->
<!--          <div class="mainScreen__left" @mouseenter="selectedMainScreen = 1" :class="{active: selectedMainScreen === 1}">-->
<!--            <div class="mainScreen__image">-->
<!--              <div>-->
<!--                <img class="default" src="@/static/images/sativa-img-1.png" alt="">-->
<!--                <img class="active" src="@/static/images/sativa-img-2.png" alt="">-->
<!--              </div>-->
<!--            </div>-->
<!--            <nuxt-link to="/category/flower/sativa">Shop Sativa</nuxt-link>-->
<!--          </div>-->
<!--          <div class="mainScreen__center">Choose your side</div>-->
<!--          <div class="mainScreen__right" @mouseenter="selectedMainScreen = 2" :class="{active: selectedMainScreen === 2}">-->
<!--            <div class="mainScreen__image">-->
<!--              <div>-->
<!--                <img class="default" src="@/static/images/indica-img-1.png" alt="">-->
<!--                <img class="active" src="@/static/images/indica-img-2.png" alt="">-->
<!--              </div>-->
<!--            </div>-->
<!--            <nuxt-link to="/category/flower/indica">Shop Indica</nuxt-link>-->
<!--          </div>-->
<!--        </div>-->
<!--      </v-container>-->
<!--    </v-container>-->
    <section class="buttons">
      <v-container>
        <v-row>
          <v-col sm="12" md="6">
            <nuxt-link to="/shop/mix" class="buttons__item mnm" v-ripple>
              <div class="buttons__item-title">Mix’n’Match</div>
              <div class="buttons__item-text">add a lot of buds with <span>lower</span> price</div>
            </nuxt-link>
          </v-col>
          <v-col sm="12" md="6">
            <nuxt-link to="/shop/deals" class="buttons__item deals" v-ripple>
              <div class="buttons__item-title">Oz Deals</div>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="categories">
      <v-container>
        <div class="title">Categories</div>
        <div class="categories__items" v-if="windowWidth > 768">
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
    <section class="shopping">
      <v-container>
        <div class="shopping__items">
          <div class="shopping__item under">
            <div class="shopping__item-title">Ounces<br/> Under $100</div>
            <v-btn to="/" depressed height="45" style="background: #F6C76F!important;color: #071F41!important">Shop Now</v-btn>
          </div>
          <div class="shopping__item mixnmatch">
            <div class="shopping__item-title">Mix And Match</div>
            <div class="shopping__item-text">An excellent option for sampling AAAA and AAA flowers at a low price</div>
            <v-btn to="/shop/mix" depressed height="45" style="background: #071F41!important;color: #fff!important">Shop Now</v-btn>
          </div>
          <div class="shopping__item newdibles">
            <div class="shopping__item-title">What's new in edibles</div>
            <v-btn to="/category/edibles" depressed height="45" style="background: #F6C76F!important;color: #071F41!important">Shop Now</v-btn>
          </div>
        </div>
      </v-container>
    </section>
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
    <v-container fluid style="padding-left: 0;padding-right: 0;">
      <section class="subscribe">
        <v-container>
          <div class="subscribe__content">
            <div class="subscribe__title">STAY TUNED</div>
            <div class="subscribe__text">Keep me up to date on news and exclusive offers.</div>
            <div class="subscribe__group">
              <input type="email" v-model="subscribeEmail" placeholder="Your email" @keypress.enter="subscribe">
              <v-btn height="100%" width="218" depressed color="#F6C76F" @click="subscribe" :loading="subscribing">Let’s Go!</v-btn>
            </div>
          </div>
        </v-container>
      </section>
    </v-container>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  async asyncData({$axios}) {
    const blog = await $axios.$get('blog');
    return { blog };
  },
  layout: 'new',
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
    subscribeEmail: null,
    subscribing: false,
    windowWidth: null,
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
    subscribe() {
      if(!this.subscribeEmail || this.subscribeEmail.length < 5) {
        return this.$toast.error('Please fill your email to subscribe!', {duration: 1500})
      }

      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(!re.test(String(this.subscribeEmail).toLowerCase())) {
        return this.$toast.error('Email address is not valid!', {duration: 1500})
      }

      this.subscribing = true;

      this.$axios
        .post('/emailsub', {
          email: this.subscribeEmail
        })
        .then(res => {
          this.subscribeEmail = null;
          this.$toast.success('You\'ve subscribed successfully!', {duration: 1500})
        })
        .catch(() => this.$toast.success('Please check your email and try again!', {duration: 1500}))
        .finally(() => this.subscribing = false)
    },
    setWindowWidth() {
      this.windowWidth = window.outerWidth;
    }
  },
  mounted () {
    if (process.browser) {
      this.windowWidth = window.outerWidth;
      window.addEventListener("resize", this.setWindowWidth);
      if(this.windowWidth > 768) {
        window.addEventListener("scroll", () => {
          let scroll = window.scrollY;
          let mainScreen = document.querySelector('.mainScreen');

          if(mainScreen) {
            let mainScreenHeight = mainScreen.offsetHeight;
            let header = document.querySelector('.header__wrapper .bg');

            if (mainScreenHeight / 2 - scroll < 0) {
              header.style.opacity = ((1 - (mainScreenHeight - 300 - scroll) / mainScreenHeight) * 0.8);
            } else if (mainScreenHeight / 2 - scroll > 0) {
              header.style.opacity = ((1 - (mainScreenHeight - 300 - scroll) / mainScreenHeight) * 0.8);
            }

            if (scroll === 0) {
              header.style.opacity = 0;
            }
          }
        });
      }
    }
  },
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

  .buttons {
    margin-top: 60px;

    @media(max-width: 768px) {
      margin-top: 20px;
    }

    &__content {
      display: flex;
      justify-content: space-between;
    }

    &__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 160px;
      background-size: cover;
      background-position: top left;
      border-radius: 5px;
      overflow-x: hidden;
      position: relative;

      &-title {
        font-size: 48px;
        font-family: "Courgette", serif;
        line-height: 1;
      }

      &-text {
        font-family: "Montserrat", sans-serif;
        font-size: 15px;
        font-weight: 500;

        span {
          font-weight: 700;
          margin: 0 5px;
        }
      }

      &.mnm {
        background-image: url("~/static/images/mnm-button-bg.jpg");
        color: #202536 !important;
        text-decoration: none;
        padding-left: 223px;

        &:before {
          content: '';
          position: absolute;
          background-image: url("~/static/images/mnm-button-img.png");
          background-repeat: no-repeat;
          background-position: top 28px left 29px;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          @media(max-width: 768px) {
            background-size: 110px;
            background-position: top 0 left 0;
          }
        }

        @media(max-width: 768px) {
          padding-left: 0;
          align-items: center;
        }

        &:hover {
          color: #202536 !important;
        }

        .buttons__item-title {
          margin-top: 20px;
        }
      }

      &.deals {
        background-image: url("~/static/images/deals-button-bg.jpg");
        color: #fff !important;
        text-decoration: none;
        padding-left: 194px;

        &:before {
          content: '';
          position: absolute;
          background-image: url("~/static/images/deals-button-img.png");
          background-repeat: no-repeat;
          background-position: top 31px left 73px;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          @media(max-width: 768px) {
            background-size: contain;
            background-position: top 50px left 0;
          }
        }

        @media(max-width: 768px) {
          padding-left: 0;
          align-items: center;
        }

        &:hover {
          color: #fff !important;
        }
      }
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

  .subscribe {
    background: url("~/static/images/subscribe.jpg");
    height: 387px;

    @media(max-width: 768px) {
      height: auto;
      padding: 40px 0 50px;
      background-size: cover;
    }

    &__content {
      width: 100%;
      max-width: 1000px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      padding-top: 10px;
    }

    &__title {
      font-size: 48px;
      color: #fff;
      font-weight: 700;
      margin-bottom: 12px;
    }

    &__text {
      font-weight: 700;
      font-size: 24px;
      color: #fff;
      margin-bottom: 22px;
    }

    &__group {
      width: 100%;
      height: 100px;
      padding: 12px;
      display: flex;
      align-items: center;
      background: #fff;
      border-radius: 5px;

      @media(max-width: 768px) {
        flex-direction: column;
        background: transparent;
        height: auto;
      }

      input {
        padding: 0 28px;
        font-size: 24px;
        font-weight: 700;
        color: #333;
        outline: none;
        width: 100%;

        @media(max-width: 768px) {
          background: #ffffff;
          height: 60px;
          padding: 0 20px;
          display: flex;
          font-size: 18px;
          border-radius: 5px;
          margin-bottom: 20px;
        }

        &::placeholder {
          color: #333;
        }
      }

      .v-btn {
        color: #fff;
        text-transform: none;
        font-size: 24px;

        @media(max-width: 768px) {
          height: 60px !important;
          width: 100% !important;
        }
      }
    }
  }
</style>
