<template>
  <div>
    <section class="screen main">
      <v-container class="d-flex fill-height">
        <div class="screen__content">
          <h1 class="screen__title">Fast, Reliable Weed Delivery In Vaughan And Surrounding Areas</h1>
          <p>From flower to concentrates, from edibles to topicals, Tweeder is the go-to weed delivery service for residents of Vaughan, Richmond Hill, Woodbridge, Kleinburg, Markham, Concord and the surrounding areas.</p>
          <div class="screen__bottom">
            <span>View Our Products</span>
            <nuxt-link to="/shop" v-ripple>></nuxt-link>
          </div>
        </div>
      </v-container>
    </section>
    <v-container class="howDeliveryWorks-wrapper">
      <section class="howDeliveryWorks">
        <div class="howDeliveryWorks__left">
          <img src="@/static/images/delivery-works.webp" alt="Delivery">
        </div>
        <div class="howDeliveryWorks__right">
          <h3>How Does Our Weed Delivery Service Work?</h3>
          <p>Curiosity About Life In All Its Aspects, I Think, Is Still The Secret Of Great Creative People.Our Signup Process Couldn’t Be Easier. All You Have To Do Is Create A Profile And Send Us Proof Of Your Age. Within Ten Minutes, You Will Receive An Email And A Text Message Letting You Know That Your Profile Has Been Approved. Then, You Will Be Able To Place Your Order From Our Generous Selection Of Flower, Edibles, Concentrates, And Other Cannabis Products.</p>
          <p>Reluctant To Set Up A Profile? No Problem! You Can Still Browse Our Website To Select Your Products, Then Send Us A Text To 416-893-0025 With Your Order And A Picture Of Yourself Holding A Clearly Visible ID.</p>
          <p>Once We Have Received Your Order And Verified That You Are 19 Years Or Older, We Will Package The Products You Have Requested And Send Them Off With Our Driver. We Will Text You When The Driver Is Close By. If You Place Your Order During Regular Business Hours, You Will Receive Your Goods On The Same Day.</p>
          <nuxt-link to="/shop" v-ripple>View Our Products</nuxt-link>
        </div>
      </section>
    </v-container>
    <v-container>
      <section class="productsOffer">
          <h3>What Products Do We Offer?</h3>
          <p>Not everyone uses marijuana for the same reasons, and not everyone consumes it in the same way. We carry a broad selection of quality weed products to cater to a diverse range of customer needs.</p>
      </section>
    </v-container>
    <v-container>
      <section class="category">
        <div class="category__categories">
          <h4>Flower</h4>
          <div class="category__items">
            <v-expansion-panels v-model="panel1" multiple>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel1.includes(0)}">Indica</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">If you are in need of relaxation, this is the way to go. Weed from indica plants will soothe you and help you sleep. Some strains are an effective treatment for anxiety and pain.</div>
                  <nuxt-link to="/">View Indica Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel1.includes(1)}">Sativa</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">Are you looking for an energy boost? Marijuana from sativa plants will invigorate you, give you the energy you need to complete a task, and boost your creativit</div>
                  <nuxt-link to="/">View Sativa Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel1.includes(2)}">Hybrid</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">Many people want the best of both the indica and sativa worlds. Maybe you want pain relief without the sedation, or maybe you want to take a slight edge off your energy without taking it away. Hybrid plants are bred to be indica-dominant, sativa-dominant, or equally balanced between the two.</div>
                  <nuxt-link to="/">View Hybrid Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel1.includes(3)}">Pre-Rolls</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">If you can’t be bothered to do the grinding, rolling and sealing of your own marijuana joint, you can get prerolls that have already been rolled for you.</div>
                  <nuxt-link to="/">View Pre-Rolls Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <nuxt-link to="/category/flower" v-ripple>View Our Products</nuxt-link>
          </div>
        </div>
        <img class="category__image" src="@/static/images/i1625427868.webp" alt="Flower"/>
      </section>
    </v-container>
    <v-container>
      <section class="category image-first">
        <div class="category__categories">
          <h4>Edibles</h4>
          <div class="category__items">
            <v-expansion-panels v-model="panel2" multiple>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel2.includes(0)}">Beverages</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">Tasty beverages that are infused with THC Distillate include a variety of hot teas, an iced tea mix, and cocoa.</div>
                  <nuxt-link to="/">View Beverages Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel2.includes(1)}">Candy</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">Who doesn’t love a good piece of candy? Our selection of sweet treats containing marijuana include lollipops, caramel cups, and a variety of chocolate truffles.</div>
                  <nuxt-link to="/">View Candy Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel2.includes(2)}">Chips & Snacks</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">If you prefer savoury to sweet, why not try our tortilla chips that come in a variety of flavours? Eat them on their own or add your favourite nacho toppings.</div>
                  <nuxt-link to="/">View Chips & Snacks Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel2.includes(3)}">Chocolate</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">You can’t go wrong with good quality chocolate, and we offer a selection of chocolate bars, peanut butter cups, and of course, chocolate brownies.</div>
                  <nuxt-link to="/">View Chocolate Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel2.includes(4)}">Cookies</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">We offer peanut butter cookies chocolate cookies, lemon drop cookies, and more. If you’re looking for Christmas-themed cookies, try our candy cane cookies or “Santa’s Oreos”</div>
                  <nuxt-link to="/">View Cookies Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel2.includes(5)}">Gummies</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">Looking for something sweet but not a chocolate fan? Try our selection of gummies that come in different flavours and THC content.</div>
                  <nuxt-link to="/">View Gummies Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel2.includes(6)}">Tinctures & Oils</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">If you are looking for a way to switch from smoking weed to consuming it in a smokeless manner, our tinctures are a great way to start. You can infuse them to your baked goods or simply add a few drops to your favourite beverage.</div>
                  <nuxt-link to="/">View Tinctures & Oils Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <nuxt-link to="/category/edibles" v-ripple>View Our Products</nuxt-link>
          </div>
        </div>
        <img class="category__image" src="@/static/images/i1613407712.webp" alt="Flower"/>
      </section>
    </v-container>
    <section class="screen topicals">
      <v-container class="d-flex fill-height">
        <div class="screen__content">
          <h4 class="screen__title">Topicals</h4>
          <p>If you are looking for relief of localized pain or inflammation but you don’t want to ingest any weed products, try our lotions and oils that are absorbed through the skin.</p>
          <div class="screen__bottom">
            <span>View Our Products</span>
            <nuxt-link to="/category/topicals" v-ripple>></nuxt-link>
          </div>
        </div>
      </v-container>
    </section>
    <v-container>
      <section class="category">
        <div class="category__categories">
          <h4>Concentrates</h4>
          <div class="category__items">
            <v-expansion-panels v-model="panel3" multiple>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel3.includes(0)}">Capsules</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">Easily get the effects you are looking for without the need to smoke or vape. Cannabis capsules come in a variety of strengths and strains.</div>
                  <nuxt-link to="/">View Capsules Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel3.includes(1)}">Diamonds</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">Diamonds is a THC concentrate in its purest form. With their gem-like appearance, they are up to four times stronger than your run-of-the-mill weed. They can only be consumed via a method that uses a heat source, such as smoking.</div>
                  <nuxt-link to="/">View Diamonds Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel3.includes(2)}">Distillate & Oils</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">This is a concentrated form of weed that isolates THC or CBD, depending on what effects you are looking for. These products are designed to give you the benefits you need in just one or two drops.</div>
                  <nuxt-link to="/">View Distillate & Oils Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel3.includes(3)}">Hash</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">When you separate trichomes from the plant matter and turn it into a brick, you end up with hash. It is a concentrated form of weed that is usually smoked in a pipe or bong.</div>
                  <nuxt-link to="/">View Hash Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel3.includes(4)}">Sauce</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">If you like intense flavours, try a marijuana sauce – an extract with a thick, sticky consistency that is consumed by dabbing.</div>
                  <nuxt-link to="/">View Sauce Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel3.includes(5)}">Shatter</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">This extract has a translucent, glass-like appearance, and as its name suggests, it can shatter like glass on impact. It can be consumed by vaping, but it is usually dabbed.</div>
                  <nuxt-link to="/">View Shatter Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <nuxt-link to="/category/concentrates" v-ripple>View Our Products</nuxt-link>
          </div>
        </div>
        <img class="category__image" src="@/static/images/i1621638660.webp" alt="Concentrates"/>
      </section>
    </v-container>
    <v-container>
      <section class="category image-first">
        <div class="category__categories">
          <h4>Vapes</h4>
          <div class="category__items">
            <v-expansion-panels v-model="panel4" multiple>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel4.includes(0)}">Cartridges</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">Tasty beverages that are infused with THC Distillate include a variety of hot teas, an iced tea mix, and cocoa.</div>
                  <nuxt-link to="/">View Cartridges Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel4.includes(1)}">Disposables</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">Who doesn’t love a good piece of candy? Our selection of sweet treats containing marijuana include lollipops, caramel cups, and a variety of chocolate truffles.</div>
                  <nuxt-link to="/">View Disposables Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="category__item">
                <v-expansion-panel-header>
                  <h5 class="category__item-title" :class="{'active': panel4.includes(2)}">Batteries</h5>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="category__item-text">If you prefer savoury to sweet, why not try our tortilla chips that come in a variety of flavours? Eat them on their own or add your favourite nacho toppings.</div>
                  <nuxt-link to="/">View Batteries Products</nuxt-link>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <nuxt-link to="/category/vape-pens" v-ripple>View Our Products</nuxt-link>
          </div>
        </div>
        <img class="category__image" src="@/static/images/Buy-CO2-Oil-Cartridg.webp" alt="Vapes"/>
      </section>
    </v-container>
    <section class="screen accessories">
      <v-container class="d-flex fill-height">
        <div class="screen__content">
          <h4 class="screen__title">Accessories</h4>
          <p>We carry a selection of lighters, bongs, pipes, rolling trays and grinders that will make your consumption of our products easier and more enjoyable.</p>
          <div class="screen__bottom">
            <span>View Our Products</span>
            <nuxt-link to="/category/accessories" v-ripple>></nuxt-link>
          </div>
          <img src="@/static/images/Homepage_Content3_2x.webp" alt="" class="screen__image">
        </div>
      </v-container>
    </section>
    <v-container>
      <section class="safety">
        <h3>A Word About Safety</h3>
        <p>When used responsibly, our weed products can be both enjoyable and beneficial. To ensure that you have the best possible experience with our products, follow these simple safety guidelines:</p>
      </section>
    </v-container>
    <v-container>
      <section class="steps">
        <div class="steps__item">
          <img src="@/static/images/icons8---100.png" alt="Age Restriction">
          <div class="steps__item-title">Age Restriction</div>
          <p>Do not consume weed in any form without the close supervision of a doctor if you have not reached the minimum legal age for consumption. That minimum age is there for a reason.</p>
        </div>
        <div class="steps__item">
          <img src="@/static/images/icons8----100.webp" alt="Age Restriction">
          <div class="steps__item-title">Good Support</div>
          <p>Ensure that your weed products are kept in a place where children and pets cannot get to them. Edibles in particular can be tempting to kids who are looking for a sweet treat..</p>
        </div>
        <div class="steps__item">
          <img src="@/static/images/icons8----100.png" alt="Age Restriction">
          <div class="steps__item-title">Individual Approach</div>
          <p>If you have a history of addiction, or if you are pregnant and/or breastfeeding, talk to your doctor before you consume.</p>
        </div>
        <div class="steps__item">
          <img src="@/static/images/icons8---100.webp" alt="Age Restriction">
          <div class="steps__item-title">Don't risk your health</div>
          <p>If you feel ill following the consumption of any weed products, stop use immediately and talk to your doctor.</p>
        </div>
        <div class="steps__line">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
      </section>
    </v-container>
