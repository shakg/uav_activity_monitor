<template>
  <v-container style="margin:0px; width:100%" class="ma-0" fluid v-if="database.length > 0" >
    <v-row class="width:100%">
      <v-card dark>
        <v-app-bar
          color="rgba(0, 0, 0, 0)"
        >
          <v-container fluid class="d-flex justify-center">
            <v-span @click="uav_info_snackbar = true">
              UAV ID {{uav_id}}
            </v-span>
            <v-spacer></v-spacer>
            <v-span @click="rff_snackbar= true">
              Ready for flight : 
              <v-icon small left>
                {{rff ? "mdi-check-circle" : "mdi-close-circle"}}
              </v-icon>                
            </v-span>
            
          </v-container>
        </v-app-bar>

        <v-card-text style="max-height:100vh; width:100%; overflow-y:scroll">

          <v-container fluid class="d-flex justify-space-between align-center">
          <v-span class="mt-2">
            <p>
              List of activities
            </p>
          </v-span>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="text--white"
            outlined
            small
            v-bind="attrs"
            v-on="on"
          >
            Add New
          </v-btn>
          <v-btn
          v-if="activity_list_changed"
            class="text--white"
            outlined
            small
          >
            Save Changes
          </v-btn>
        </template>
        <v-card>
          <v-toolbar
            dark
            color="black"
            class="text--white"
          >
            <v-btn
              icon
              dark
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Add new activity</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                dark
                text
                @click="save_new_activity"
              >
                Add
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-stepper
            v-model="e6"
            vertical
            dark
          >
          <v-stepper-step
            :complete="e6 > 1"
            step="1"
          >
            Who you are ? 
            <small>Name will appear on list of activities</small>
          </v-stepper-step>

          <v-stepper-content step="1" dark color="black" class="text--white">
      
            <v-text-field
            v-model="from"
            label="Name"
            required
          ></v-text-field>     
            <v-btn
              color="primary"
              @click="e6 = 2"
            >
              Continue
            </v-btn>
            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 2"
      step="2"
    >
      Comment your activity or issue
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-textarea
            v-model="activity_detail"
            label="Comment"
            maxlength="120"
            required
            outlined
            clearable
            class="ma-1"
          ></v-textarea>
      <v-btn
        color="primary"
        @click="e6 = 3"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 3"
      step="3"
    >
      Select category for your activity
      <small>For users to filter activities later</small>
    </v-stepper-step>

    <v-stepper-content step="3">
       <v-select
        :items="[{'text' : 'Issue', 'icon': 'mdi-bug'},
        {'text': 'Information', 'icon' : 'mdi-information'}]"
        label="Category" 
        v-model="category"
        >

    <template v-slot:item="{ item, attrs, on }">
      <v-list-item
        v-bind="attrs"
        v-on="on"
      >
      <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
      </v-list-item-icon>
        <v-list-item-title
          :id="attrs['aria-labelledby']"
          v-text="item.text"
        >
        </v-list-item-title>
      </v-list-item>
    </template>
      </v-select>
      <v-btn
        color="primary"
        @click="e6 = 4"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4" :complete="e6 > 4">
      Select sub-category for your activity
    </v-stepper-step>
    <v-stepper-content step="4">
   <v-select
      :items="[{'text': 'Software', 'icon' : 'mdi-code-greater-than'},
        {'text': 'Hardware', 'icon' : 'mdi-integrated-circuit-chip'},
        {'text' : 'Mechanical' , 'icon': 'mdi-pliers'}]"
        label="Category"
        v-model="sub_category"
        >

    <template v-slot:item="{ item, attrs, on }">
      <v-list-item
        v-bind="attrs"
        v-on="on"
      >
      <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
      </v-list-item-icon>
        <v-list-item-title
          :id="attrs['aria-labelledby']"
          v-text="item.text"
        >
        </v-list-item-title>
      </v-list-item>
    </template>
      </v-select>
      <v-btn
        color="primary"
        @click="e6 = 5"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 4"
      step="5"
    >
      Action step for your activity.
      <small>For others to see what to do to resolve this issue.</small>
    </v-stepper-step>

    <v-stepper-content step="5">
             <v-textarea
            v-model="action_steps"
            label="Comments for resolving this issue"
            maxlength="120"
            required
            outlined
            clearable
            class="ma-1"
          ></v-textarea>
           <v-btn
        color="white"
        outlined
        @click="e6 = 1"
      >
        Go to beginning
      </v-btn>
      <v-btn
        color="primary"
        @click="save_new_activity"
      >
        Save
      </v-btn>
      
    </v-stepper-content>
  </v-stepper>
        </v-card>
      </v-dialog>
          </v-container>
          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="activity in activity_list"
              :key="activity.id"
              color="white"
              small
            >
              <div style="">
                <div class="font-weight-normal">
                  <strong>{{ activity.from }}</strong> @{{ activity.date }} 
                  <v-btn class="ml-2 mb-2" x-small outlined :color="activity.solved ? 'green':'red'">
                    {{activity.solved ? "Solved" : "Not Solved"}}
                  </v-btn>
                </div>
                
        <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <div style="width:100%" v-bind="attrs" v-on="on">{{ activity.details }}</div>
        </template>
        <template v-slot:default="dialog">
          <v-card dark>
            <v-card-text dark>
              <v-list>
                <v-list-item>
                  <v-list-item-content class="text--white">
                    <strong>From </strong>{{activity.from}} <div style="padding:3px"></div> <v-divider></v-divider>  <div style="padding:3px"></div>
                    <strong>Date </strong>{{activity.date}} <div style="padding:3px"></div> <v-divider></v-divider>  <div style="padding:3px"></div>
                    <strong>Categories </strong> 

                      <v-container class="d-flex" fluid>
                        <v-chip small class="ma-1 text-small" color="white" label text-color="black">
                        <v-icon left x-small>
                          {{activity.category.icon || "mdi-wrench"}}
                        </v-icon>
                        <div class="font-size:9px">
                          {{ activity.category.detail || "Needs maintanance"}}
                        </div>
                      </v-chip>
                      <v-chip small class="ma-1 text-small" color="white" label text-color="black">
                        <v-icon left x-small>
                          {{activity.sub_category.icon || "mdi-wrench"}}
                        </v-icon>
                        <div class="font-size:9px">
                          {{ activity.sub_category.detail || "Needs maintanance"}}
                        </div>
                      </v-chip>
                      </v-container>

                    <div style="padding:3px"></div> <v-divider></v-divider>  <div style="padding:3px"></div>
                    <strong>Details </strong>{{activity.details}} <div style="padding:3px"></div> <v-divider></v-divider>  <div style="padding:3px"></div>
                   
                    <strong> <b>Action steps </b>  </strong> {{activity.action_steps}}
                  </v-list-item-content>
                </v-list-item>
            <v-list-item>
              <v-list-item-title>{{ activity.solved ? "Mark as not solved!" : "Mark as solved"}}</v-list-item-title>
              <v-list-item-action>
                <v-switch
                  v-model="activity.solved"
                  color="blue"
                ></v-switch>
              </v-list-item-action>
              
            </v-list-item>
          </v-list>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                small
                outlined
                id="close_detailed_view_button"
                style="display:hidden"
                @click="dialog.value = false"
              >Close</v-btn>
              <v-btn
                text
                small
                outlined
                @click="activity_status_close_function"
              >Save</v-btn>

            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
                     <v-chip small class="ma-1 text-small" color="white" label text-color="black">
                      <v-icon left x-small>
                        {{activity.category.icon || "mdi-wrench"}}
                      </v-icon>
                      <div class="font-size:9px">
                        {{ activity.category.detail || "Needs maintanance"}}
                      </div>
                    </v-chip>
                    <v-chip small class="ma-1 text-small" color="white" label text-color="black">
                      <v-icon left x-small>
                        {{activity.sub_category.icon || "mdi-wrench"}}
                      </v-icon>
                      <div class="font-size:9px">
                        {{ activity.sub_category.detail || "Needs maintanance"}}
                      </div>
                    </v-chip>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>

     <v-snackbar
      v-model="uav_info_snackbar"
      :vertical="false"
    >
      <v-span class="text--white">UAV ID {{ uav_id }}</v-span> <br>
      <v-span class="text--white">Ad-hoc IP  : {{ adhoc_ip }}</v-span><br>
      <v-span class="text--white">Modal Name : {{ modal_name }}</v-span>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="indigo"
          text
          v-bind="attrs"
          @click="uav_info_snackbar = false"
        >
          Close
        </v-btn>
      </template>

    </v-snackbar>

    <v-snackbar
            v-model="rff_snackbar"
            :vertical="false"
          >
          <v-list class="">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="mb-1 pa-1">
                  Ready for flight : 
                  <v-icon left small>
                    {{rff ? "mdi-check-circle" : "mdi-close-circle"}}
                  </v-icon>  
                </v-list-item-title>
               
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>

          <v-list v-if="activity_list.length > 1">
            <v-list-item>
              <v-list-item-content>
                <v-span>
                  Open Issues : {{ num_open_issues || "Can't parse number of open issues"}}
                </v-span>
                <v-span>
                  Close Issues : {{ num_closed_issues || "Can't parse number of closed issues"}}
                </v-span>
                </v-list-item-content>  
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-switch
                  v-model="rff"
                  color="blue"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-title>Ready for flight</v-list-item-title>
            </v-list-item>
          </v-list>
  
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="rff_snackbar_close_function"
        >
          close
        </v-btn>
    </v-snackbar>

   
  </v-container>

  
