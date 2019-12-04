<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard></EventCard>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'

export default {
  components: {
    EventCard
  }
}
</script>

<style scoped></style>
