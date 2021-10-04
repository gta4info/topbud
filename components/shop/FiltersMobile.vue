<template>
  <div class="filters">

    <button @click="dialog = true" class="filters__btn" v-ripple>
      <img src="@/static/images/filter-icon.svg" alt="Filter">
      <span>Filter</span>
    </button>

    <div class="filterMenu" :class="{active: dialog}">
      <div class="filterMenu__header">
        <div>
          <img src="@/static/images/filter-icon.svg" alt="Filter">
          <span>Filter</span>
        </div>
        <v-btn icon @click="dialog = false" class="ml-4">
          <v-icon color="#000000" size="30">mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="filterMenu__content">
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
            @keypress.enter="dialog = false"
          />
          <v-btn
            class="filter__slider-inputs--apply"
            @click="dialog = false"
            color="#7FAD39"
            depressed
            v-show="queryChanged"
          >
            Apply filters
          </v-btn>
        </div>
        <div class="filter__group">
          <div class="filter__title">Price range</div>
          <div class="filter__slider">
            <div class="filter__slider-inputs">
              <div>
                <div>
                  <v-text-field v-model="minData" prefix="$" placeholder="From" solo dense class="filter__input" hide-details type="number" @keypress.enter="updatePrices"/>
                </div>
                <div class="filter__slider-inputs--divider"></div>
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
      this.dialog = false;
    }
  },
  watch: {
    dialog() {
      if(this.queryChanged) {
        this.queryChanged = false;
      }
    },
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
      this.queryChanged = true;
      this.$root.$emit('change-filter-search-query', this.searchQuery)
    }
  },
  data() {
    return {
      categoriesData: this.categories ?? [],
      searchQuery: this.search,
      minData: this.min,
      maxData: this.max,
      showUpdatePriceBtn: false,
      dialog: false,
      queryChanged: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .filters {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: auto;

    &__btn {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #009BDB;
      border-radius: 5px;

      span {
        margin-left: 11px;
        font-size: 16px;
        color: #009bdb;
      }
    }
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

        > div:not(.divider) {
          justify-content: space-between;
          align-items: center;
          display: flex;
        }

        &--divider {
          background: #C4C4C4;
          width: 29px;
          height: 2px;
          margin: 0 20px;
          flex-shrink: 0;
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


  .filterMenu {
    position: fixed;
    //top: 36px;
    top: 0;
    bottom: 0;
    right: -100vw;
    background: #fff;
    opacity: 0;
    width: 100%;
    padding: 0 20px 30px;
    transition: .3s;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 2;

    &.active {
      opacity: 1;
      right: 0;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 48px;
      border-bottom: 1px solid #D2D2D2;
      margin: 0 -35px 20px;
      position: relative;

      div {
        display: flex;
        align-items: center;

        span {
          margin-left: 11px;
          color: #009BDB;
          font-size: 18px;
          line-height: 1;
        }
      }

      .v-btn {
        position: absolute;
        right: 25px;
      }
    }
  }
</style>
