<template>
  <div class="filters">
    <div class="filter__group">
      <div class="filter__title">Price range</div>
      <div class="filter__slider">
        <v-range-slider
          v-model="rangeData"
          :min="min"
          :max="max"
          hide-details
        />
        <div class="filter__slider-inputs">
          <span>${{rangeData[0]}}</span>
          <span>${{rangeData[1]}}</span>
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
          :key="category.id"
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
  },
  watch: {
    rangeData() {
      // setTimeout(() => {
        this.$root.$emit('change-filter-range', this.rangeData)
      // }, 500)
    },
    categoriesData: {
      handler() {
        this.$root.$emit('change-filter-categories', this.categoriesData)
      },
      deep: true
    }
  },
  data() {
    return {
      rangeData: this.range,
      categoriesData: this.categories ?? []
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
    margin-top: 24px;
  }

  .filter {
    &__group {
      display: flex;
      flex-direction: column;

      &:not(:last-child) {
        margin-bottom: 30px;
      }
    }

    &__title {
      font-size: 18px;
      font-weight: 900;
      margin-bottom: 10px;
    }

    &__slider {
      display: flex;
      flex-direction: column;

      &-inputs {
        display: flex;
        justify-content: space-between;

        span {
          font-weight: 900;
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
    }
  }
</style>
