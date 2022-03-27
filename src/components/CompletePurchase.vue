<template>
  <section>
    <h2>Endereço de Envio</h2>
    <user-form>
      <button class="btn" @click.prevent="completePurchase">
        Finalizar Compra
      </button>
    </user-form>
  </section>
</template>

<script>
import { mapState } from "vuex";
import api from "@/services/api";
import UserForm from "./UserForm.vue";

export default {
  name: "CompletePurchase",
  props: ["product"],
  components: { UserForm },
  computed: {
    ...mapState(["user"]),
    purchase() {
      return {
        buyerId: this.user.id,
        sellerId: this.product.userId,
        product: this.product,
        deliveryAddress: {
          postalCode: this.user.postalCode,
          street: this.user.street,
          houseNumber: this.user.houseNumber,
          district: this.user.district,
          city: this.user.city,
          state: this.user.state,
        },
      };
    },
  },
  methods: {
    async createTransaction() {
      await api.post("transaction", this.purchase);
      this.$router.push({ name: "user-purchases" });
    },
    async registerUser() {
      try {
        await this.$store.dispatch("registerUser", this.$store.state.user);
        await this.$store.dispatch("getUser", this.$store.state.user.email);
      } catch (error) {
        console.log(error);
      }
    },
    async completePurchase() {
      if (!this.$store.state.login) {
        await this.registerUser();
      }
      await this.createTransaction();
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
}
</style>
