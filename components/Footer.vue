<template>
  <v-container fluid style="padding-left: 0;padding-right: 0;" :class="{'d-none': $route.name === 'shop-mix' && $vuetify.breakpoint.smAndDown}">
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

    <footer class="footer">
      <v-container class="pb-10">
        <v-row>
          <v-col cols="12" sm="12" md="4" lg="2">
            <nuxt-link to="/" class="footer__logo">
              <img src="@/static/images/footer-logo.png" alt="TOPBUD Store">
            </nuxt-link>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="2">
            <ul class="footer__nav">
              <li class="footer__nav-title">About us</li>
              <li>
                <nuxt-link to="/">Home</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/blog">Blog</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/contacts">Contact us</nuxt-link>
              </li>
              <li>&nbsp;</li>
              <li>
                <a href="tel:14373884091">1 (437) 388 - 4091</a>
              </li>
              <li>
                <a href="mailto:topbudstore@gmail.com" style="color: #008DE3 !important;">topbudstore@gmail.com</a>
              </li>
            </ul>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="2" v-for="(cat, catIndex) in categories.filter(item => item.subs.length)" :key="catIndex" class="md">
            <ul class="footer__nav">
              <li class="footer__nav-title">{{cat.name}}</li>
              <li v-for="(sub, subIndex) in cat.subs" :key="subIndex">
                <nuxt-link :to="{name: 'category-cslug-sslug', params: {cslug: cat.slug, sslug: sub.slug}}">{{ sub.name }}</nuxt-link>
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
      <div class="footer__links-wrapper">
        <v-container>
          <div class="footer__links">
            <div class="footer__links-col" v-for="(chunk, index) in linksChunks" :key="index">
              <nuxt-link :to="item.link" v-for="(item, i) in chunk" :key="i">{{item.title}}</nuxt-link>
            </div>
          </div>
        </v-container>
      </div>
    </footer>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Footer",
  data: () => ({
    subscribeEmail: null,
    subscribing: false,
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
  },
  computed: {
    ...mapGetters({
      links: 'footerLinks',
      categories: 'shop/categories'
    }),
    linksChunks() {
      let list = [];
      this.links.map(group => {
        group.map(item => {
          list.push(item);
        })
      })

      let chunks = [];
      let i,j, temporary, chunk = 4;
      for (i = 0,j = list.length; i < j; i += chunk) {
        temporary = list.slice(i, i + chunk);
        chunks.push(temporary);
      }

      return chunks;
    }
  }
}
</script>

<style lang="scss" scoped>
  @media(max-width: 768px) {
    .md {
      display: none;
    }
  }

  .footer {
    background-image: url('~/static/images/footer-bg.png');
    background-position: top left;
    background-size: cover;
    padding-top: 110px;
    margin-top: -36px;

    @media(max-width: 768px) {
      background-image: url('~/static/images/footer-bg-mobile.png');
      margin-top: -60px;
      padding-top: 20px;
    }

    &__logo {
      width: 100%;
      height: auto;
      display: flex;

      @media(max-width: 1024px) {
        width: 200px;
      }

      @media(max-width: 768px) {
        width: 130px;
        margin: 0 auto;
      }

      img {
        width: 100%;
        height: auto;
      }
    }

    &__main {
      display: flex;
    }

    &__navs {
      display: flex;
      justify-content: space-between;
      margin-left: 15px;
    }

    &__nav {
      display: flex;
      flex-direction: column;

      @media(max-width: 768px) {
        align-items: center;
      }

      &-title {
        font-size: 22px;
        color: #333333;
        font-weight: 700;
        margin-bottom: 25px !important;
      }

      li {
        &:not(:last-of-type) {
          margin-bottom: 10px;
        }

        a {
          transition: .3s;
          color: #000 !important;

          &:hover {
            color: #F6C76F !important;
          }
        }
      }
    }

    &__bottom {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;

      @media(max-width: 768px) {
        flex-direction: column;
      }

      &-wrapper {
        background: #34A664;
        height: 84px;
        display: flex;
        align-items: center;
        margin-top: 45px;

        @media(max-width: 768px) {
          height: auto;
        }
      }

      &-copyrights {
        font-size: 18px;
        font-weight: 700;
        color: #DDDDDD;

        @media(max-width: 768px) {
          order: 1;
        }
      }

      &-payments {
        display: flex;
        align-items: center;

        @media(max-width: 768px) {
          order: 3;
        }

        img {
          &:not(:last-of-type) {
            margin-right: 32px;
          }
        }
      }

      &-socials {
        display: flex;
        align-items: center;

        @media(max-width: 768px) {
          order: 2;
          margin: 28px 0 35px;
        }

        a {
          &:not(:last-of-type) {
            margin-right: 20px;
          }
        }
      }
    }

    &__links {
      display: flex;
      justify-content: space-between;

      &-wrapper {
        background: #228B4F;

        @media(max-width: 768px) {
          display: none;
        }
      }

      &-col {
        display: flex;
        flex-direction: column;

        a {
          font-size: 10px;
          color: #12703A!important;

          &:not(:last-of-type) {
            margin-bottom: 6px;
          }
        }
      }
    }
  }

  .subscribe {
    background: url("~/static/images/subscribe.jpg");
    background-size: cover;
    height: 387px;

    @media(max-width: 768px) {
      height: auto;
      padding: 20px 30px 100px;
      background: url("~/static/images/subscribe-mobile.jpg");
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

      @media(max-width: 768px) {
        font-size: 36px;
        margin-bottom: 28px;
      }
    }

    &__text {
      font-weight: 700;
      font-size: 24px;
      color: #fff;
      margin-bottom: 22px;

      @media(max-width: 768px) {
        line-height: 1.1;
        margin-bottom: 40px;
      }
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
        padding: 0;

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
