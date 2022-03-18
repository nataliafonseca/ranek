<template>
  <div id="app">
    <page-header />
    <main id="main">
      <router-view />
    </main>
    <page-footer />
  </div>
</template>

<script>
import PageFooter from "@/components/PageFooter.vue";
import PageHeader from "@/components/PageHeader.vue";

export default {
  components: {
    PageHeader,
    PageFooter,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body,
ul,
li,
h1,
h2,
p {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

body {
  font-family: "Avenir", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", Arial, sans-serif;
  color: #345;
  background: url("./assets/pattern.svg") repeat top;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

.btn {
  display: block;
  padding: 10px 30px;
  background: #87f;
  border: none;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-family: inherit;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  cursor: pointer;
  transition: all 0.3s;
}

.btn:hover {
  background: #65d;
  transform: scale(1.1);
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#main {
  flex: 1;
}

input,
textarea {
  border-radius: 4px;
  border: 1px solid white;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3;
  font-size: 1rem;
  font-family: inherit;
  margin-bottom: 15px;
}

input:focus,
input:hover,
textarea:focus,
textarea:hover {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: #87f;
}
</style>
