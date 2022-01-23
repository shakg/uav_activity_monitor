<template>
  <div class="activity_list">
      <h3 class="heading">List of activities </h3>
      <div class="activities" v-for="activity in activity_list" :key="activity.id">
            <Activity :activity_details.sync="activity.details" /> 
      </div>
      
      <div class="add-activity">
        <h4>Add new activity</h4>
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
            'database' : this.database
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
    margin: 20px;
    padding: 0px;
    border:1px solid #ccc;
    border-radius: 6px;
    display:flex;
    flex-direction: column;
    box-shadow: 10px 10px 5px grey;

}
.activities{
    background-color: lightgray;
    font-weight: 400;
    font-size:12px;
}
.heading{
    background-color: black;
    color:white;
    width: 97%;
    padding:8px;
    margin:0px;
    margin-bottom: 3px;
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
    width: 80%;
}
.add-button{
    padding:8px 12px 8px 12px;
    border-radius: 6px;
    border:none;
    background-color : black;
    color : white;
    
}
.add-button:hover{
    cursor:pointer;
    background-color: slategray;
}
</style>
