import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";



const routes: Array<RouteRecordRaw> = [
  {
    path: "/microappchild1",
    name: "Index",
    component: () => import("../views/index.vue"),
  },
  {
    path: "/microappchild1/a",
    name: "A",
    component: () => import("../views/a.vue"),
  },
  {
    path: "/microappchild1/b",
    name: "B",
    component: () => import("../views/b.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "Index",
  },
];


export default createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});