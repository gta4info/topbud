<template>
  <v-form class="search" @submit.prevent="submit">
    <div class="search__container" v-click-outside="onClickOutside">
      <div class="search__input" :class="{'show': show}">
        <input
          v-model="query"
          placeholder="What do you need?"
          required
        />
      </div>
      <v-btn icon @click="showOrSubmit" depressed>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    query: '',
    show: false
  }),
  methods: {
    onClickOutside () {
      this.query = '';
      this.show = false
    },
    showOrSubmit() {
      if(!this.query.length) {
        this.show = !this.show;
      } else {
        this.submit();
      }
    },
    submit() {
      this.$router.push({name: 'shop-search', query: {q: this.query}})
    }
  }
}
</script>

<style lang="scss" scoped>
  .search {
    display: flex;
    position: relative;
    width: 48px;
    height: 48px;
    margin-left: 0;
    margin-right: 10px;
    padding-right: 24px;

    &:after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      top: 0;
      width: 24px;
      background: #262626;
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 24px;
      height: 100%;
      background: #262626;
    }

    &__input {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 48px;
      transition: .5s;

      input {
        width: 100%;
        height: 100%;
        background: #ffffff;
        border: 1px solid #dedede;
        outline: 0;
        padding: 0 12px;
        border-radius: 40px 0 0 40px;
      }

      &.show {
        right: 0;
        width: 200px;
        input {
          border-radius: 20px 0 0 20px;
        }
      }
    }

    .v-btn {
      height: 48px !important;
      width: 48px !important;
      background: #7FAD39 !important;
      color: #fff;
      position: absolute;
      right: 0;
      z-index: 1;
    }
  }
</style>
