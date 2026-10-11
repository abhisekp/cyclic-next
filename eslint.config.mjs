export default [
  { ignores: ['dist/**', 'lib/**', '_site/**', 'node_modules/**', 'coverage/**'] },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: Object.fromEntries(['console', 'process', 'Buffer', 'URL', 'module', 'exports', 'require', '__dirname', 'setTimeout', 'clearTimeout', 'document', 'window', 'navigator', 'setInterval', 'clearInterval', 'requestAnimationFrame', 'fetch', 'AbortSignal'].map(name => [name, 'readonly'])),
    },
    rules: { 'no-undef': 'error', 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], 'no-unreachable': 'error', 'no-constant-condition': 'error', 'eqeqeq': 'error' },
  },
];
