---
name: Release issue template
about: Describe this issue template's purpose here.
title: 'Release v0.XX.0'
labels: 'maintenance'
assignees: ''
---

# Before Working on the Issue

- [ ] Assign yourself
- [ ] Share your screen on Discord
- [ ] Write which issue you are starting on Slack
- [ ] Git: Fetch the latest main
- [ ] Git: Create a branch with the name of the issue

# Tasks

## Tasks

- [ ] マイナーバージョンを上げる場合 `npm version minor` を実行する。パッチバージョンを上げる場合 `npm version patch` を実行する。
- [ ] push する。
- [ ] PR を作成する。PR title は `<Issue Title> <Issue Number>` とする。その他 PR の記載やチェックボックスは変更しないこと。
- [ ] PDMに連絡し、PRをマージしてもらう。
- [ ] 作成された タグを origin に push する。

## GitHub

- [ ] [Close されている PR 一覧](https://github.com/sinProject-Inc/sinpro-dev/pulls?q=is%3Apr+sort%3Aupdated-desc+is%3Aclosed) で、機能拡張だと思われるものに `enhancement` のラベルを付ける。
- [ ] [GitHub のリリース 作成ページ](https://github.com/sinProject-Inc/sinpro-dev/releases)を開き、`Draft a new release` ボタンをクリックする。
- [ ] `Choose a tag` で、新規作成したタグを選択する。
- [ ] `Generate release notes` ボタンを押す。
- [ ] 自動生成されたリリースノートの Release に関する項目を削除する。
- [ ] Preview して問題がないかを確認する。
- [ ] 問題なければ、`Publish release` ボタンを押してリリースを作成する。

## Server

- [ ] `ssh dev@sinpro-dev` で接続する。
- [ ] `cd ~/dev/sinpro-dev`
- [ ] `git checkout main && git pull`
- [ ] `npm i --legacy-peer-deps`
- [ ] `npm run build`
- [ ] `pm2 restart sinpro-dev`

## Check

- [ ] サーバーの表示確認を行う

## 告知

- [ ] ドキュメントの追加や更新があれば、 以下のテンプレートを使用しアナウンスをする。
- [ ] Docs更新アナウンスのテンプレートの「202x 年 x 月 x 日」は、前回リリース日の翌日の日付を入れる。

```markdown
@channel

sinpro-dev Docs を更新しましたのでご案内いたします。

[docs 更新履歴](https://github.com/sinProject-Inc/sinpro-dev/commits/main/docs) を確認し、202x 年 x 月 x 日のコミット以降で、興味があるところ、業務に関係するところを確認しておいてくださいませ。

確認が完了しましたらリアクションをお願い致します。
また、気になることがありましたらお気軽にご連絡くださいませ。
よろしくお願いいたします。

@岩崎 真也 さん、SNS 告知お願い致します。
```
