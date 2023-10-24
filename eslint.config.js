import antfu from "@antfu/eslint-config"
import react from "eslint-plugin-react"
import hooks from "eslint-plugin-react-hooks"
import next from "@next/eslint-plugin-next"

export default antfu(
  {},
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "react": react,
      "react-hooks": hooks,
      "@next/next": next,
    },
    rules: {
      ...react.configs["jsx-runtime"].rules,
      ...hooks.configs.recommended.rules,
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
  },
  {
    rules: {
      "arrow-parens": ["error", "always"],
      "curly": ["error", "all"],
      "style/quotes": ["error", "double"],
      "style/brace-style": ["error", "1tbs"],
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": "warn",
      "node/prefer-global/process": ["error", "always"],
    },
  },
)
