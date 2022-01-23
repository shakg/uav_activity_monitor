<template>
  <div class="home">
    <Hero headline="UAV ACTIVITY MONITOR"/>
    <br>
    <div v-for="uav in uav_list" :key="uav.uav_id" v-on:click="go_to_specific_uav_address(uav.uav_id)">
      <UavCard 
        :uav_id = "uav.uav_id"
        :adhoc_ip = "uav.adhoc_ip"
        :modal_name = "uav.modal_name"
      />

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '../components/Hero.vue';
import UavCard from '../components/UavCard.vue';
import axios from 'axios';

export default {
  name: "Home",
  data() {
    return {
      uav_list : []
      }
  },
  components: {
    Hero,
    UavCard
  },
  methods: {
    go_to_specific_uav_address : function(uav_id){
      window.location.href = "/#/specific-uav/" + uav_id;
    }
  },
  mounted: function(){
    this.uav_list = axios.get('https://api.jsonbin.io/b/61ed5ff01cdb114401230e4a').then(
      (response) => {
        this.uav_list = response.data['database'];
      }
    )
  }
};
</script>
