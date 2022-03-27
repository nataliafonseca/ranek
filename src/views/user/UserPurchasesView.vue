<template>
  <section>
    <div v-if="purchases">
      <h2>Compras</h2>
      <div
        class="product-wrapper"
        v-for="(purchase, index) in purchases"
        :key="index"
      >
        <product-item v-if="purchase.product" :product="purchase.product">
          <p class="seller"><span>Vendedor: </span>{{ purchase.sellerId }}</p>
        </product-item>
      </div>
    </div>
  </section>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import api from "@/services/api";
import { mapState } from "vuex";

export default {
  name: "UserPurchasesView",
  components: { ProductItem },
  data() {
    return {
      purchases: null,
    };
  },
  computed: {
    ...mapState(["user", "login"]),
  },
  methods: {
    async getPurchases() {
      const response = await api.get(`transaction?buyerId=${this.user.id}`);
      this.purchases = response.data;
    },
  },
  async created() {
    if (this.login) {
      await this.getPurchases();
    }
  },
  watch: {
    async login() {
      this.getPurchases();
    },
  },
};
</script>

<style scoped>
.product-wrapper {
  margin-bottom: 40px;
}

.seller span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>
