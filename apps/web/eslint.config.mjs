import { globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  globalIgnores([".next/**", "next-env.d.ts"]),
  ...nextVitals
];

export default eslintConfig;
