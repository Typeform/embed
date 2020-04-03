module.exports = {
  extends: ['@typeform/eslint-config'],
  globals: {
    Feature: true,
    Scenario: true,
    within: true,
    actor: true,
    cy: true,
    Cypress: true
  },
  rules: {
    "comma-dangle": ["error", "never"],
    complexity: 0
  }
}
