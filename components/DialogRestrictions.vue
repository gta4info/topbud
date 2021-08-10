<template>
  <v-dialog v-model="dialog" max-width="800" persistent>
    <div class="card">
      <div class="card__body">
        <img src="@/static/images/logo.png" alt="TOPBUD">
        <div class="card__title">Are You 19 Years Of Age Or Older?</div>
        <div class="card__buttons">
          <div class="card__buttons-item yes" @click="closeDialog" v-ripple>Yes, I am over 19</div>
          <a class="card__buttons-item no" href="https://en.wikipedia.org/wiki/Cannabis_laws_of_Canada_by_province_or_territory" v-ripple>No, I am under 19</a>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "ProductAddedToCart",
  data: () => ({dialog: true}),
  methods: {
    closeDialog() {
      this.$cookies.set('age_confirmed', true);
      this.$root.$emit('close-dialog-restrictions');
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    background: #212121 0 0 no-repeat padding-box;
    padding: 100px 50px;

    @media(max-width: 768px) {
      padding: 50px;
    }

    &__body {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__title {
      font-size: 40px;
      color: #fff;
      font-weight: 900;
      margin: 40px 0;

      @media(max-width: 768px) {
        font-size: 26px;
        text-align: center;
      }
    }

    &__buttons {
      display: flex;

      @media(max-width: 768px) {
        flex-direction: column;
        align-items: center;
      }

      &-item {
        display: flex;
        align-items: center;
        width: 208px;
        justify-content: center;
        height: 42px;
        transition: .3s;
        cursor: pointer;
        text-transform: uppercase;
        font-size: 14px;

        &.yes {
          background: #fff;
          color: #000;
          margin-right: 60px;

          @media(max-width: 768px) {
            margin-right: 0;
            margin-bottom: 20px;
          }

          &:hover {
            background: #000;
            color: #fff;
          }
        }

        &.no {
          color: #fff;
          border: 1px solid #fff;

          &:hover {
            background: #000;
            border-color: #000;
          }
        }
      }
    }
  }
</style>
