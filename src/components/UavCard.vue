<template>
  <div class="uav-card">
      <h3 class="uav_id"> <b>UAV ID : {{ uav_id }}</b> </h3>
      <div class="inner-section">
          <div class="adhoc-section">
          <i class="ri-links-line child"></i>
          <p class="child">Ad-hoc IP : {{ adhoc_ip }}</p>
            </div>
            <div class="modal-section">
                <i class="ri-plane-line child"></i>
                <p class="child">Modal : {{ modal_name }}</p>
            </div>
      </div>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css';
export default {
  name: "UavCard",
  props: {
    uav_id : String,
    adhoc_ip : String,
    modal_name : String
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uav-card{
    margin: 15px 20px 15px 20px;
    padding : 2px;
    border:.2px solid #ccc;
    border-radius: 6px;
    align-items: center;
    vertical-align: middle;
    align-self: center;
    align-content: center;
    display:flex;
    flex-direction: column;
    box-shadow: 10px 10px 5px grey;

}
.uav_id{
    background-color: black;
    color:white;
    width: 98%;
    padding:8px;
    margin:0px;
}
.inner-section{
    display:flex;
    flex-direction: row;
     align-items: center;
    vertical-align: middle;
    align-self: center;
    align-content: center;
}
.adhoc-section {
    padding:10px;
    margin: 5px;
    white-space: nowrap;
}
.modal-section {
    margin: 5px;
    white-space: nowrap;
}

.child {
    padding:4px;
    display: inline-block;
}

@media (max-width:800px) {    
    .uav-card{
        flex-direction: column;
    }
    .adhoc-section{
        padding: 2px;
        margin: 2px;
    }
    .modal-section{
        padding: 2px;
        margin: 2px;
    }
}
</style>
