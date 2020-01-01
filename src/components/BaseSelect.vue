<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select :value="value" @input="updateValue" v-bind="$attrs">
      <option v-for="option in options" :key="option" :selected="option === value">{{ option }}</option>
    </select>
  </div>
</template>

// if we have complex senario, please use vue mutil select
<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
// @ts-ignore
import DatePicker from 'vuejs-datepicker'

export default Vue.extend({
  name: 'BaseSelect',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    value: [String, Number]
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
})
</script>

<style scoped></style>
