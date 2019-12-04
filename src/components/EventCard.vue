<template>
  <router-link :to="{ name: 'event-show', params: { id: '1' } }">
    <div class="event-card -shadow">
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h4 class="title">{{ event.title }}</h4>
      <span>{{ event.attendees.length }} attending</span>
    </div>
  </router-link>
</template>

<script lang="ts">
export default {
  data() {
    return {
      event: {
        id: 1,
        title: 'Beach Cleanup',
        date: 'Tues Aug 19, 2018',
        time: '6:00',
        attendees: [
          { id: 'abc123', name: 'tyty' },
          { id: 'abc124', name: 'zyzy' },
          { id: 'abc125', name: 'gygy' }
        ]
      }
    }
  }
}
</script>

<style scoped>
h4 {
  color: green;
}
</style>
