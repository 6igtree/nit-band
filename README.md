# nit-band 💬

**English** | [日本語](./README.ja.md)

**A Claude Code mod: learn a language while you work. One gentle fix for every prompt you send, right above the prompt.**

You write to your coding agent all day. nit-band turns those prompts into practice in the language you are learning. It stays out of the transcript, so your agent's context and replies are untouched.

## What it looks like

Learning English, you send:

> you should fix this bug, it is very bad code

Above the prompt, while your agent works:

```
nit: "you should fix this bug, it is very bad code" → "Could you fix this bug? The code needs some work." (Too blunt and vague; sounds like criticism rather than collaboration.)  [Save] [Hide]
```

Learning Japanese, you send:

> could you check why the build is failing on main?

```
in Japanese: "mainのビルドが失敗している理由を確認してもらえますか？"  [Save] [Hide]
```

- Write in the language you are learning: you get **one fix**, when one matters.
- Write in any other language: you get **how to say it** in the language you are learning.
- **Save** adds the phrase to `~/.nit/phrasebook.md`. **Hide** clears it. Your next prompt clears it too.

## What it picks

At most one fix per prompt, in this order:

1. **Meaning**: a phrase that could be misunderstood.
2. **Tone**: too blunt, rude, or too weak for a teammate.
3. **Naturalness**: correct, but clearly non-native.

Small slips that change neither meaning nor tone are skipped. Code blocks, inline code, slash commands and prompts under 12 characters are ignored. Explanations are in English.

## Install

Requires Claude Code 2.1.287 or later (mods).

```
/plugin marketplace add 6igtree/nit-band
/plugin install nit-band@nit-band
```

## Choose a language

English by default. Set **Language you are learning** in `/config` to any language name: `Japanese`, `Spanish`, `German`, `Korean`, ...

## Cost and privacy

Each prompt you type is sent to Haiku once, through your own Claude Code session and credentials. Nothing goes anywhere else. The call runs in the background and never delays your prompt. Haiku can still slip, especially in less common languages, so treat a fix as a suggestion.

## See also

[nit](https://github.com/6igtree/nit): the skill version for English. Your agent replies as an English-speaking teammate, with four levels from your own language to English only. nit-band shares its phrasebook.

## License

MIT
