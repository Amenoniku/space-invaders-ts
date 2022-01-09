import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/game",
    name: "Game",
    component: () => import("./Game.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("./Chat.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
