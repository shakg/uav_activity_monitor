<template>
  <div class="home">
    <br>
    <v-container fluid>
      <v-row>
        <v-col
         v-for="uav in uav_list" 
         :key="uav.uav_id" 
         @click="go_to_specific_uav_address(uav.uav_id)"
         cols="12"
         xs="12"
         sm="6"
         lg="3"
         class="uav-card-wrapper"
         >
          <UavCard 
            :uav_id = "uav.uav_id"
            :adhoc_ip = "uav.adhoc_ip"
            :modal_name = "uav.modal_name"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import UavCard from "../components/UavCard.vue";
import axios from 'axios';


export default {
  name: "Home",
  data() {
      return {
        uav_list : []
        }
    },
  components: {
    UavCard
  },
  methods: {
    go_to_specific_uav_address : function(uav_id){
      window.location.href = "/#/specific-uav/" + uav_id;
    }
  },
  mounted: function(){
    this.uav_list = axios.get('https://api.jsonbin.io/b/61ed5ff01cdb114401230e4a/latest').then(
      (response) => {
        this.uav_list = response.data['database'];
      }
    )
  }
};
</script>

<style scoped>
.uav-card-wrapper{
  margin:3px;
}
</style>