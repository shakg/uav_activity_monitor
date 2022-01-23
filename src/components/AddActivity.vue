<template>
  
</template>


<script>
import axios from 'axios';

export default {
  name: "AddActivity",
  props:{
        uav_id : String
  },
  data (){
      return {
          database: null,
      }
  },
  methods: {
      update_uav_activity : function(){
        // updates local database variable. 
        // this method must be used with write update to fs. 
        // if you don't call above method. Changes will not be affected.

        let details_input = document.getElementById("add_activity").value;
        if(details_input.length < 3 ){
            return;
        }

        this.database.forEach( uav_item => {
            if(uav_item.uav_id === this.uav_id ){
                let new_activity_id = parseInt(uav_item.activity_list[uav_item.activity_list.length - 1].id) + 1;
                new_activity_id = new_activity_id.toString();

                // create activity object to insert activity list.
                let new_activity_object = {
                    "id" : new_activity_id,
                    "details" : details_input
                }

                // push new activity to activity_list
                uav_item.activity_list.push(new_activity_object);
            }
        });

        this.write_update_to_fs();
    },
    write_update_to_fs: function(){
        axios.post('http://localhost:5010/write_json', {
            json_data : {'database' : this.database}
        }).then(
            (response) => {
                console.log(response);
            }
        );
    }
  },
  mounted : async function(){
      await axios.get('http://localhost:5010/get_json').then(
          (response)=>{
              console.log(response.data)
              this.database = response.data['database'];
          }
      );
  }
};
</script>

<style scoped>

</style>
