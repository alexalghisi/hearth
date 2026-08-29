# Hearth

A local-first chat client for [Ollama](https://ollama.com). Inference runs on
the machine that opened the window. Prompts are not sent to Anthropic, OpenAI,
or Google.

Hearth does not claim to be a frontier model. It is the honest architecture:
open weights you download once, a Vite proxy past CORS, and a streaming UI you
can read.

**React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS 4 · Zustand · Vitest ·
Playwright**

---

## Architecture

1. Ollama serves a local model (`llama3.2`, `phi3`, `qwen2.5`, and others).
2. Vite proxies `/ollama` → `127.0.0.1:11434`.
3. The client in [`src/lib/ollama.ts`](src/lib/ollama.ts) streams tokens into the Mac window.

---

## Author

### Alessandro Alghisi

Senior Software Engineer · Cluj-Napoca, Romania

**Twice a Google Software Engineering Intern** — Chrome (Kitchener / Waterloo)
and Logs (Mountain View).

|          |                                                                                         |
| -------- | --------------------------------------------------------------------------------------- |
| GitHub   | [github.com/alexalghisi](https://github.com/alexalghisi)                                |
| LinkedIn | [linkedin.com/in/alghisi](https://www.linkedin.com/in/alghisi)                          |
| Email    | [alexalghisi@gmail.com](mailto:alexalghisi@gmail.com)                                   |
| Location | Cluj-Napoca, Romania · open to remote / EU / US-friendly timezones                      |

**Hiring?** Open an issue, message me on LinkedIn, or email
[alexalghisi@gmail.com](mailto:alexalghisi@gmail.com).

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

MIT · © Alessandro Alghisi
