import api from "@/services/api";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    user: {
      id: "",
      name: "",
      email: "",
      password: "",
      postalCode: "",
      street: "",
      houseNumber: "",
      district: "",
      city: "",
      state: "",
    },
    userProducts: null,
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = Object.assign(state.user, payload);
    },
    UPDATE_USER_PRODUCTS(state, payload) {
      state.userProducts = payload;
    },
    ADD_USER_PRODUCT(state, payload) {
      state.userProducts.unshift(payload);
    },
  },
  actions: {
    async getUser(context, payload) {
      const response = await api.get(`user/${payload}`);
      context.commit("UPDATE_USER", response.data);
      context.commit("UPDATE_LOGIN", true);
    },
    async getUserProducts(context) {
      const response = await api.get(`product?userId=${context.state.user.id}`);
      context.commit("UPDATE_USER_PRODUCTS", response.data);
    },
    async registerUser(context, payload) {
      context.commit("UPDATE_USER", { id: payload.email });
      await api.post("user", payload);
    },
    async logoutUser(context) {
      context.commit("UPDATE_USER", {
        id: "",
        name: "",
        email: "",
        password: "",
        postalCode: "",
        street: "",
        houseNumber: "",
        district: "",
        city: "",
        state: "",
      });
      context.commit("UPDATE_LOGIN", false);
    },
  },
});
