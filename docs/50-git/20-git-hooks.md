---
title: Git Hooks
description: We use lint-staged and Husky for our Git Hooks.
---

We use lint-staged and Husky for our Git Hooks.

- [lint-staged](https://github.com/okonet/lint-staged) - Run linters against staged git files and don't let 💩 slip into your code base!
- [Husky](https://typicode.github.io/husky/#/) - Husky improves your commits and more 🐶 woof!

## Installation

```bash
npm install --save-dev lint-staged
```

```bash
npx husky-init && npm install
```

## pre-commit

Combine [ESLint](https://eslint.org/), [Stylelint](https://stylelint.io/), [Prettier](https://prettier.io/), and [lint-staged](https://github.com/okonet/lint-staged) to format code.

```json:package.json
{
	"scripts": {
		"lint": "eslint .",
	},

	// ...

	"lint-staged": {
		"*.{js,ts,svelte}": "eslint --cache --fix",
		"*.css": "stylelint --fix",
		"*.{js,css,md,ts,svelte,css,scss,json}": "prettier --write"
	}
}
```

```bash:.husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

current_branch=$(git branch --show-current)

if [ "$current_branch" = "main" ]; then
  echo "Error: You cannot commit directly to main branch!"
  exit 1
fi

npx lint-staged

npm run lint
```

## pre-push

Perform TypeScript type checking, run tests with [Vitest](https://vitest.dev/), and finally check for conflicts.

```json:package.json
{
	"scripts": {
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"test:unit:run": "vitest run",
		"typecheck": "tsc --noEmit"
	}
}
```

```bash:.husky/pre-push
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run typecheck
npm run check

npm run test:unit:run

git fetch origin
git merge --no-commit --no-ff origin/main
git reset --hard HEAD
```
