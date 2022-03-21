const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "Ranek",
    themeColor: "#7B76E8",
    appleMobileWebAppCapable: "yes",
  },
});
