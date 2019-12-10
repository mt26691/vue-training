<template>
  <div>
    <h1>Create an event, {{ user.name }}</h1>
    <p>This event is created by {{ user.id }}</p>
    <p>{{ getEventById(1) }}</p>
    <p>There are {{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'EventCreate',
  components: {},
  data() {
    return {
      events: [] as Array<any>
    }
  },
  computed: {
    ...mapState(['user', 'categories']),
    ...mapGetters(['getEventById']),
    catLength() {
      return this.$store.getters.catLength
    },
    getEvent() {
      return this.$store.getters.getEventById
    }
  },
  created() {}
})
</script>

<style scoped></style>
