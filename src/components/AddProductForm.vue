<template>
  <form class="add-product">
    <label for="name">Nome</label>
    <input type="text" id="name" name="name" v-model="product.name" />

    <label for="price">Preço (R$)</label>
    <input type="number" id="price" name="price" v-model="product.price" />

    <label for="pictures">Fotos</label>
    <input type="file" id="pictures" name="pictures" ref="pictures" />

    <label for="description">Descricao</label>
    <textarea
      type="text"
      id="description"
      name="description"
      v-model="product.description"
    />

    <input
      type="button"
      value="Adicionar Produto"
      class="btn"
      @click.prevent="addProduct"
    />
  </form>
</template>

<script>
import api from "@/services/api";

export default {
  name: "AddProductForm",
  data() {
    return {
      product: {
        name: "",
        price: "",
        description: "",
        userId: "",
        sold: false,
        pictures: null,
      },
    };
  },
  methods: {
    formatProduct() {
      this.product.userId = this.$store.state.user.id;
    },
    async addProduct() {
      this.formatProduct();
      await api.post("product", this.product);
      this.$store.dispatch("getUserProducts");
    },
  },
};
</script>

<style scoped>
.add-product {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>