<!--    <v-container>-->
<!--      <section class="signup">-->
<!--        <div class="signup__title">Sign Up Your Profile Today!</div>-->
<!--        <div class="signup__text">-->
<!--          <div>-->
<!--            <p>If you are ready to start ordering high quality products from our weed delivery service, take a few minutes to create a profile.</p>-->
<!--            <p>Delivery is FREE for orders over $100, and a modest $10 delivery fee is applied for orders below that. Please note that we can only accept cash payments at this time. Payment should be placed in an envelope and handed to your driver, who will verify the amount upon delivery of your order. Our minimum order amount is based on the area of delivery. You can text us to find out the minimum order requirements based on your area of residence.</p>-->
<!--            <p>For more information, contact us by phone or via chat, and our friendly, knowledgeable weed experts will be happy to answer all of your questions.</p>-->
<!--            <nuxt-link to="/">Sign Up Today</nuxt-link>-->
<!--            <div class="signup__bottom">-->
<!--              <div v-for="i of 5" :key="i">-->
<!--                <img :src="require(`@/static/images/${i}.webp`)" alt="Image" v-if="i > 2">-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="signup__text-images">-->
<!--            <img :src="require(`@/static/images/${i}.webp`)" alt="Image" v-for="i of 2" :key="i">-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->
<!--    </v-container>-->
    <v-container>
      <div class="viewProducts-wrapper">
        <nuxt-link class="viewProducts" to="/shop">
          <span>View Our Products</span>
          <div class="viewProducts__btn">></div>
        </nuxt-link>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    panel1: [0],
    panel2: [0],
    panel3: [0],
    panel4: [0],
  })
}
</script>

