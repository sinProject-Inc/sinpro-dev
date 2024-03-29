---
title: Git Branches and Commits
description: Write the issue number and issue title in kebab-case, connected with a hyphen.
---

## Branching Strategy

At first, we employed git-flow and managed multiple branches such as develop, feature, release, hotfix, and master. However, after years of operation and trial and error, we now simply use only the main branch as the integration branch and topic branches.

## Git branch naming conventions

Write the issue number and issue title in kebab-case, connected with a hyphen.

```md
743-git-branches-and-commits
```

## Script

We have prepared [a script to create branches issue names](https://github.com/sinProject-Inc/sinpro-dev/blob/main/src/scripts/create_git_branch.ts).

```bash
npm run branch "<branch-name> #<branch-number>"
```

example:

```bash
npm run branch "Correct English #990"
```

## Commit message conventions

Include the issue title and issue number.

```md
Git Branches and Commits #743
```

If there are multiple commits in the same branch, provide additional details.

```md
Git Branches and Commits #743 Update docs
```
