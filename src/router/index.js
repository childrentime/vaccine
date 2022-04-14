import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Admin from "../views/admin/Admin.vue";
import Register from "../views/Register.vue";
import User from "../views/admin/user/User.vue";
import VAdmin from "../views/vAdmin/Admin.vue";
import Appointment from "../views/vAdmin/appointment/appointment.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [
      {
        path: "user",
        component: User,
        name: "用户管理",
      },
    ],
  },
  {
    path: "/vadmin",
    name: "VAdmin",
    component: VAdmin,
    children: [
      {
        path: "appointment",
        component: Appointment,
        name: "预约管理",
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
