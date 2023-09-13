---
title: ESLint
description: How we define code style using ESLint
---

How we define code style using [ESLint](https://eslint.org/).

## Plugins

Install:

```bash
npm i eslint-plugin-prettier -D
```

Add prettier on plugins section:

```js:.eslintrc.cjs
module.exports = {
	plugins: ['@typescript-eslint', 'prettier'],
}
```

## Base Rules

- Make accessibility and return type mandatory.
- Prohibit console output.

```js:.eslintrc.cjs
module.exports = {
	rules: {
		'prettier/prettier': 'error',
		indent: ['error', 'tab', { SwitchCase: 1, ignoredNodes: ['ConditionalExpression'] }],
		semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
		'no-unexpected-multiline': 'error',
		'@typescript-eslint/explicit-member-accessibility': ['error'],
		'@typescript-eslint/explicit-function-return-type': ['error'],
		'no-var': 'error',
		'no-console': ['error'],
	},
}
```

[typescript-eslint - explicit-member-accessibility >](https://typescript-eslint.io/rules/explicit-member-accessibility/)

[typescript-eslint - explicit-function-return-type >](https://typescript-eslint.io/rules/explicit-function-return-type/)

[ESLint - no-console >](https://eslint.org/docs/latest/rules/no-console)

## Padding line between statements

Insert blank lines where appropriate as needed.
This rule will also be applied to the format.

```js:.eslintrc.cjs
module.exports = {
	rules: {
		// 'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
		'@typescript-eslint/lines-between-class-members': [
			'error',
			'always',
			{ exceptAfterSingleLine: true, exceptAfterOverload: true },
		],
		'padding-line-between-statements': [
			'error',
			{
				blankLine: 'always',
				prev: '*',
				next: ['export', 'const', 'let', 'return', 'multiline-block-like', 'multiline-expression'],
			},

			{ blankLine: 'any', prev: 'export', next: 'export' },
			{ blankLine: 'any', prev: 'const', next: 'const' },
			{ blankLine: 'any', prev: 'let', next: 'let' },
		],
	},
}
```

## Naming conventions

[Enforce naming conventions for everything across a codebase.](https://typescript-eslint.io/rules/naming-convention/)

- Define variable names, argument names, and function names with snake_case.
- Prefix private variables with an underscore.

```js:.eslintrc.cjs
module.exports = {
	rules: {
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'typeParameter',
				format: ['UPPER_CASE'],
			},
			{
				selector: ['class', 'interface', 'typeAlias'],
				format: ['PascalCase'],
			},
			{
				selector: ['method', 'function'],
				modifiers: ['private'],
				format: ['snake_case'],
				leadingUnderscore: 'require',
			},
			{
				selector: ['method', 'function'],
				modifiers: ['protected'],
				format: ['snake_case'],
				leadingUnderscore: 'require',
			},
			{
				selector: ['method', 'function'],
				format: ['snake_case'],
				// format: ['snake_case', 'camelCase'],
			},
			{
				selector: [
					'property',
					'accessor',
					'parameter',
					'parameterProperty',
					'variable',
					'enumMember',
				],
				modifiers: ['private'],
				format: ['snake_case'],
				leadingUnderscore: 'require',
			},
			{
				selector: [
					'property',
					'accessor',
					'parameter',
					'parameterProperty',
					'variable',
					'enumMember',
				],
				modifiers: ['protected'],
				format: ['snake_case'],
				leadingUnderscore: 'require',
			},
			{
				selector: ['accessor', 'parameter', 'parameterProperty', 'enumMember'],
				format: ['snake_case'],
			},
			{
				selector: ['property'],
				format: ['snake_case', 'camelCase'],
			},
			{
				selector: ['variable'],
				format: ['snake_case', 'UPPER_CASE'],
			},
		],
	},
}
```

## Overrides

Disable some rules for .cjs files.

```js:.eslintrc.cjs
module.exports = {
	overrides: [
		{
			files: '*.cjs',
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/naming-convention': 'off',
			},
		},
	],
}
```

## Using ESLint with Svelte

```json:.vscode/settings.json
{
	"eslint.probe": [
		...
		"svelte"
	],
	"eslint.validate": ["svelte"],
}
```

## Formatting

We have changed our policy to format with ESLint.

- Enable format on save and paste events.
- Use ESLint to format TypeScript, JavaScript, HTML, and Svelte files.

```json:.vscode/settings.json
{
	"editor.formatOnSave": true,
	"editor.formatOnPaste": true,
	"eslint.format.enable": true,
	"[typescript]": {
		"editor.defaultFormatter": "dbaeumer.vscode-eslint"
	},
	"[javascript]": {
		"editor.defaultFormatter": "dbaeumer.vscode-eslint"
	},
	"[html]": {
		"editor.defaultFormatter": "dbaeumer.vscode-eslint"
	},
	"[svelte]": {
		"editor.defaultFormatter": "dbaeumer.vscode-eslint"
	},
	"[css]": {
		"editor.defaultFormatter": "vscode.css-language-features"
	},
	"[json]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
}
```

## Change Scripts

Change the lint and format scripts.

```json:package.json
{
	"scripts": {
		"lint": "eslint .",
		"format": "eslint . --fix",
	}
}
```

## Missing return type on function in the HTML part of Svelte

In the HTML part of Svelte, if "Missing return type on function" is displayed, add an eslint-disable line at the bottom of the script block.

```ts
<script lang="ts">
	...

	/* eslint-disable @typescript-eslint/explicit-function-return-type */
</script>

<button on:click={() => on_click_button(text)} />
```
