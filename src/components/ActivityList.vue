<template>
  <div class="activity_list">
      <h1 class="heading">List of activities </h1>
      <div v-for="activity in activity_list" :key="activity.id">
            <Activity :activity_details.sync="activity.details" />
      </div>
      
      <div class="add-activity">
        <h3>Add new activity</h3>
        <input type="text" name="add_activity" class="add-detail-input" id="add_activity" />
        <button v-on:click="update_uav_activity" class="add-button">Add</button>
      </div>    

  </div>
</template>


<script>
import Activity from '../components/Activity.vue';
import axios from 'axios';

export default {
  name: "ActivityList",
  props: {
    uav_id : String
  },
  data(){
      return {
          activity_list : null,
          database : null
      }
  },
  components:{
      Activity
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
        const header_config = {
            headers : {
                "Content-Type" : "application/json",
            }
        }
        axios.put('https://api.jsonbin.io/b/61ed5ff01cdb114401230e4a', {
            json_data : {'database' : this.database}
        }, header_config).then(
            (response) => {
                console.log(response);
            }
        );
    }
  },
  mounted : async function(){
      await axios.get('https://api.jsonbin.io/b/61ed5ff01cdb114401230e4a/latest').then(
          (response)=>{
              console.log(response.data)
              this.database = response.data['database'];
              this.database.forEach(uav_item => {
                  if(uav_item.uav_id === this.uav_id){
                      this.activity_list = uav_item.activity_list;
                  }
              })
          }
      );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.activity_list{
    padding: 5px;
    margin: 20px;
    border:1px solid #ccc;
    border-radius: 6px;
}
.heading{
    font-style: oblique;
    padding:5px;
    margin-right:0px;
    margin-left:0px;
    border-bottom: 3px solid #ccc;
}
.add-activity{
    padding:5px;
    margin-right:0px;
    margin-left:0px;
    margin-bottom: 5px;
    border-top: 3px solid #ccc;
    
}
.add-detail-input{
    padding:5px;
    font-size: 16px;
    margin:5px;
    border-radius: 6px;
}
.add-button{
    padding:5px 10px 5px 10px;
    border-radius: 6px;
}
</style>
