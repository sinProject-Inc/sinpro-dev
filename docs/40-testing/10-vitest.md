---
title: Vitest
description: How we automate our tests using Vitest. Vitest is a testing framework designed for unit testing.
---

How we automate our tests using [Vitest](https://vitest.dev/).

Vitest is a testing framework designed for unit testing.

## Installation

```bash
npm install -D vitest
```

## File Name

In the same directory as the file of the code to be tested is in, write test code in a file named [filename of the code to be tested].test.ts.

## Options

Change the files to be included in the test run.

```ts:vite.config.ts
export default defineConfig({
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		coverage: {
			all: true,
			include: ['src/**/*.ts'],
			exclude: [
				'src/**/+*.ts',
				'src/app.d.ts',
				'src/hooks.server.ts',
				'src/scripts/create_git_branch.ts',
			],
			reporter: ['lcov', 'text'],
		},
	},
})
```

[Configuring Vitest >](https://vitest.dev/config/)

## Scripts

We have prepared the following scripts to execute Vitest.

```json:package.json
{
	"scripts": {
		"test:unit": "vitest",
		"test:unit:run": "vitest run",
		"coverage": "vitest run --coverage",
	}
}
```

## VSCode Extension

Use the [VSCode Extension](./vscode-workspace-extensions#testing) for testing.

## Sample Code

```ts:[talk]src/lib/general/valid_id.test.ts
import { expect, it } from 'vitest'
import { ValidId } from './valid_id'

it('1', () => {
	expect(new ValidId(1).id).toEqual(1)
})
```

When checking thrown errors:

```ts:[talk]src/lib/general/valid_id.test.ts
import { expect, it } from 'vitest'
import { ValidId } from './valid_id'

it('NaN', () => {
	expect(() => new ValidId(NaN)).toThrow('id is not a number')
})
```

## In-source testing

```ts:[talk]src/lib/locale/i18n.ts
if (import.meta.vitest) {
	const { expect, it } = import.meta.vitest

	it('get_initial_app_locale_code', () => {
		expect(get_initial_locale_code()).toBe('en-US')
	})
}
```

```ts:vite.config.ts
export default defineConfig({
	define: {
		'import.meta.vitest': 'undefined',
	},
})
```

```json:tsconfig.json
{
	"compilerOptions": {
		"types": ["vitest/importMeta"]
	}
}
```

[Here is the official documentation >](https://vitest.dev/guide/in-source.html)

## Use test.each when there are multiple test data

- Define the type of your test specifications using the `type` keyword.
- Prepare your test data in an array format.
- Use `test.each` to execute tests on each item in your array of test data.

```ts:src/lib/docs/markdown.test.ts
type Spec = {
	name: string
	path: string
	description: string
}

const specs: Spec[] = [
	{
		name: 'About',
		path: './docs/10-company-information/20-about.md',
		description:
			'sinProject Inc. is an software development company in Osaka, Japan. We primarily use SvelteKit and TypeScript, but also work with other programming languages and frameworks.',
	},
	{
		name: 'Events',
		path: './docs/10-company-information/40-events.md',
		description: 'Here are some of the events organized by sinProject.',
	},
]

it.each(specs)('generate_page_content($name)', async (spec) => {
	const { name, path, description, content } = spec
	const result = await Markdown.generate_page_content(path)

	expect(result.title).toBe(name)
	expect(result.description).toBe(description)
})
```
