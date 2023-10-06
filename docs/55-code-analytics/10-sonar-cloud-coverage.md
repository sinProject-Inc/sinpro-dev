---
title: SonarCloud Coverage
description: SonarCloud is a cloud-based code quality and security service. It automatically analyzes and provides feedback on code changes in software projects through continuous inspection.
---

<img loading="lazy" src="/images/coverage.avif" alt="Coverage" style="width: 100%; aspect-ratio: 994/498;" />

[SonarCloud](https://www.sonarsource.com/products/sonarcloud/) is a cloud-based code quality and security service. It automatically analyzes and provides feedback on code changes in software projects through continuous inspection.

It integrates with popular development workflows, particularly within continuous integration/continuous delivery (CI/CD) pipelines.

[SonarCloud guide on Test Coverage &gt;](https://docs.sonarcloud.io/enriching/test-coverage/overview/)

## Use CI-based, not automatic analysis

- Sign in to SonarCloud
- Open `Your Organization > Your Project > Administration > Analysis Method`
- Disable `Automatic Analysis`

## Analyze a project with a GitHub Action

- Open `Your Organization > Your Project > Administration > Analysis Method`
- Click `With GitHub Actions`
- Create a GitHub Secret
- Create or update a build file

## Create or update a build file for JS, TS, Go, Python, PHP, ...

### Create a `sonar-project.properties` file

Create a configuration file in the root directory of the project and name it `sonar-project.properties`

```properties:sonar-project.properties
sonar.projectKey=sinProject-Inc_sinpro-dev
sonar.organization=sinproject-inc
sonar.javascript.lcov.reportPaths=./coverage/lcov.info
sonar.coverage.exclusions=**/tests/**, **/*.test.*, **/*.config.*, **/+*, src/hooks.server.ts
```

### Create or update a ci.yml file

```yml:.github/workflows/ci.yml
name: Build

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  tests:
    name: Vitest Test
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Install dependencies
        run: npm run install

			- name: Vitest Test and coverage
        run: npx vitest run --coverage

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONARCLOUD_TOKEN }}
```
