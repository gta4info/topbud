<template>
  <v-container>
    <v-form class="search" @submit.prevent="submit">
      <div class="search__input" :class="{'show': show}">
        <v-text-field
          v-model="query"
          label="What do you need?"
          required
          solo
        />
      </div>
      <v-btn @click="submit"  depressed>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    query: '',
    show: false
  }),
  methods: {
    submit() {
      alert(this.query)
    }
  }
}
</script>

<style lang="scss">
  .search {
    display: flex;
    margin-top: 10px;
    position: relative;
    max-width: 300px;
    overflow: hidden;
    margin-left: auto;
    margin-right: 30px;
    height: 100%;

    &__input {
      position: absolute;
      top: 0;
      bottom: 0;
      right: -350px;

      &.show {
        right: 0;
      }
    }

    .v-text-field {
      border-radius: 0;

      .v-input__slot {
        box-shadow: none !important;
        border: 1px solid #dedede;
      }
    }

    .v-btn {
      height: 48px !important;
      width: 48px !important;
      background: #7FAD39 !important;
      color: #fff;
      border-radius: 0;
      position: absolute;
      right: 0;
    }
  }
</style>
