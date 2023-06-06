---
title: Git Branches and Commits
---

## Git branch naming conventions

Write the issue number and issue title in kebab-case, connected with a hyphen.

```
743-git-branches-and-commits
```

## Script

We have prepared a script to create branches issue names.

```bash
npm run create-branch "<branch-name> #<branch-number>"
```

example:

```bash
npm run create-branch "Docs: Correct English #990"
```

## Commit message conventions

Include the issue title and issue number.

```
Docs: Git Branches and Commits #743
```

If there are multiple commits in the same branch, provide additional details.

```
Docs: Git Branches and Commits #743 Update docs
```