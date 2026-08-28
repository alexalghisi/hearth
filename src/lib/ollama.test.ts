import { describe, expect, it, vi } from "vitest";
import { chunkText, listModels, modelNames, streamChat } from "./ollama";

describe("modelNames", () => {
  it("reads the tag list", () => {
    expect(modelNames({ models: [{ name: "llama3.2:latest" }, { name: "phi3:mini" }] })).toEqual([
      "llama3.2:latest",
      "phi3:mini",
    ]);
  });
});

describe("chunkText", () => {
  it("pulls the delta out of an Ollama line", () => {
    expect(chunkText({ message: { content: "Hi" }, done: false })).toBe("Hi");
    expect(chunkText({ done: true })).toBe("");
  });
});

describe("listModels", () => {
  it("calls /ollama/api/tags", async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ models: [{ name: "llama3.2:latest" }] }),
    });
    await expect(listModels(fetcher as unknown as typeof fetch)).resolves.toEqual([
      "llama3.2:latest",
    ]);
  });
});

describe("streamChat", () => {
  it("forwards streamed tokens", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('{"message":{"content":"Hel"}}\n'));
        controller.enqueue(encoder.encode('{"message":{"content":"lo"}}\n'));
        controller.close();
      },
    });
    const fetcher = vi.fn().mockResolvedValue({ ok: true, body: stream });
    const tokens: string[] = [];
    await streamChat(
      "llama3.2:latest",
      [{ role: "user", content: "hi" }],
      (text) => tokens.push(text),
      fetcher,
    );
    expect(tokens.join("")).toBe("Hello");
  });
});
