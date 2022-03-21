import "@/registerServiceWorker";

import App from "@/App.vue";
import LoadingDots from "@/components/LoadingDots.vue";
import router from "@/router";
import store from "@/store";
import Vue from "vue";

Vue.config.productionTip = false;

Vue.component("LoadingDots", LoadingDots);
Vue.filter("priceFormat", (value) => {
  value = Number(value);
  if (!isNaN(value)) {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  } else {
    return "";
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
