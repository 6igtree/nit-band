# nit-band 💬

[English](./README.md) | **日本語**

**Claude Code の mod です。毎日の仕事を、働きたい言語でどう言うかを学べます。**

毎日、コーディングエージェントに自分の言語で仕事の内容を伝えています。nit-band は、そのプロンプトを学んでいる言語で同僚ならどう言うかにして、覚える価値のある表現を1つ添えます。気に入ったものを保存していくと、フレーズ帳が「自分の仕事の語彙集」になります。初期設定は日本語 → 英語です。

会話のログには入らないので、エージェントの文脈や返答には影響しません。

## 見た目

こう送ると:

> 昨日のデプロイ以降エラーが増えているので、原因と影響範囲を調べて

エージェントが作業している間、入力欄の上に出ます:

```
in English: "Errors have spiked since yesterday's deploy. Can you investigate the root cause and blast radius?"  [Save] [Hide]
key: 影響範囲 → blast radius
```

- **Save**: `~/.nit/phrasebook.md` に保存します。
- **Hide**: 消します。次のプロンプトを送っても消えます。

英語で書いたプロンプト、スラッシュコマンド、コード、とても短いプロンプトは対象外です。

## インストール

Claude Code 2.1.287 以降（mods 対応版）が必要です。

```
/plugin marketplace add 6igtree/nit-band
/plugin install nit-band@nit-band
```

## 言語の設定

初期設定は日本語 → 英語です。`/config` で2つとも変えられます。

- **Language you work in**: 普段プロンプトを書く言語（初期値 `Japanese`）
- **Language you are learning**: 帯に出す言語（初期値 `English`）

English, Japanese, Chinese, Korean, Spanish, French, German, Portuguese, Vietnamese, Hindi から選べます。たとえば日本のチームと働く海外のエンジニアなら `English` → `Japanese` です。すでに学んでいる言語で書いたプロンプトは対象外です。

## 費用とプライバシー

入力したプロンプトごとに、あなた自身の Claude Code セッションと認証で Haiku を1回呼びます。それ以外の場所には送りません。呼び出しは裏で動くので、プロンプトの送信が遅れることはありません。

## 関連

[nit](https://github.com/6igtree/nit): skill 版です。エージェントが英語を話す同僚として返答し、あなたが書いた英語をやさしく直します。nit-band とフレーズ帳を共有します。

## ライセンス

MIT
