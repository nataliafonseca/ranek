import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import ProductView from "@/views/ProductView.vue";
import UserEditView from "@/views/user/UserEditView.vue";
import UserProductsView from "@/views/user/UserProductsView.vue";
import UserPurchasesView from "@/views/user/UserPurchasesView.vue";
import UserSalesView from "@/views/user/UserSalesView.vue";
import UserView from "@/views/user/UserView.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/product/:id",
    name: "product",
    props: true,
    component: ProductView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/user",
    component: UserView,
    children: [
      {
        path: "",
        name: "user",
        component: UserProductsView,
      },
      {
        path: "edit",
        name: "user-edit",
        component: UserEditView,
      },
      {
        path: "purchases",
        name: "user-purchases",
        component: UserPurchasesView,
      },
      {
        path: "sales",
        name: "user-sales",
        component: UserSalesView,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

export default router;
