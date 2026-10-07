# nit-band 💬

**English** | [日本語](./README.ja.md)

**A Claude Code mod: one gentle English nit for every prompt you send, right above the prompt.**

You write to your coding agent in English all day. nit-band reads each prompt you send and, when something matters, shows how a teammate would say it. It stays out of the transcript, so your agent's context and replies are untouched.

## What it looks like

You send:

> you should fix this bug, it is very bad code

Above the prompt, while your agent works:

```
nit: "you should fix this bug, it is very bad code" → "Could you fix this bug? The code needs improvement." (softer for a teammate)  [Save] [Hide]
```

Write in your own language and you get the English version instead:

```
in English: "Could you review this PR? It would help if you could take a look by tomorrow."  [Save] [Hide]
```

- **Save** adds the phrase to `~/.nit/phrasebook.md`.
- **Hide** clears it. Your next prompt clears it too.

## What it picks

At most one fix per prompt, in this order:

1. **Meaning**: a phrase that could be misunderstood.
2. **Tone**: too blunt, rude, or too weak for a teammate.
3. **Naturalness**: correct, but clearly non-native.

Small slips that change neither meaning nor tone (a missing article, a typo) are skipped. Code blocks, inline code, slash commands and prompts under 12 characters are ignored.

## Install

Requires Claude Code 2.1.287 or later (mods).

```
/plugin marketplace add 6igtree/nit-band
/plugin install nit-band@nit-band
```

## Cost and privacy

Each prompt you type is sent to Haiku once, through your own Claude Code session and credentials. Nothing goes anywhere else. The call runs in the background and never delays your prompt.

## See also

[nit](https://github.com/6igtree/nit): the skill version. Your agent replies as an English-speaking teammate and adds the nit line to its answers, with four levels from your own language to English only. nit-band shares its phrasebook.

## License

MIT
