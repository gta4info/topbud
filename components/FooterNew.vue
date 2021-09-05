<template>
  <footer class="footer">
    <v-container>
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
              <nuxt-link to="/">FAQs</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/blog">Blog</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/contacts">Contact us</nuxt-link>
            </li>
            <li>&nbsp;</li>
            <li>
              <a href="tel:14163884091">1 (416) 388 - 4091</a>
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
    <v-container fluid class="footer__bottom-wrapper">
      <v-container>
        <div class="footer__bottom">
          <div class="footer__bottom-copyrights">2021 © TopBudStore</div>
          <div class="footer__bottom-payments">
            <img src="@/static/images/visa.png" alt="Visa">
            <img src="@/static/images/maestro.png" alt="Maestro">
            <img src="@/static/images/paypal.png" alt="PayPal">
          </div>
          <div class="footer__bottom-socials">
            <a href="#" target="_blank">
              <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.9263 8.52611C28.8583 6.98522 28.6091 5.92587 28.2521 5.00794C27.8838 4.03357 27.3172 3.16122 26.5748 2.43603C25.8495 1.69956 24.9712 1.12728 24.0079 0.7648C23.0845 0.407849 22.0305 0.158669 20.4893 0.0907315C18.9366 0.0170398 18.4437 0 14.5056 0C10.5676 0 10.0747 0.0170398 8.52773 0.0849778C6.98655 0.152916 5.927 0.402317 5.00911 0.759046C4.03434 1.12728 3.16182 1.6938 2.4365 2.43603C1.69988 3.16122 1.12772 4.03932 0.764946 5.0024C0.407927 5.92587 0.1587 6.97947 0.0907488 8.52035C0.0170431 10.0727 0 10.5656 0 14.5029C0 18.4402 0.0170431 18.933 0.084994 20.4797C0.152945 22.0205 0.402394 23.0799 0.759413 23.9978C1.12772 24.9722 1.69988 25.8445 2.4365 26.5697C3.16182 27.3062 4.04009 27.8785 5.00336 28.241C5.927 28.5979 6.9808 28.8471 8.5222 28.915C10.0689 28.9832 10.5621 29 14.5001 29C18.4382 29 18.9311 28.9832 20.478 28.915C22.0192 28.8471 23.0788 28.5979 23.9966 28.241C25.946 27.4874 27.4872 25.9466 28.2408 23.9978C28.5976 23.0743 28.8471 22.0205 28.915 20.4797C28.983 18.933 29 18.4402 29 14.5029C29 10.5656 28.9942 10.0727 28.9263 8.52611ZM26.3143 20.3663C26.2519 21.7826 26.0139 22.5474 25.8156 23.0573C25.3282 24.3207 24.3253 25.3234 23.0617 25.8107C22.5517 26.009 21.7813 26.2469 20.3702 26.309C18.8403 26.3772 18.3815 26.394 14.5114 26.394C10.6413 26.394 10.1767 26.3772 8.65235 26.309C7.23578 26.2469 6.47083 26.009 5.96087 25.8107C5.33205 25.5783 4.75966 25.2101 4.29507 24.7285C3.81344 24.2583 3.44513 23.6918 3.21273 23.0631C3.01441 22.5532 2.77647 21.7826 2.71427 20.3721C2.6461 18.8425 2.62928 18.3835 2.62928 14.5142C2.62928 10.6448 2.6461 10.1803 2.71427 8.65645C2.77647 7.24015 3.01441 6.47535 3.21273 5.96549C3.44513 5.33656 3.81344 4.76451 4.30083 4.29979C4.77095 3.81825 5.33758 3.45001 5.96662 3.21787C6.47659 3.01959 7.24729 2.78169 8.6581 2.71929C10.188 2.65135 10.647 2.63431 14.5169 2.63431C18.3928 2.63431 18.8516 2.65135 20.376 2.71929C21.7926 2.78169 22.5575 3.01959 23.0675 3.21787C23.6963 3.45001 24.2687 3.81825 24.7333 4.29979C25.2149 4.77004 25.5832 5.33656 25.8156 5.96549C26.0139 6.47535 26.2519 7.24569 26.3143 8.65645C26.3822 10.186 26.3993 10.6448 26.3993 14.5142C26.3993 18.3835 26.3822 18.8367 26.3143 20.3663Z" fill="#DDDDDD"/>
                <path d="M14.5056 7.05316C10.3921 7.05316 7.0545 10.3899 7.0545 14.5029C7.0545 18.6159 10.3921 21.9526 14.5056 21.9526C18.6194 21.9526 21.9568 18.6159 21.9568 14.5029C21.9568 10.3899 18.6194 7.05316 14.5056 7.05316ZM14.5056 19.3353C11.837 19.3353 9.67227 17.1713 9.67227 14.5029C9.67227 11.8345 11.837 9.67043 14.5056 9.67043C17.1745 9.67043 19.339 11.8345 19.339 14.5029C19.339 17.1713 17.1745 19.3353 14.5056 19.3353Z" fill="#DDDDDD"/>
                <path d="M23.9911 6.75861C23.9911 7.71904 23.2122 8.49778 22.2514 8.49778C21.2908 8.49778 20.5119 7.71904 20.5119 6.75861C20.5119 5.79796 21.2908 5.01944 22.2514 5.01944C23.2122 5.01944 23.9911 5.79796 23.9911 6.75861Z" fill="#DDDDDD"/>
              </svg>
            </a>
            <a href="#" target="_blank">
              <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.8377 13.228L17.1086 8.44011C16.6067 8.16481 16.0134 8.17509 15.5215 8.4673C15.0292 8.75982 14.7356 9.27656 14.7356 9.85012V19.3436C14.7356 19.9145 15.0274 20.4303 15.5163 20.7231C15.7717 20.876 16.0547 20.9528 16.3384 20.9528C16.5982 20.9528 16.8587 20.8884 17.0983 20.7591L25.8278 16.0537C26.346 15.7742 26.6694 15.2342 26.6719 14.644C26.674 14.0539 26.3544 13.5114 25.8377 13.228ZM17.051 18.1494V11.054L23.575 14.6325L17.051 18.1494Z" fill="#DDDDDD"/>
                <path d="M39.2213 7.08056L39.2195 7.06243C39.186 6.74362 38.8529 3.90789 37.4777 2.46555C35.8881 0.769068 34.0861 0.562976 33.2194 0.464161C33.1476 0.456001 33.0819 0.448447 33.0231 0.44059L32.9541 0.433337C27.7306 0.0525807 19.8419 0.000604376 19.7629 0.000302188L19.7559 0L19.749 0.000302188C19.67 0.000604376 11.7813 0.0525807 6.51076 0.433337L6.44112 0.44059C6.38505 0.448145 6.32325 0.455095 6.25603 0.462952C5.3993 0.562069 3.61652 0.768464 2.02244 2.52629C0.712632 3.95322 0.334009 6.72821 0.295121 7.04007L0.2906 7.08056C0.278843 7.21322 0 10.3714 0 13.5419V16.5058C0 19.6764 0.278843 22.8345 0.2906 22.9675L0.29271 22.9874C0.326171 23.3011 0.658974 26.0849 2.02787 27.5278C3.52246 29.1675 5.41227 29.3844 6.42876 29.5011C6.58944 29.5195 6.7278 29.5352 6.82216 29.5519L6.9135 29.5645C9.92952 29.8522 19.3858 29.994 19.7867 29.9997L19.7988 30L19.8108 29.9997C19.8898 29.9994 27.7782 29.9474 33.0017 29.5667L33.0708 29.5594C33.1368 29.5506 33.2109 29.5428 33.2923 29.5343C34.1442 29.4437 35.9174 29.2554 37.4895 27.5215C38.7993 26.0942 39.1782 23.3192 39.2168 23.0077L39.2213 22.9672C39.2331 22.8342 39.5122 19.6764 39.5122 16.5058V13.5419C39.5119 10.3714 39.2331 7.21353 39.2213 7.08056ZM37.1964 16.5058C37.1964 19.4403 36.9408 22.4625 36.9167 22.7399C36.8184 23.5042 36.419 25.2599 35.7808 25.9552C34.7969 27.0404 33.7861 27.148 33.0482 27.2262C32.9589 27.2356 32.8763 27.2447 32.8016 27.254C27.7492 27.6203 20.1584 27.6765 19.8087 27.6786C19.4165 27.6729 10.0986 27.5299 7.17455 27.2576C7.02473 27.2332 6.86285 27.2144 6.69223 27.1951C5.82676 27.0957 4.64206 26.9597 3.73107 25.9552L3.70967 25.9322C3.08265 25.2774 2.69468 23.6356 2.5961 22.749C2.57771 22.5393 2.31545 19.4814 2.31545 16.5058V13.5419C2.31545 10.6107 2.57048 7.59187 2.5952 7.30871C2.71246 6.4085 3.11942 4.75916 3.73107 4.09253C4.74515 2.97443 5.8144 2.85054 6.52161 2.76865C6.58913 2.76079 6.65214 2.75354 6.71032 2.74598C11.8362 2.37792 19.4816 2.32322 19.7559 2.3211C20.0303 2.32292 27.673 2.37792 32.7533 2.74598C32.8157 2.75384 32.8839 2.76169 32.9571 2.77016C33.6845 2.85326 34.7839 2.97897 35.7929 4.05778L35.8022 4.06775C36.4292 4.72259 36.8172 6.39309 36.9158 7.29753C36.9333 7.49547 37.1964 10.56 37.1964 13.5419V16.5058Z" fill="#DDDDDD"/>
              </svg>
            </a>
          </div>
        </div>
      </v-container>
    </v-container>
    <v-container fluid class="footer__links-wrapper">
      <v-container>
        <div class="footer__links">
          <div class="footer__links-col" v-for="(chunk, index) in linksChunks" :key="index">
            <nuxt-link :to="item.link" v-for="(item, i) in chunk" :key="i">{{item.title}}</nuxt-link>
          </div>
        </div>
      </v-container>
    </v-container>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Footer",
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
    background: #fff;

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
      }
    }

    &__bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
</style>
