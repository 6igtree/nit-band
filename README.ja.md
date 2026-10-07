# nit-band 💬

[English](./README.md) | **日本語**

**Claude Code の mod です。毎日の仕事を、働きたい言語でどう言うかを学べます。**

コーディングエージェントには、毎日自分の言語で仕事を頼んでいるはずです。nit-band は、そのプロンプトを、学んでいる言語を話す同僚ならどう言うかに言い換えます。覚える価値のある表現も1つ添えます。気に入ったものを保存していけば、自分の仕事で使う表現だけのフレーズ帳ができます。初期設定は日本語 → 英語です。

言い換えは会話のログに入りません。エージェントの文脈や返答には影響しません。

## 見た目

次のように送ったとします。

> 昨日のデプロイ以降エラーが増えているので、原因と影響範囲を調べて

エージェントが作業している間、入力欄の上にこう表示されます。

```
in English: "Errors have spiked since yesterday's deploy. Can you investigate the root cause and blast radius?"  [Save] [Hide]
key: 影響範囲 → blast radius
```

- Save: `~/.nit/phrasebook.md` に保存します。
- Hide: 消します。次のプロンプトを送っても消えます。

英語で書いたプロンプトやスラッシュコマンド、コード、とても短いプロンプトには何も出しません。

## インストール

Claude Code 2.1.287 以降（mods 対応版）が必要です。

```
/plugin marketplace add 6igtree/nit-band
/plugin install nit-band@nit-band
```

## 言語の設定

初期設定は日本語 → 英語です。`/config` で次の2つを変えられます。

- Language you work in: 普段プロンプトを書く言語（初期値 `Japanese`）
- Language you are learning: 帯に出す言語（初期値 `English`）

English, Japanese, Chinese, Korean, Spanish, French, German, Portuguese, Vietnamese, Hindi から選べます。たとえば日本のチームと働く海外のエンジニアなら、`English` → `Japanese` にします。学んでいる言語で書いたプロンプトには何も出しません。

## 費用とプライバシー

プロンプトを送るたびに、あなた自身の Claude Code のセッションと認証で Haiku を1回呼びます。それ以外の場所には何も送りません。呼び出しは裏で動くので、プロンプトの送信は待たされません。

## 関連

[nit](https://github.com/6igtree/nit): skill 版です。エージェントが英語を話す同僚として返答し、あなたが書いた英語をやさしく直します。nit-band とフレーズ帳を共有します。

## ライセンス

MIT
