# Hearth

Your own AI chat. It runs on **this Mac**, talks to
[Ollama](https://ollama.com), and never sends a prompt to Anthropic, OpenAI, or
Google.

This is not a secret clone of Claude. Nobody trains a frontier model overnight.
Hearth is the honest version: an open-source window you own, plus open weights
you download once. After that, the meter is off.

**React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS 4 · Zustand · Vitest ·
Playwright**

---

## Why this exists

Renting ChatGPT / Claude / Gemini is a subscription on someone else's GPU.
Hearth's loop is:

1. Ollama serves a local model (`llama3.2`, `phi3`, `qwen2.5`, …).
2. Vite proxies `/ollama` → `127.0.0.1:11434` so the browser skips CORS.
3. The chat UI streams tokens into the Mac window.

The match rule of Kindred lived in one file. The Ollama client here lives in
[`src/lib/ollama.ts`](src/lib/ollama.ts). Fork it.

---

## Author

### Alghisi Alessandro Paolo

Senior Software Engineer · Cluj-Napoca, Romania

**Twice a Google Software Engineering Intern** — Chrome (Kitchener / Waterloo)
and Logs (Mountain View).

|          |                                                                                         |
| -------- | --------------------------------------------------------------------------------------- |
| GitHub   | [github.com/alexalghisi](https://github.com/alexalghisi)                                |
| LinkedIn | [linkedin.com/in/alghisi](https://www.linkedin.com/in/alghisi)                          |
| Email    | [alessandro@onlineparentingprograms.com](mailto:alessandro@onlineparentingprograms.com) |
| Location | Cluj-Napoca, Romania · open to remote / EU / US-friendly timezones                      |

**Hiring?** Open an issue, message me on LinkedIn, or email
[alessandro@onlineparentingprograms.com](mailto:alessandro@onlineparentingprograms.com).

---

## Getting started

Requires Node 22 and [Ollama](https://ollama.com).

```bash
brew install ollama
ollama serve
ollama pull llama3.2

cd Hearth
npm install
npm run dev          # http://localhost:5177
```

Open the Mac window. Pick the model. Type. Contact sits under the chrome.

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run e2e
npm run build
```

E2E does not need a live Ollama — Playwright stubs `/ollama`.

## License

MIT · © Alghisi Alessandro Paolo
