<template>
<div style="margin:10px">
  <v-card
    class="mx-auto"
    dark
    elevation="2"
  >
    <v-card-title>
      <v-icon
        medium
        left
      >
        mdi-airplane
      </v-icon>
      <span class="text-h6 font-weight-light">UAV ID {{uav_id}}</span>
    </v-card-title>

    <v-card-text>
      <span class="text-h6 font-weight-light">
         <v-icon small left>
          mdi-wifi
        </v-icon>
        Ad-hoc IP : {{adhoc_ip}}
      </span> <br>
      <span class="text-h6 font-weight-light">
        <v-icon small left>
          mdi-shape
        </v-icon>
        Modal Name : {{modal_name}}
      </span>
      <br>
      <span class="text-h6 font-weight-light">
        <v-icon small left>
          {{ready_for_flight || "mdi-check-circle"}}
        </v-icon>
        Ready for flight
      </span>
    </v-card-text>
  </v-card>
  </div>
</template>

<script>
import "remixicon/fonts/remixicon.css";
export default {
  name: "UavCard",
  props: {
    uav_id: String,
    adhoc_ip: String,
    modal_name: String,
    ready_for_flight : Boolean
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uav-card {
  margin: 15px 20px 15px 20px;
  padding: 2px;
  border: 0.2px solid #ccc;
  border-radius: 6px;
  align-items: center;
  vertical-align: middle;
  align-self: center;
  align-content: center;
  display: flex;
  flex-direction: column;
  box-shadow: 10px 10px 5px grey;
}
.uav_id {
  background-color: black;
  color: white;
  width: 98%;
  padding: 8px;
  margin: 0px;
}
.inner-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: middle;
  align-self: center;
  align-content: center;
}
.adhoc-section {
  padding: 10px;
  margin: 5px;
  white-space: nowrap;
}
.modal-section {
  margin: 5px;
  white-space: nowrap;
}

.child {
  padding: 4px;
  display: inline-block;
}

@media (max-width: 800px) {
  .uav-card {
    flex-direction: column;
  }
  .adhoc-section {
    padding: 2px;
    margin: 2px;
  }
  .modal-section {
    padding: 2px;
    margin: 2px;
  }
}
</style>
