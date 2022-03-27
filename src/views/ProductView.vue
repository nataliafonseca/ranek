<template>
  <section>
    <div v-if="product" class="product">
      <ul class="pictures" v-if="product.pictures">
        <li v-for="(picture, index) in product.pictures" :key="index">
          <img :src="picture.src" :alt="picture.title" />
        </li>
      </ul>
      <div class="info">
        <h1>{{ product.name }}</h1>
        <p class="price">{{ product.price | priceFormat }}</p>
        <p class="description">{{ product.description }}</p>
        <transition mode="out-in" v-if="!product.sold">
          <button class="btn" @click="complete = true" v-if="!complete">
            Comprar
          </button>
          <complete-purchase :product="product" v-else />
        </transition>
        <button class="btn" v-else disabled>Produto Vendido</button>
      </div>
    </div>
    <loading-dots v-else />
  </section>
</template>

<script>
import api from "@/services/api";
import CompletePurchase from "@/components/CompletePurchase.vue";

export default {
  name: "ProductView",
  props: ["id"],
  components: { CompletePurchase },
  data() {
    return {
      product: null,
      complete: false,
    };
  },
  methods: {
    async getProduct() {
      this.product = null;
      const response = await api.get(`product/${this.id}`);
      this.product = response.data;
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.price {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.description {
  font-size: 1.2rem;
}

.btn {
  margin-top: 60px;
  width: 200px;
}
</style>
