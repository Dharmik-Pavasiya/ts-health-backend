// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintconfigprettier from 'eslint-config-prettier'

export default tseslint.config({
    // @ts-ignore
    languageOptions: {
        parserOptions: {
            project: true,
            tsconfigTootDir: import.meta.dirname
        }
    },
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, eslintconfigprettier],
    rules: {
        // 'no-console': 'error',
        quotes: ['error', 'single', { allowTemplateLiterals: true }]
    }
})
