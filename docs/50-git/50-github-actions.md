---
title: GitHub Actions
description: We use GitHub Actions to perform two types of CI Checks and tests.
---

We use [GitHub Actions](https://docs.github.com/en/actions) to perform two types of CI: Checks and tests.

## Secrets

Do not write confidential information (environment variables etc.) directly. Instead, register it in GitHub's Secrets.

```md
- GitHub > Repository > Settings
- Secrets and Variables > Actions
- New repository secret
```

If you want to use the secret, refer to it as `secrets.[SECRET_NAME]`.

```yaml:.github/workflows/ci.yml
echo DATABASE_URL=${{ secrets.DATABASE_URL }} >> .env
```

## Checks

Run a lint check, a type check, and Svelte check.

```yaml:.github/workflows/ci.yml
jobs:
  check:
    name: Check
    runs-on: ubuntu-latest
    steps:
      - name: Lint Check
        run: npm run lint

      - name: Type Check
        run: npm run typecheck

      - name: Svelte Check
        run: npm run check
```

## Tests

Execute tests using Vitest and Playwright.

```yaml:.github/workflows/ci.yml
jobs:
  tests:
    name: Tests
    runs-on: ubuntu-latest
    steps:
      - name: Vitest Test
        run: npm run test:ci

      - name: Playwright Test
        run: npm run test:e2e
```

## Output

Output Playwright Report and logs.

```yaml:.github/workflows/ci.yml
jobs:
  tests:
    name: Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: logs
          path: logs/
          retention-days: 30
```

## Our Checks for PR

### GitHub Apps

- [Code Climate](https://codeclimate.com/)

CodeClimate Quality is a feature within CodeClimate that assesses the maintainability of code by analyzing its complexity, duplication, and other factors. It provides a grade and insights to help improve code quality.

- [ChatGPT-CodeReview](https://github.com/anc95/ChatGPT-CodeReview)

ChatGPT-CodeReview is a code review bot that uses ChatGPT. It is available in multiple languages, including English, Chinese, Japanese, and Korean. The bot is currently only used for testing purposes and is deployed on AWS Lambda with rate limit restrictions.

- [SonarCloud](https://www.sonarsource.com/products/sonarcloud/)

SonarCloud is a cloud-based code quality and security analysis service that automatically reviews code to detect bugs, vulnerabilities, and code smells. It integrates with popular version control platforms and CI/CD pipelines to provide real-time feedback on code changes.

### GitHub Actions

- CI / Lint Check, Type Check, Svelte CHeck
- CI / Vitest Test, Playwright Test
- Code Review by akiojin
- Code Review by akiojin GPT-4
- Sonar Cloud Code Analysis
- codeclimate
- CodeQL / Analyze (javascript) (dynamic)
- Code scanning results / CodeQL
- Code scanning results / SonarCloud
