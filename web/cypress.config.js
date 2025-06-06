const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 4000,
    experimentalStudio: true,
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1440,
    viewportHeight: 900
  },
});
