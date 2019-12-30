<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import NotificationBar from './NotificationBar.vue'

export default Vue.extend({
  name: 'NotificationContainer',
  components: { NotificationBar },
  computed: mapState('notification', ['notifications']),
  methods: {},
  created() {}
})
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
}
</style>
