<template>

    <div>

        <v-card
    class="mx-auto"
    dark
    max-width="400"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-view-list
      </v-icon>
      <span class="text-h6 font-weight-light">List of activities</span>
    </v-card-title>
         <v-card-text
        v-for="activity in activity_list"
        :key="activity.id"
        style="border-bottom:1px solid white; border-top:1px solid white; padding:5px"
      >
            <Activity :activity_details.sync="activity.details" />
         </v-card-text>
        </v-card>
        <br>

        <v-card
    class="mx-auto"
    dark
    max-width="400 "
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-comment-plus
      </v-icon>
      <span class="text-h6 font-weight-light">Add new activity</span>
    </v-card-title>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            label="Label"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            label="Importance"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="12"
        >
          <v-textarea
            v-model="email"
            :rules="emailRules"
            label="Comment"
            maxlength="120"
            required
            outlined
            clearable
          ></v-textarea>
        </v-col>
        <v-col
          cols="12"
          md="12"
        >
            <v-btn
      :loading="loading3"
      :disabled="loading3"
      color="light-blue"
      class="ma-2 white--text"
      @click="loader = 'loading3'"
    >
      Upload
      <v-icon
        right
        dark
      >
        mdi-cloud-upload
      </v-icon>
    </v-btn>

        </v-col>
      </v-row>
    </v-container>
  </v-form>
        </v-card>
    </div>
</template>

<script>
import Activity from "../components/Activity.vue";
import axios from "axios";

export default {
  name: "ActivityList",
  props: {
    uav_id: String,
  },
  data() {
    return {
      activity_list: null,
      database: null,
    };
  },
  components: {
    Activity,
  },
  methods: {
    update_uav_activity: function () {
      // updates local database variable.
      // this method must be used with write update to fs.
      // if you don't call above method. Changes will not be affected.

      let details_input = document.getElementById("add_activity").value;
      if (details_input.length < 3) {
        return;
      }

      this.database.forEach((uav_item) => {
        if (uav_item.uav_id === this.uav_id) {
          let new_activity_id =
            parseInt(
              uav_item.activity_list[uav_item.activity_list.length - 1].id
            ) + 1;
          new_activity_id = new_activity_id.toString();

          // create activity object to insert activity list.
          let new_activity_object = {
            id: new_activity_id,
            details: details_input,
          };

          // push new activity to activity_list
          uav_item.activity_list.push(new_activity_object);
        }
      });

      this.write_update_to_fs();
    },
    write_update_to_fs: function () {
      const header_config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .put(
          "https://api.jsonbin.io/b/61ed5ff01cdb114401230e4a",
          {
            database: this.database,
          },
          header_config
        )
        .then((response) => {
          console.log(response);
        });
    },
  },
  mounted: async function () {
    await axios
      .get("https://api.jsonbin.io/b/61ed5ff01cdb114401230e4a/latest")
      .then((response) => {
        console.log(response.data);
        this.database = response.data["database"];
        this.database.forEach((uav_item) => {
          if (uav_item.uav_id === this.uav_id) {
            this.activity_list = uav_item.activity_list;
          }
        });
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
