<template>
  <header>
    <nav>
      <router-link :to="{ name: 'home' }" class="logo">
        <img width="90" height="22" src="../assets/ranek.svg" alt="Ranek" />
      </router-link>
      <router-link v-if="$store.state.login" :to="{ name: 'user' }" class="btn">
        {{ userName }}
      </router-link>
      <router-link v-else :to="{ name: 'login' }" class="btn">
        Vender / Login
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "PageHeader",
  computed: {
    userName() {
      return this.$store.state.user.name.replace(/ .*/, "");
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.logo {
  padding: 10px 0;
}

.logo img {
  width: 90px;
}
</style>