</template>
<script>
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
      uav_info_snackbar : false,
      rff_snackbar : false,
      adhoc_ip : "",
      modal_name : "",
      dialog: false,
      activity_snackbar: false,
      widgets: false,
      e6: 1,
      action_steps : "",
      from : "",
      sub_category : null,
      category : null,
      activity_detail : "",
      rff : false,
      activity_list_changed :false,
      };
  },
  methods: {
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
    save_new_activity: function(){
      this.dialog = false;
      this.database.forEach((uav_item) => {
        if (uav_item.uav_id === this.uav_id) {
          let new_activity_id =
            parseInt(
              uav_item.activity_list[uav_item.activity_list.length - 1].id
            ) + 1;
          new_activity_id = new_activity_id.toString();
          let today = new Date();
          let dd = String(today.getDate()).padStart(2, '0');
          let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          let yyyy = today.getFullYear();

          let category_icon_struct = {
            "Issue" : "mdi-bug",
            "Information" : "mdi-information",
            "Software" : "mdi-code-greater-than",
            "Hardware" : "mdi-integrated-circuit-chip",
            "Mechanical" : "mdi-pliers"
          }
          
          let constructed_category = {
            "detail" : this.category,
            "icon" : category_icon_struct[this.category]
          }
          let constructed_sub_category = {
            "detail" : this.sub_category,
            "icon" : category_icon_struct[this.sub_category]
          }
          // create activity object to insert activity list.
          let new_activity_object = {
            id: new_activity_id,
            details: this.activity_detail,
            solved : false,
            from: this.from,
            date : dd + '.' + mm + '.' + yyyy,
            category : constructed_category,
            sub_category : constructed_sub_category,
            action_steps: this.action_steps
          };

          // push new activity to activity_list
          uav_item.activity_list.push(new_activity_object);

          this.activity_detail = "";
          this.from = "";
          this.category = "";
          this.sub_category = "";
          this.action_steps = "";

          this.write_update_to_fs();
        }
      });
    },
    rff_snackbar_close_function(){
      this.rff_snackbar = false
      this.database.forEach((uav_item)=>{
        if(uav_item.uav_id === this.uav_id){
          uav_item.ready_for_flight = this.rff
        }
      });
      this.write_update_to_fs();
    },
    activity_status_close_function(){
      document.getElementById("close_detailed_view_button").click();
      this.write_update_to_fs();
    },
    compute_color: function(activity){
      if(activity.solved){
        return "green";
      }else{
        switch (activity.category.detail) {
          case "Issue":
            return "red";
          default:
            return "blue";
        }
      }
      
    },
  },
  mounted: async function () {
    await axios
      .get("https://api.jsonbin.io/b/61ed5ff01cdb114401230e4a/latest")
      .then((response) => {
        this.database = response.data["database"];
        this.database.forEach((uav_item) => {
          if (uav_item.uav_id === this.uav_id) {
            this.activity_list = uav_item.activity_list;
            this.adhoc_ip = uav_item.adhoc_ip;
            this.modal_name = uav_item.modal_name;
            this.rff = uav_item.ready_for_flight;
          }
        });
      });
  },
  computed: {
    num_closed_issues: function(){
      let retVal= 0;
      this.activity_list.forEach((activity_item) => {
          // TODO : make activity_item.solved variable bool when storing in database. 
          // For now it is only in mockup jsonbin.io
          if(activity_item.solved){ retVal++ }
      })
      return retVal;
    },
    num_open_issues: function(){
      let retVal= 0;
      this.activity_list.forEach((activity_item) => {
          if(!activity_item.solved){ retVal++ }
      })
      return retVal;
    },
  },
};
</script>
