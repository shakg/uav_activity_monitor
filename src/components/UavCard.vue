<template>
  <div class="uav-card">
      <p class="uav_id"> <b>UAV_ID_{{ uav_id }}</b> </p>
      <div class="adhoc-section">
          <i class="ri-links-line child"></i>
          <p class="child">Ad-hoc IP : {{ adhoc_ip }}</p>
      </div>
      <div class="modal-section">
          <i class="ri-plane-line child"></i>
          <p class="child">Modal : {{ modal_name }}</p>
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
    margin: 5px 20px 5px 20px;
    padding : 10px;
    border:.2px solid #ccc;
    border-radius: 6px;
    align-content: center;
    align-items: center;
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
}
.modal-section {
    margin: 5px;
    white-space: nowrap;
    border: .2px solid #ccc;
    border-radius: 8px;
}
.adhoc-section {
    margin: 5px;
    white-space: nowrap;
    border: .2px solid #ccc;
    border-radius: 8px;
}
.child {
    font-style:oblique;
    padding:4px;
    display: inline-block;
}
</style>
