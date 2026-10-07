# nit-band 💬

[English](./README.md) | **日本語**

**Claude Code の mod です。送ったプロンプトの英語を、入力欄の上でひとつだけ直します。**

コーディングエージェントには毎日英語で話しかけています。nit-band は送ったプロンプトを読み、直す価値があるときだけ、同僚ならどう言うかを入力欄の上に出します。会話のログには入らないので、エージェントの文脈や返答には影響しません。

## 見た目

こう送ると:

> you should fix this bug, it is very bad code

エージェントが作業している間、入力欄の上に出ます:

```
nit: "you should fix this bug, it is very bad code" → "Could you fix this bug? The code needs improvement." (softer for a teammate)  [Save] [Hide]
```

日本語で書いたときは、英語での言い方が出ます:

```
in English: "Could you review this PR? It would help if you could take a look by tomorrow."  [Save] [Hide]
```

- **Save**: `~/.nit/phrasebook.md` に保存します。
- **Hide**: 消します。次のプロンプトを送っても消えます。

## 何を直すか

1回に1つだけ、次の順で選びます。

1. **意味**: 誤解されそうな言い回し
2. **トーン**: きつすぎる、失礼、または弱すぎる
3. **自然さ**: 正しいが、明らかに非ネイティブ

意味もトーンも変わらない小さなミス（冠詞の抜け、typo）は直しません。コードブロック、インラインコード、スラッシュコマンド、12文字未満のプロンプトは対象外です。

## インストール

Claude Code 2.1.287 以降（mods 対応版）が必要です。

```
/plugin marketplace add 6igtree/nit-band
/plugin install nit-band@nit-band
```

## 費用とプライバシー

入力したプロンプトごとに、あなた自身の Claude Code セッションと認証で Haiku を1回呼びます。それ以外の場所には送りません。呼び出しは裏で動くので、プロンプトの送信が遅れることはありません。

## 関連

[nit](https://github.com/6igtree/nit): skill 版です。エージェントが英語を話す同僚として返答し、その返答に nit の1行を付けます。自分の言語から英語のみまで4段階あります。nit-band とフレーズ帳を共有します。

## ライセンス

MIT
