import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    // setupNodeEvents(on, config) {
    //   return require('./cypress/plugins/index.js')(on, config)
    // },
    baseUrl: "http://localhost:4200",
  },
});
// import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     baseUrl: "http://localhost:4200",
//   },

//   component: {
//     devServer: {
//       framework: "angular",
//       bundler: "webpack",
//     },
//     specPattern: "**/*.cy.ts",
//   },
// });
