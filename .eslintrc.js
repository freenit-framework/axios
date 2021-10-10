const eslintConfig = {
  parser: '@babel/eslint-parser',
  extends: ['prettier'],
  plugins: ['prettier'],
  env: {
    browser: true,
  },
}

module.exports = eslintConfig
