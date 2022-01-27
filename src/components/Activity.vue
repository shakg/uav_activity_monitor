<template>
    <h3>{{ activity_details }}</h3>
</template>

<script>
export default {
  name: "Activity",
  props: {
    activity_details: String,
  },
};
</script>