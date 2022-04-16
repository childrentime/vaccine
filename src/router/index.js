import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Admin from "../views/admin/Admin.vue";
import Register from "../views/Register.vue";
import User from "../views/admin/user/User.vue";
import VAdmin from "../views/vAdmin/Admin.vue";
import Appointment from "../views/vAdmin/appointment/appointment.vue";
import UAdmin from "../views/user/Admin.vue";
import Upre from "../views/user/pre/Pre.vue";
import Ume from "../views/user/me/Me.vue";
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
        name: "疫苗管理",
      },
    ],
  },
  {
    path: "/uadmin",
    name: "UAdmin",
    component: UAdmin,
    children: [
      {
        path: "pre",
        component: Upre,
        name: "预约管理",
      },
      {
        path: "me",
        component: Ume,
        name: "我的预约",
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
