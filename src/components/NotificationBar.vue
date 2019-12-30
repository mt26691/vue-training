<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  name: 'NotificationBar',
  components: {},
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  computed: {
    notificationTypeClass(): string {
      return `-text-${this.notification.type}`
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  methods: mapActions('notification', ['remove']),
  created() {}
})
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
