<template>
  <form>
    <div v-if="showLoginData" class="user">
      <label for="name">Nome</label>
      <input type="text" id="name" name="name" v-model="name" />
      <label for="email">E-mail</label>
      <input type="email" id="email" name="email" v-model="email" />
      <label for="password">Senha</label>
      <input type="password" id="password" name="password" v-model="password" />
    </div>
    <label for="postalCode">CEP</label>
    <input
      type="text"
      id="postalCode"
      name="postalCode"
      v-model="postalCode"
      @blur="fillAddress"
    />
    <label for="street">Rua</label>
    <input type="text" id="street" name="street" v-model="street" />
    <label for="houseNumber">Número</label>
    <input
      type="text"
      id="houseNumber"
      name="houseNumber"
      v-model="houseNumber"
    />
    <label for="district">Bairro</label>
    <input type="text" id="district" name="district" v-model="district" />
    <label for="city">Cidade</label>
    <input type="text" id="city" name="city" v-model="city" />
    <label for="state">Estado</label>
    <input type="text" id="state" name="state" v-model="state" />
    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
import { mapFields } from "@/helpers.js";
import getAddress from "@/services/viaCep.js";

export default {
  name: "UserForm",
  computed: {
    ...mapFields({
      fields: [
        "name",
        "email",
        "password",
        "postalCode",
        "street",
        "houseNumber",
        "district",
        "city",
        "state",
      ],
      base: "user",
      mutation: "UPDATE_USER",
    }),
    showLoginData() {
      return !this.$store.state.login || this.$route.name === "user-edit";
    },
  },
  methods: {
    async fillAddress() {
      const cep = this.postalCode.replace(/\D/g, "");
      if (cep.length === 8) {
        const response = await getAddress(cep);
        this.street = response.logradouro;
        this.district = response.bairro;
        this.city = response.localidade;
        this.state = response.uf;
      }
    },
  },
};
</script>

<style scoped>
form,
.user {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.user {
  grid-column: 1 / -1;
}

.button {
  margin-top: 10px;
  grid-column: 2;
}
</style>
