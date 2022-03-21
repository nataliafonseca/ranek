<template>
  <section class="products-container">
    <transition mode="out-in">
      <div
        v-if="products && products.length"
        class="products"
        key="product-list"
      >
        <div v-for="(product, index) in products" :key="index" class="product">
          <router-link :to="{ name: 'product', params: { id: product.id } }">
            <img
              v-if="product.pictures"
              :src="product.pictures[0].src"
              :alt="product.pictures[0].titulo"
            />
            <p class="price">{{ product.price | priceFormat }}</p>
            <h2 class="title">{{ product.name }}</h2>
            <p>{{ product.description }}</p>
          </router-link>
        </div>
        <products-pagination
          :productsTotal="productsTotal"
          :productsPerPage="productsPerPage"
        />
      </div>
      <div v-else-if="products" key="no-results">
        <p class="no-results">
          Busca sem resultados. Tente buscar outro termo.
        </p>
      </div>
      <loading-dots v-else key="loading" />
    </transition>
  </section>
</template>

<script>
import ProductsPagination from "@/components/ProductsPagination.vue";
import api from "@/services/api";
import { serialize } from "@/helpers";

export default {
  name: "ProductList",
  components: { ProductsPagination },
  data() {
    return {
      products: null,
      productsPerPage: 9,
      productsTotal: 0,
    };
  },
  computed: {
    query() {
      let queryString = serialize(this.$route.query);
      return `?_limit=${this.productsPerPage}${queryString}`;
    },
  },
  methods: {
    async getProducts() {
      this.products = null;
      const response = await api.get(`product/${this.query}`);
      this.productsTotal = Number(response.headers["x-total-count"]);
      this.products = response.data;
    },
  },
  async created() {
    await this.getProducts();
  },
  watch: {
    async query() {
      await this.getProducts();
    },
  },
};
</script>

<style scoped>
.products-container {
  max-width: 1000px;
  margin: 0 auto;
}

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.product:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.product img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.title {
  margin-bottom: 10px;
}

.price {
  font-weight: bold;
  color: #e80;
}

.no-results {
  text-align: center;
}
</style>
