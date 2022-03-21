<template>
  <section class="login">
    <h1>Login</h1>
    <form @submit.prevent="doLogin">
      <label for="email">E-mail</label>
      <input
        type="email"
        name="email"
        id="email"
        v-model="login.email"
        required
      />
      <label for="password">Senha</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="login.password"
        required
      />
      <button class="btn" type="submit">Entrar</button>
    </form>
    <p class="forgot-password">
      <a href="/" target="_blank">Esqueceu sua senha? Clique aqui.</a>
    </p>
    <register-form />
  </section>
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "LoginView",
  components: { RegisterForm },
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    doLogin() {
      this.$store.dispatch("getUser", this.login.email);
      this.$router.push({ name: "user" });
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 80px;
  margin-bottom: 40px;
  color: #87f;
}

form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
}

.forgot-password {
  text-align: center;
  margin: 20px auto 0 auto;
}

.forgot-password:hover {
  color: #87f;
  text-decoration: underline;
}
</style>
