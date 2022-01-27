<template>
  <div class="specific_uav">
    <UavCard :uav_id="uav_id" :adhoc_ip="adhoc_ip" :modal_name="modal_name" />
    <br />
    <ActivityList :uav_id="uav_id" />
    <br />
  </div>
</template>

<script>
// @ is an alias to /src
import UavCard from "../components/UavCard.vue";
import ActivityList from "../components/ActivityList.vue";
import axios from "axios";

export default {
  name: "SpecificUav",
  data() {
    return {
      database: null,
      adhoc_ip: "",
      modal_name: "",
    };
  },
  props: {
    uav_id: String,
  },
  components: {
    UavCard,
    ActivityList,
  },
  methods: {
    get_activity_list: async function () {
      // make get request with props.
      // props need to come from url.
      // then fill activity list with proper response data.

      // ! for now it is reading from mock_database.json file.
      // this will be changed to read from real api/database to sync
      // across all devices.

      // initialize database.
      await axios
        .get("https://api.jsonbin.io/b/61ed5ff01cdb114401230e4a/latest")
        .then((response) => {
          console.log(response);
          this.database = response.data["database"];
        });

      // search through database.
      // ! this method will not be same when dealing with real database.
      this.database.forEach((uav_item) => {
        if (uav_item.uav_id === this.uav_id) {
          this.adhoc_ip = uav_item.adhoc_ip;
          this.modal_name = uav_item.modal_name;
        }
      });
    },
  },
  watch: {
    // this watch added because when we get props from url,
    // dom is not created from ground up. So except from uav_id which is taken from url
    // doesn't change on the dom. By adding watch to uav_id func.
    // whenever we pass new uav_id, get_activity_list method runs thus will update dom.
    uav_id: function () {
      this.get_activity_list();
    },
  },
  mounted: async function () {
    await this.get_activity_list();
  },
};
</script>

<style scoped>
.specific_uav{
  margin-top:20px;
}
</style>