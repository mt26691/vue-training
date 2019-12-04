<template>
  <h1>Showing event #{{ id }}</h1>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped></style>
