<template>
  <div class="activity">
      <h3>{{ activity_details }}</h3>
  </div>
</template>


<script>
export default {
  name: "Activity",
  props: {
    activity_details: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.activity{
  border-bottom: 1px solid white;
}
</style>