<style lang="scss" scoped>
  .screen {
    background-attachment: scroll;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    height: 550px;

    .container {
      position: relative;
    }

    &__image {
      max-height: 70%;
      position: absolute;
      right: 0;
      align-self: center;
    }

    &.main {
      height: 700px;
      background-image: url('@/static/images/Marijuana_anankkml_A.webp');
      background-position: right center;
      margin-top: -85px;
    }

    &.topicals {
      background-image: url('@/static/images/Vape-Lung-454.webp');
      background-position: left center;
    }

    &.accessories {
      background-image: url('@/static/images/2aad7e38111feff06a07.webp');
      background-position: left center;
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8));
    }

    &__content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-bottom: 100px;
      width: 50%;
      z-index: 1;

      @media(max-width: 768px) {
        width: 100%;
      }
    }

    &__title, p, &__bottom {
      color: #cbe1be;
    }

    &__title {
      font-size: 39px;
      line-height: 1.2;
      font-weight: 900;
      letter-spacing: 1px;
      margin-bottom: 80px;

      @media(max-width: 768px) {
        z-index: 1;
      }
    }

    p {
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 80px;

      @media(max-width: 768px) {
        z-index: 1;
      }
    }

    &__bottom {
      display: flex;

      @media(max-width: 768px) {
        justify-content: center;
        z-index: 1;
      }

      span {
        font-size: 20px;
        margin-right: 25px;
      }

      a {
        border-radius: 50%;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #cbe1be;
        color: #cbe1be !important;
        animation: scale 3s infinite;
        transition: .3s;

        &:hover {
          background: #cbe1be;
          color: #000 !important;
        }
      }
    }
  }

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }

  .howDeliveryWorks {
    display: flex;
    position: relative;
    margin-top: 10px;
    width: 90%;

    @media(max-width: 768px) {
      width: 100%;
      flex-direction: column;
    }

    &-wrapper {
      display: flex;
      justify-content: center;
    }

    &__left {
      box-shadow: 0 0 10px 0 rgb(0 138 28);
      z-index: 1;
      align-self: flex-start;
      height: 485px;

      @media(max-width: 768px) {
        height: 385px;
        img {
          width: 100%;
        }
      }
    }

    &__right {
      margin-top: 60px;
      background: #E9F5EC;
      padding: 20px 15px 20px 30px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    h3 {
      font-size: 32px;
      font-weight: 900;
      line-height: 1.55;
      margin-bottom: 20px;
      width: 90%;
    }

    p {
      font-size: 12px;
      font-weight: 500;
      line-height: 1.8;
      margin-bottom: 20px;
    }

    a {
      height: 30px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      background: #71C778;
      color: #fff;
      font-weight: 500;
      font-size: 14px;
    }
  }

  .productsOffer {
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      font-size: 50px;
      font-weight: 900;
      margin-bottom: 10px;

      @media(max-width: 768px) {
        font-size: 30px;
        text-align: center;
      }
    }

    p {
      text-align: center;
      width: 80%;

      @media(max-width: 768px) {
        width: 100%;
      }
    }
  }

  .category {
    display: flex;
    margin-bottom: 20px;

    @media(max-width: 768px) {
      flex-direction: column-reverse;
    }

    &.image-first {
      flex-direction: row-reverse;

      @media(max-width: 768px) {
        flex-direction: column-reverse;
      }
    }

    &__categories {
      display: flex;
      flex-direction: column;
      margin-right: 60px;

      @media(max-width: 768px) {
        margin-right: 0;
      }
    }

    h4 {
      background: #72b84a;
      color: #ffffff;
      font-size: 42px;
      padding: 5px 40px 5px 10px;
      line-height: 1;
      align-self: flex-start;
      margin-bottom: 40px;

      @media(max-width: 768px) {
        font-size: 36px;
        padding-right: 10px;
        align-self: center;
      }
    }

    &__items {
      display: flex;
      flex-direction: column;
      width: 365px;
      margin-left: 60px;

      @media(max-width: 768px) {
        margin-left: 0;
        width: 100%;
      }

      & > a {
        color: #63B03A;
        font-weight: 900;
        font-size: 14px;
        height: 52px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        border: 2px solid #63B03A;
        align-self: flex-start;
        margin-top: 20px;

        @media(max-width: 768px) {
          align-self: center;
        }
      }
    }

    &__item {

      .v-expansion-panel-header {
        padding: 0;
      }

      &:before {
        box-shadow: none;
      }

      &:not(:last-child) {
        margin-bottom: 10px;
      }

      &-title {
        font-size: 22px;
        padding-bottom: 5px;
        border-bottom: 1px solid #72b84a;
        margin-bottom: 20px;
        line-height: 1;
        font-weight: 500;
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;

        &:before {
          content: '❮';
          position: absolute;
          right: 5px;
          transform: rotate(-90deg);
          font-weight: 900;
          font-size: 30px;
          transition: .3s;
        }

        &:hover, &.active {
          &:before {
            transform: rotate(90deg);
          }
        }
      }

      &-text {
        font-size: 12px;
        line-height: 1.8;
      }

      a {
        font-size: 12px;
        color: #72b84a;
      }
    }

    &__image {
      align-self: flex-start;
      margin-left: auto;
      margin-right: auto;

      @media(max-width: 768px) {
        margin-bottom: 40px;
        max-width: 100%;
      }
    }
  }

  .safety {
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      font-size: 40px;
      font-weight: 900;
      margin-bottom: 35px;
      margin-top: 50px;

      @media(max-width: 768px) {
        font-size: 36px;
      }
    }

    p {
      text-align: center;
      width: 50%;

      @media(max-width: 768px) {
        width: 100%;
      }
    }
  }

  .steps {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    position: relative;

    @media(max-width: 768px) {
      width: 100%;
    }

    &__line {
      position: absolute;
      height: 80%;
      margin-top: 120px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 30px;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;

      @media(max-width: 768px) {
        display: none;
      }

      &:before {
        content: '';
        position: absolute;
        top: 30px;
        bottom: 30px;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 2px;
        height: calc(100% - 60px);
        background: #000;
      }

      div {
        width: 30px;
        height: 30px;
        background: #000;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: 900;
        padding-right: 2px;
        z-index: 1;
        box-shadow: 0 0 0 2px #fff;
      }
    }

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 374px;

      @media(max-width: 768px) {
        width: 100%;
      }

      &:nth-child(2n + 1) {
        margin-right: auto;
      }

      &:nth-child(2n) {
        margin-left: auto;
      }

      img {
        margin-bottom: 15px;
      }

      &-title {
        font-weight: 900;
        font-size: 22px;
        margin-bottom: 15px;
      }

      p {
        line-height: 1.8;
        text-align: center;
      }
    }
  }

  .signup {
    display: flex;
    flex-direction: column;

    @media(max-width: 768px) {
      display: none;
    }

    &__title {
      font-size: 38px;
      font-weight: 900;
      background: #CBE1BE;
      line-height: 1.2;
      padding: 5px 20px 5px 5px;
      align-self: flex-start;
      margin-bottom: 20px;
    }

    a {
      color: #63B03A;
      font-weight: 900;
      font-size: 14px;
      height: 52px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      border: 2px solid #63B03A;
      align-self: flex-start;
    }

    p {
      margin-bottom: 20px;
      line-height: 1.8;
    }

    &__text {
      display: flex;
      justify-content: flex-start;

      & > div {
        display: flex;
        flex-direction: column;

        a {
          align-self: flex-start;
          margin-bottom: 20px;
        }
      }

      &-images {
        display: flex;
        flex-wrap: wrap;

        img {
          margin: 5px;
          align-self: flex-start;
        }
      }
    }

    &__bottom {
      display: flex;
      justify-content: flex-start;
    }
  }

  .viewProducts {
    display: flex;
    margin: 60px auto;
    align-items: center;

    @media(max-width: 768px) {
      justify-content: center;
      z-index: 1;
    }

    &:hover {
      .viewProducts__btn {
        background: #cbe1be;
        color: #000 !important;
        border-color: #cbe1be;
      }
    }

    &-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    span {
      margin-right: 25px;
      font-size: 40px;
      font-weight: 900;
    }

    &__btn {
      border-radius: 50%;
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #000;
      color: #000 !important;
      animation: scale 3s infinite;
      transition: .3s;
    }
  }
</style>
