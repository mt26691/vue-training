<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService'
import Vue from 'vue'

export default Vue.extend({
  name: 'EventList',
  components: {
    EventCard
  },
  data() {
    return {
      events: [] as Array<any>
    }
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data // <--- set the events data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  }
})
</script>

<style scoped></style>
