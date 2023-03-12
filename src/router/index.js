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
    meta: {
      title: "Bienvenue",
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      title: "Inscription",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Connexion",
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "Accueil",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `Groupy | ${to.meta.title}`;
  next();
});

export default router;
