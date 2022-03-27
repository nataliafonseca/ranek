<template>
  <section>
    <h2>Adicionar Produto</h2>
    <add-product-form />
    <h2>Seus Produtos</h2>
    <transition-group v-if="userProducts" name="list" tag="ul">
      <li v-for="product in userProducts" :key="product.id">
        <product-item :product="product">
          <p>{{ product.description }}</p>
          <button class="delete" @click="deleteProduct(product.id)" />
        </product-item>
      </li>
    </transition-group>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AddProductForm from "@/components/AddProductForm.vue";
import ProductItem from "@/components/ProductItem.vue";
import api from "@/services/api";

export default {
  name: "UserProductsView",
  components: { AddProductForm, ProductItem },
  computed: {
    ...mapState(["login", "user", "userProducts"]),
  },
  methods: {
    ...mapActions(["getUserProducts"]),
    async deleteProduct(id) {
      const confirm = window.confirm(
        "Tem certeza que deseja remover este produto? Essa ação é irreversível"
      );
      if (confirm) {
        try {
          await api.delete(`product/${id}`);
          this.getUserProducts();
        } catch (error) {
          console.log(error.response);
        }
      }
    },
  },
  watch: {
    login() {
      this.getUserProducts();
    },
  },
  created() {
    if (this.login) {
      this.getUserProducts();
    }
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.delete {
  position: absolute;
  top: 0;
  right: 0;
  background: url(../../assets/remove.svg) no-repeat center center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  border: none;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
</style>
