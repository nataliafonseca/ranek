<template>
  <section>
    <div v-if="sales">
      <h2>Vendas</h2>
      <div class="product-wrapper" v-for="(sale, index) in sales" :key="index">
        <product-item v-if="sale.product" :product="sale.product">
          <p class="seller"><span>Comprador: </span>{{ sale.buyerId }}</p>
        </product-item>
        <div class="delivery">
          <h3>Entrega:</h3>
          <ul v-if="sale.deliveryAddress">
            <li>Rua: {{ sale.deliveryAddress.street }}</li>
            <li>Número: {{ sale.deliveryAddress.houseNumber }}</li>
            <li>Bairro: {{ sale.deliveryAddress.district }}</li>
            <li>Cidade: {{ sale.deliveryAddress.city }}</li>
            <li>Estado: {{ sale.deliveryAddress.state }}</li>
            <li>CEP: {{ sale.deliveryAddress.postalCode }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import api from "@/services/api";
import { mapState } from "vuex";

export default {
  name: "UserSalesView",
  components: { ProductItem },
  data() {
    return {
      sales: null,
    };
  },
  computed: {
    ...mapState(["user", "login"]),
  },
  methods: {
    async getSales() {
      const response = await api.get(`transaction?sellerId=${this.user.id}`);
      this.sales = response.data;
    },
  },
  async created() {
    if (this.login) {
      await this.getSales();
    }
  },
  watch: {
    async login() {
      this.getSales();
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

.delivery {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  gap: 20px;
  margin-bottom: 60px;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  justify-self: end;
}
</style>
