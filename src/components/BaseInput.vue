<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input type="text" :value="value" @input="updateValue" v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
// @ts-ignore
import DatePicker from 'vuejs-datepicker'

export default Vue.extend({
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
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
