import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SpecificUav from "../views/SpecificUav";

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
    props: true
  },
];

const router = new VueRouter({
  routes,
});

export default router;
