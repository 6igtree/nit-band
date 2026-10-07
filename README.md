# nit-band 💬

**English** | [日本語](./README.ja.md)

**A Claude Code mod for engineers in Japan: write your prompts in Japanese, and see how engineers abroad would say them, right above the prompt.**

You already describe your work to your coding agent all day, in Japanese. nit-band shows the same request in natural workplace English, plus the one expression worth learning. Save the ones you like, and your phrasebook becomes the English of your own job.

It stays out of the transcript, so your agent's context and replies are untouched.

## What it looks like

You send:

> 本番で障害が出たので、昨日のデプロイを切り戻して影響範囲を調べて

Above the prompt, while your agent works:

```
in English: "We have a production incident. Can you roll back yesterday's deploy and check the blast radius?"  [Save] [Hide]
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

Any language name works, for example `English` → `Japanese` for engineers abroad working with a team in Japan. Prompts already in the language you are learning are skipped.

## Cost and privacy

Each prompt you type is sent to Haiku once, through your own Claude Code session and credentials. Nothing goes anywhere else. The call runs in the background and never delays your prompt.

## See also

[nit](https://github.com/6igtree/nit): the skill version. Your agent replies as an English-speaking teammate and gently fixes the English you write. nit-band shares its phrasebook.

## License

MIT
