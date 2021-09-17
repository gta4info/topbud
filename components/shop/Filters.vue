<template>
  <div class="filters" :class="{inline: inline}">
    <div class="filter__group">
      <div class="filter__title md">Search by name</div>
      <v-text-field
        v-model="searchQuery"
        solo
        dense
        hide-details
        clearable
        label="Search by name"
        class="filter__name"
      />
    </div>
    <div class="filter__group">
      <div class="filter__title">Price range <span class="sm">(from - to)</span></div>
      <div class="filter__slider">
        <div class="filter__slider-inputs">
          <div class="mr-3">
            <v-text-field v-model="minData" placeholder="From" solo dense class="filter__name" hide-details type="number" @keypress.enter="updatePrices"/>
          </div>
          <div>
            <v-text-field v-model="maxData" placeholder="To" solo dense class="filter__name" hide-details type="number" @keypress.enter="updatePrices"/>
          </div>
          <v-btn @click="updatePrices" color="#7FAD39" height="30" width="30" max-width="30" depressed>
            <v-icon color="#fff" small>mdi-check</v-icon>
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
    inline: {
      type: Boolean,
      default: false
    },
    categories: {
      type: Array,
      required: false
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    range: {
      type: Array,
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
    }
  },
  watch: {
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
      rangeData: this.range,
      categoriesData: this.categories ?? [],
      searchQuery: this.search,
      minData: this.min,
      maxData: this.max,
    }
  }
}
</script>

<style lang="scss" scoped>
  .filters {
    display: flex;
    flex-direction: column;
    border: 1px solid #E9E9E9;
    border-radius: 8px;
    padding: 20px 12px;
    margin-top: 12px;

    @media(max-width: 768px) {
      margin-top: 0;
    }

    &.inline {
      flex-direction: row;

      @media(max-width: 768px) {
        flex-direction: column;
      }

      .filter__group {
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 0;
        margin-right: 30px;

        .v-btn {
          margin-top: auto !important;
          height: 38px !important;
          margin-left: 20px;

          @media(max-width: 768px) {
            margin-left: 0;
            width: 100%;
            margin-top: 10px !important;
            margin-bottom: 15px;
            margin-right: 0;
          }
        }
      }

      .filter__slider-inputs {

        @media(max-width: 768px) {
          width: 100%;
        }

        span {
          display: none !important;
        }
      }

      .filter__title {
        width: 100%;

        &.md {

          @media(max-width: 768px) {
            display: none;
          }
        }
      }

      .filter__name {
        width: 100px;

        @media(max-width: 768px) {
          width: auto;
        }
      }
    }
  }

  .filter {
    &__group {
      display: flex;
      flex-direction: column;

      &:not(:last-child) {
        margin-bottom: 30px;

        @media(max-width: 768px) {
          margin-bottom: 15px;
          margin-right: 0;
        }
      }
    }

    &__title {
      font-size: 18px;
      font-weight: 900;
      margin-bottom: 10px;
      display: flex;
      align-items: center;

      .sm {
        display: none;

        @media(max-width: 768px) {
          display: block;
          margin-left: 4px;
        }
      }

      &.md {
        @media(max-width: 768px) {
          display: none;
        }
      }
    }

    &__slider {
      display: flex;
      flex-direction: column;

      @media(max-width: 768px) {
        .md {
          display: none !important;
        }
      }

      &-inputs {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          font-weight: 900;
        }

        .v-btn {
          min-width: 30px !important;
          height: 30px !important;
          max-height: 30px !important;
          max-width: 30px !important;
          margin-left: 12px;
          border-radius: 50%;
          flex-shrink: 0;
          padding: 0 !important;
          margin-top: auto !important;
          margin-bottom: auto !important;
        }

        @media(min-width: 769px) {
          .sm {
            display: none;
          }
        }

        @media(max-width: 768px) {
          > div {
            margin-right: 8px;
          }

          .v-btn {
            margin-left: 4px;
          }
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

        @media(max-width: 768px) {
          flex-wrap: wrap;
          display: flex;
        }

        &.active {
          height: auto;
        }
      }

      &-sub {
        font-size: 13px;

        @media(max-width: 768px) {
          margin-right: 12px;
        }

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

      &__name {
        .v-input__slot {
          box-shadow: none !important;
        }
      }
    }
  }
</style>
