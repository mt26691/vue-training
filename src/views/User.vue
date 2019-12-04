<template>
  <div class="user">
    <h1>This is {{ username }}'s page</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'User',
  props: {
    username: {
      type: String,
      default: ''
    }
  }
})
</script>

<style></style>
