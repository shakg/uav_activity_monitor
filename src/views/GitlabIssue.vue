<template>
  <div class="gitlab-issue">
    <br>
    <v-container fluid>
      <v-row>
        Hey this is a issue id -> {{issue_id}}
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: "GitlabIssue",
  props: {
    issue_id : String
  },
  data() {
   
    },
  components: {
  },
  methods: {
  
  },
  mounted: function(){
    
  }
};
</script>
