<template>
  <div class="product" v-if="product">
    <router-link
      class="product-img"
      :to="{ name: 'product', params: { id: product.id } }"
    >
      <img
        v-if="product.pictures"
        :src="product.pictures[0].src"
        :alt="product.pictures[0].title"
      />
      <p v-else>Ver Produto</p>
    </router-link>
    <div class="info">
      <p class="price">{{ product.price | priceFormat }}</p>
      <h2 class="title">{{ product.name }}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: ["product"],
};
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  gap: 20px;
  margin-bottom: 40px;
  position: relative;
}

.info {
  align-self: end;
}

.product-img {
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
}
</style>
