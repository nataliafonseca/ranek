<template>
  <section class="products-container">
    <div v-if="products && products.length" class="products">
      <div v-for="(product, index) in products" :key="index" class="product">
        <router-link :to="{ name: 'home' }">
          <img
            v-if="product.fotos"
            :src="product.fotos[0].src"
            :alt="product.fotos[0].titulo"
          />
          <p class="price">{{ product.preco | priceFormat }}</p>
          <h2 class="title">{{ product.nome }}</h2>
          <p>{{ product.descricao }}</p>
        </router-link>
      </div>
    </div>
    <div v-else-if="products">
      <p class="no-results">Busca sem resultados. Tente buscar outro termo.</p>
    </div>
  </section>
</template>

<script>
import api from "@/services/api";
import { serialize } from "@/helpers";

export default {
  name: "ProductList",
  data() {
    return {
      products: null,
      productsPerPage: 9,
    };
  },
  filters: {
    priceFormat(value) {
      return Number(value).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "BRL",
      });
    },
  },
  computed: {
    query() {
      let queryString = serialize(this.$route.query);
      return `?_limit=${this.productsPerPage}${queryString}`;
    },
  },
  methods: {
    getProducts() {
      api.get(`produto/${this.query}`).then((response) => {
        this.products = response.data;
      });
    },
  },
  created() {
    this.getProducts();
  },
  watch: {
    query() {
      this.getProducts();
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
