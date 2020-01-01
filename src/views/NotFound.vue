<template>
  <div>
    <h1>404!</h1>
    <h3>The {{ resource }} you are looking for is not found</h3>
    <router-link :to="{ name: 'event-list' }"
      >Back to the home page!</router-link
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import nProgress from 'nprogress'
import store from '@/store/index'

export default Vue.extend({
  props: {
    resource: {
      type: String,
      default: ''
    }
  }
})
</script>
