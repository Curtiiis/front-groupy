import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import Welcome from "../views/Welcome.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
Vue.use(Vuelidate);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
