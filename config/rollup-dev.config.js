// rollup.config.js
const scss = require("rollup-plugin-scss");

export default {
  input: "src/index.js",
  output: {
    file: "dist/calendar.js",
    format: "iife",
  },
  plugins: [
    scss({
      output: "dist/styles.css",
      sass: require('sass'),
    })    
  ],
  watch: {
      exclude:['node_modules/**'],
      clearScreen: true
  }
};