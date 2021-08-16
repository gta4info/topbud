<template>
  <footer class="footer">
    <v-container>
      <v-row>
        <v-col md="3" sm="12">
          <nuxt-link to="/" class="footer__logo">
            <img src="@/static/images/logo.png" alt="TOPBUD">
          </nuxt-link>
        </v-col>
        <v-col md="3" sm="12">
          <nav class="footer__nav">
            <ul>
              <li class="footer__nav-title">Info</li>
              <li><nuxt-link to="/about">About us</nuxt-link></li>
              <li><nuxt-link to="/delivery">Delivery</nuxt-link></li>
              <li><nuxt-link to="/contacts">Contact us</nuxt-link></li>
              <li><nuxt-link to="/blog">Blog</nuxt-link></li>
            </ul>
          </nav>
        </v-col>
        <v-col md="3" sm="12">
          <nav class="footer__nav">
            <ul>
              <li class="footer__nav-title">More</li>
              <li><nuxt-link to="/contacts">Contact us</nuxt-link></li>
              <li><nuxt-link to="/blog">Blog</nuxt-link></li>
            </ul>
          </nav>
        </v-col>
        <v-col md="3" sm="12">
          <nav class="footer__nav">
            <ul>
              <li class="footer__nav-title">Help</li>
              <li><a href="tel:416-893-0025">P: 416-893-0025</a></li>
              <li><a href="mailto:topbud@gmail.com">E: Topbud@gmail.com</a></li>
            </ul>
          </nav>
        </v-col>
      </v-row>
      <v-row class="footer__links-wrapper">
        <v-col cols="12">
          <div class="footer__links-title">Catalog</div>
        </v-col>
        <v-col cols="6" :md="links.length-1" sm="6" v-for="(group, i) in links" :key="i" class="footer__links">
          <ul>
            <li class="footer__links-item" v-for="link in group"><nuxt-link :to="link.link">{{link.title}}</nuxt-link></li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Footer",
  computed: {
    ...mapGetters({
      links: 'footerLinks'
    })
  }
}
</script>

<style lang="scss" scoped>
  .footer {
    background: #262626;
    padding: 30px 0;

    &__logo {
      margin-bottom: 30px;
      width: 160px;
      display: flex;
      align-items: center;

      img {
        width: 100%;
        height: auto;
      }
    }

    &__socials {
      display: flex;

      a:not(:last-child) {
        margin-right: 8px;
      }
    }

    &__nav {

      &-title {
        text-transform: uppercase;
        font-size: 15px;
        font-weight: 900;
        color: #CBE1BE;
      }

      ul {
        li {
          &:not(:last-child) {
            margin-bottom: 15px;
          }
          a {
            color: #DEDEDE;
            font-size: 14px;
          }
        }
      }
    }

    &__links {
      display: flex;
      flex-direction: column;

      &-wrapper {
        margin-top: 30px;
      }

      &-title {
        text-transform: uppercase;
        font-size: 15px;
        font-weight: 900;
        color: #CBE1BE;
      }

      &-item {
        &:not(:last-child) {
          margin-bottom: 10px;
        }
        a {
          font-size: 13px;
          color: #fff;
          transition: .3s;

          &:hover {
            color: #CBE1BE;
          }
        }
      }
    }
  }
</style>
