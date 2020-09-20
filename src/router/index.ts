import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import OperationsPage from "@/pages/OperationsPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Operations',
    component: OperationsPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

//router.beforeEach((to, from, next) => {
//
//});

export default router;
