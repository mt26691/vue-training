<template>
  <div>
    <h1>Event for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />

    <router-link
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      rel="prev"
      v-if="page != 1"
      >Prev Page</router-link
    >
    |

    <router-link
      v-if="nextPageAvailable"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      >Next Page</router-link
    >
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'EventList',
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch('event/fetchEvents', { perPage: 2, page: this.page })
  },
  computed: {
    ...mapState(['event', 'user']),
    page(): number {
      return parseInt(
        this.$route.query.page ? this.$route.query.page.toString() : '1'
      )
    },
    nextPageAvailable() {
      return this.event.totalEvent > (this.page as number) * 2
    }
  }
})
</script>

<style scoped></style>
