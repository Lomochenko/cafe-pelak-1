module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}

