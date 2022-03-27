<template>
  <section>
    <user-form>
      <button class="btn" @click.prevent="updateUser">Atualizar Usuário</button>
    </user-form>
  </section>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import api from "@/services/api";

export default {
  name: "UserEditView",
  components: { UserForm },
  methods: {
    async updateUser() {
      await api.put(
        `user/${this.$store.state.user.id}`,
        this.$store.state.user
      );
      this.$store.dispatch("getUser");
      this.$router.push({ name: "user" });
    },
  },
};
</script>
