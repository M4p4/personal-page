import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

const eslintConfig = [
  ...nextCoreWebVitals,
  eslintConfigPrettier,
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**'],
  },
];

export default eslintConfig;
