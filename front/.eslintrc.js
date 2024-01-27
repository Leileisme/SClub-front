module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/standard'
  ],
  rules: {
    // 關掉命名要寫2個字
    'vue/max-attributes-per-line': 'off'
  }
}
