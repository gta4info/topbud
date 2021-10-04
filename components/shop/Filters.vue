<template>
  <div class="filters">
    <div class="filter__group">
      <div class="filter__title md">Search by name</div>
      <v-text-field
        v-model="searchQuery"
        solo
        dense
        hide-details
        clearable
        label="Type something"
        class="filter__input"
      />
    </div>
    <div class="filter__group">
      <div class="filter__title">Price range</div>
      <div class="filter__slider">
        <div class="filter__slider-inputs">
          <div>
            <div class="mr-3">
              <v-text-field v-model="minData" prefix="$" placeholder="From" solo dense class="filter__input" hide-details type="number" @keypress.enter="updatePrices"/>
            </div>
            <div>
              <v-text-field v-model="maxData" prefix="$" placeholder="To" solo dense class="filter__input" hide-details type="number" @keypress.enter="updatePrices"/>
            </div>
          </div>
          <v-btn
            class="filter__slider-inputs--apply"
            @click="updatePrices"
            color="#7FAD39"
            depressed
            v-show="showUpdatePriceBtn"
          >
            Apply filters
          </v-btn>
        </div>
      </div>
    </div>
    <div class="filter__group" v-if="categories && categories.length">
      <div class="filter__title">Categories</div>
      <div class="filter__categories">
        <div
          class="filter__category"
          :class="{subs: category.subs && category.subs.length}"
          v-for="category in categoriesData"
          :key="category.slug"
        >
          <div class="filter__category-title">
            <div>
              <input
                :id="`category-${category.id}`"
                type="checkbox"
                :checked="category.selected"
                @change="category.selected = !category.selected; category.subs && category.subs.length ? category.subs.map(item => {item.selected = category.selected}) : null">
              <label :for="`category-${category.id}`">{{category.name}}</label>
            </div>
            <v-btn icon small @click="category.showSubs = !category.showSubs" v-if="category.subs && category.subs.length">
              <v-icon v-if="category.showSubs">mdi-chevron-up</v-icon>
              <v-icon v-else>mdi-chevron-down</v-icon>
            </v-btn>
          </div>
          <div
            class="filter__category-subs"
            :class="{active: category.showSubs}" v-if="category.subs && category.subs.length"
          >
            <div
              class="filter__category-sub"
              v-for="sub in category.subs"
              :key="sub.id"
            >
              <input :id="`sub-${sub.id}`" type="checkbox" :checked="sub.selected" @change="sub.selected = !sub.selected">
              <label :for="`sub-${sub.id}`">{{sub.name}}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  props: {
    categories: {
      type: Array,
      required: false
    },
    min: {
      required: true
    },
    max: {
      required: true
    },
    search: {
      type: String,
      required: true
    }
  },
  methods: {
    updatePrices() {
      this.$root.$emit('change-filter-range', {
        min: parseInt(this.minData),
        max: parseInt(this.maxData),
      })
      this.showUpdatePriceBtn = false;
    }
  },
  watch: {
    minData() {
      this.showUpdatePriceBtn = true;
    },
    maxData() {
      this.showUpdatePriceBtn = true;
    },
    categoriesData: {
      handler() {
        this.$root.$emit('change-filter-categories', this.categoriesData)
      },
      deep: true
    },
    searchQuery() {
      this.$root.$emit('change-filter-search-query', this.searchQuery)
    }
  },
  data() {
    return {
      categoriesData: this.categories ?? [],
      searchQuery: this.search,
      minData: this.min,
      maxData: this.max,
      showUpdatePriceBtn: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .filters {
    display: flex;
    flex-direction: column;
    padding: 30px 20px;
    margin-left: auto;
    position: sticky;
    top: 40px;
    box-shadow: 0 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  .filter {
    &__group {
      display: flex;
      flex-direction: column;

      &:not(:last-child) {
        margin-bottom: 40px;
      }
    }

    &__title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 21px;
      display: flex;
      align-items: center;
    }

    &__slider {
      display: flex;
      flex-direction: column;

      &-inputs {
        display: flex;
        flex-direction: column;

        > div {
          justify-content: space-between;
          align-items: center;
          display: flex;

          > div:first-of-type {
            position: relative;

            &:before {
              position: absolute;
              content: '';
              background: #C4C4C4;
              width: 29px;
              height: 2px;
              right: -45px;
              top: 0;
              bottom: 0;
              margin: auto;
            }
          }
        }

        .filter__input {
          max-width: 90px;
        }

        span {
          font-weight: 900;
        }

        &--apply {
          height: 40px !important;
          width: 100% !important;
          margin-top: 10px;
          color: #fff;
          font-weight: 700;
        }
      }
    }

    &__categories {
      display: flex;
      flex-direction: column;
    }

    &__category {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;

      &:not(:last-child) {
        margin-bottom: 15px;
      }

      &.subs {
        .filter__category-title {
          border-bottom: 1px solid #E9E9E9;
          padding-bottom: 5px;
          margin-bottom: 5px;
        }
      }

      &-title {
        font-size: 16px;
        font-weight: 900;
        background: #fff;
        display: flex;

        & > div {
          display: flex;
          align-items: center;

          input {
            cursor: pointer;
            margin-right: 0;
          }

          label {
            cursor: pointer;
            padding-left: 6px;
            line-height: 1;
            margin-top: 2px;
          }
        }

        .v-btn {
          margin-left: auto;
        }
      }

      &-subs {
        transition: .3s;
        height: 1px;

        &.active {
          height: auto;
        }
      }

      &-sub {
        font-size: 13px;

        input, label {
          cursor: pointer;
        }

        label {
          padding-left: 5px;
        }

        &:not(:last-child) {
          margin-bottom: 5px;
        }
      }

      &__input {
        .v-input__slot {
          box-shadow: none !important;
        }
      }
    }
  }
</style>
