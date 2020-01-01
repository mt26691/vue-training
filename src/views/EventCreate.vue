<template>
  <div>
    <h1>Create an event, {{ user.name }}</h1>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Add an event title"
        class="field"
      ></BaseInput>

      <BaseInput
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add a description"
        class="field"
      ></BaseInput>

      <h3>Where is your event?</h3>

      <BaseInput
        label="Description"
        v-model="event.location"
        type="text"
        placeholder="Location"
        class="field"
      ></BaseInput>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <DatePicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
// @ts-ignore
import DatePicker from 'vuejs-datepicker'

export default Vue.extend({
  name: 'EventCreate',
  components: { DatePicker },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(`${i}:00`)
    }
    return {
      times,
      event: (this as any).createFreshEventObject()
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
  methods: {
    createEvent() {
      this.$store.dispatch('event/createEvent', this.$data.event).then(() => {
        // redirect
        this.$router.push({
          name: 'event-show',
          params: { id: this.$data.event.id }
        })
        this.$data.event = (this as any).createFreshEventObject()
      })
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [] as Array<any>
      }
    }
  },
  created() {}
})
</script>

<style scoped></style>
