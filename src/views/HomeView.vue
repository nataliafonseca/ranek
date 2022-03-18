<template>
  <section>
    <h1>👍 Compre ou Venda 👎</h1>
    <product-search />
    <product-list />
  </section>
</template>

<script>
import ProductList from "../components/ProductList.vue";
import ProductSearch from "../components/ProductSearch.vue";

export default {
  name: "HomeView",
  components: { ProductList, ProductSearch },
};
</script>

<style scoped>
h1 {
  color: #87f;
  margin-top: 40px;
  text-align: center;
  font-size: 2rem;
}
</style>
