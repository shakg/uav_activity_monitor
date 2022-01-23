<template>
  <div class="hero">
      <h1>TİTRA</h1>
      <h3>{{ headline }}</h3>
  </div>
</template>


<script>
export default {
  name: "Hero",
  props: {
    headline: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
