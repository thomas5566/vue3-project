<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="setFilter" />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilter" />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="setFilter" />
      <label for="career">career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'], // 宣告這個component有emits change-filter
  components: {},
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id; // id == id="frontend" or id="backend" or id="career"
      const isActive = event.target.checked; // check if checkbox is checked
      const updatedFilters = {
        ...this.filters, // copy filters內所有的值 到新的object
        [inputId]: isActive, // 然後由 inputId的值 override frontend backend career 三個變數中其中一個值, 看哪個被isActive (true or false)
      };
      this.filters = updatedFilters; // 更新filters內的值
      this.$emit('change-filter', updatedFilters); // 回傳值給parent component
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>