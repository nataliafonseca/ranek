<template>
  <section>
    <h2>Crie a Sua Conta</h2>
    <transition mode="out-in">
      <button v-if="!create" class="btn" @click="create = true">
        Criar Conta
      </button>
      <user-form v-else>
        <button class="btn btn-register">Registrar</button>
      </user-form>
    </transition>
  </section>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
export default {
  name: "RegisterForm",
  components: { UserForm },
  data() {
    return {
      create: false,
    };
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-register {
  max-width: initial;
}
</style>
