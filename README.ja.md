# nit-band 💬

[English](./README.md) | **日本語**

**Claude Code の mod です。仕事をしながら外国語を学べます。送ったプロンプトごとに、入力欄の上でひとつだけ直します。**

コーディングエージェントには毎日プロンプトを書いています。nit-band は、それを学びたい言語の練習に変えます。会話のログには入らないので、エージェントの文脈や返答には影響しません。

## 見た目

英語を学んでいる人が、こう送ると:

> you should fix this bug, it is very bad code

エージェントが作業している間、入力欄の上に出ます:

```
nit: "you should fix this bug, it is very bad code" → "Could you fix this bug? The code needs some work." (Too blunt and vague; sounds like criticism rather than collaboration.)  [Save] [Hide]
```

日本語を学んでいる人が、こう送ると:

> could you check why the build is failing on main?

```
in Japanese: "mainのビルドが失敗している理由を確認してもらえますか？"  [Save] [Hide]
```

- 学んでいる言語で書いたとき: 直す価値があれば、**ひとつだけ直します**。
- ほかの言語で書いたとき: 学んでいる言語での**言い方**を出します。
- **Save** で `~/.nit/phrasebook.md` に保存します。**Hide** で消します。次のプロンプトを送っても消えます。

## 何を直すか

1回に1つだけ、次の順で選びます。

1. **意味**: 誤解されそうな言い回し
2. **トーン**: きつすぎる、失礼、または弱すぎる
3. **自然さ**: 正しいが、明らかに非ネイティブ

意味もトーンも変わらない小さなミスは直しません。コードブロック、インラインコード、スラッシュコマンド、12文字未満のプロンプトは対象外です。直した理由の説明は英語で出ます。

## インストール

Claude Code 2.1.287 以降（mods 対応版）が必要です。

```
/plugin marketplace add 6igtree/nit-band
/plugin install nit-band@nit-band
```

## 言語を選ぶ

初期設定は英語です。`/config` の **Language you are learning** に、学びたい言語の名前を入れてください（`Japanese`、`Spanish`、`German`、`Korean` など）。

## 費用とプライバシー

入力したプロンプトごとに、あなた自身の Claude Code セッションと認証で Haiku を1回呼びます。それ以外の場所には送りません。呼び出しは裏で動くので、プロンプトの送信が遅れることはありません。Haiku も間違えることがあり、使う人の少ない言語ほど起きやすいので、直しは提案として受け取ってください。

## 関連

[nit](https://github.com/6igtree/nit): 英語向けの skill 版です。エージェントが英語を話す同僚として返答します。自分の言語から英語のみまで4段階あります。nit-band とフレーズ帳を共有します。

## ライセンス

MIT
