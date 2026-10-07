# nit-band 💬

**English** | [日本語](./README.ja.md)

**A Claude Code mod: learn to say your daily work in the language you want to work in.**

You already describe your work to your coding agent all day, in your own language. nit-band shows each prompt the way a teammate would say it in the language you are learning, plus the one expression worth learning. Save the ones you like, and your phrasebook becomes the vocabulary of your own job. Japanese → English by default.

It stays out of the transcript, so your agent's context and replies are untouched.

## What it looks like

You send:

> 昨日のデプロイ以降エラーが増えているので、原因と影響範囲を調べて

Above the prompt, while your agent works:

```
in English: "Errors have spiked since yesterday's deploy. Can you investigate the root cause and blast radius?"  [Save] [Hide]
key: 影響範囲 → blast radius
```

- **Save** adds it to `~/.nit/phrasebook.md`.
- **Hide** clears it. Your next prompt clears it too.

Prompts already in English, slash commands, code and very short prompts are skipped.

## Install

Requires Claude Code 2.1.287 or later (mods).

```
/plugin marketplace add 6igtree/nit-band
/plugin install nit-band@nit-band
```

## Languages

Japanese → English by default. Change both in `/config`:

- **Language you work in**: the language you usually write prompts in (default `Japanese`).
- **Language you are learning**: the language nit-band shows them in (default `English`).

Pick from English, Japanese, Chinese, Korean, Spanish, French, German, Portuguese, Vietnamese and Hindi; for example `English` → `Japanese` for engineers abroad working with a team in Japan. Prompts already in the language you are learning are skipped.

## Cost and privacy

Each prompt you type is sent to Haiku once, through your own Claude Code session and credentials. Nothing goes anywhere else. The call runs in the background and never delays your prompt.

## See also

[nit](https://github.com/6igtree/nit): the skill version. Your agent replies as an English-speaking teammate and gently fixes the English you write. nit-band shares its phrasebook.

## License

MIT
