// rollup.config.js
const scss = require("rollup-plugin-scss");
import { terser} from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: {
    file: "dist/candar.min.js",
    format: "iife",
  },
  plugins: [
    scss({
      output: "dist/styles.css",
      outputStyle: "compressed",
      sass: require('sass'),
    }),
    terser()
  ],
};
