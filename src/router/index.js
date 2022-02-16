import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SpecificUav from "../views/SpecificUav";
import GitlabIssue from "../views/GitlabIssue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "All UAVS",
    component: Home,
  },
  {
    path: "/specific-uav/:uav_id",
    name: "Specific UAV",
    component: SpecificUav,
    props: true,
  },
  {
    path: "/custom-issue-tracker/:id",
    name: "gitlab custom issue tracker",
    component: GitlabIssue,
    props: true,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
