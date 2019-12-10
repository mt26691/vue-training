<template>
  <div>
    <h1>Create an event, {{ username }}</h1>
    <p>This event is created by {{username}}</p>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'

export default Vue.extend({
  name: 'EventCreate',
  components: {},
  data() {
    return {
      events: [] as Array<any>
    }
  },
  computed: {
    username() {
      return this.$store.state.user.name
    }
  },
  created() {}
})
</script>

<style scoped></style>
