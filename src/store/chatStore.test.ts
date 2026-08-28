import { beforeEach, describe, expect, it, vi } from "vitest";
import { useChatStore } from "./chatStore";

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock("@/lib/ollama", () => ({
  listModels: vi.fn(async () => ["llama3.2:latest"]),
  streamChat: vi.fn(async (_model: string, _turns: unknown, onToken: (text: string) => void) => {
    onToken("Hello from Hearth");
  }),
}));

beforeEach(() => {
  useChatStore.setState({
    models: [],
    model: "",
    messages: [],
    busy: false,
    online: false,
  });
});

describe("refreshModels", () => {
  it("selects the first local model", async () => {
    await useChatStore.getState().refreshModels();
    expect(useChatStore.getState().model).toBe("llama3.2:latest");
    expect(useChatStore.getState().online).toBe(true);
  });
});

describe("send", () => {
  it("appends the user turn and streams the reply", async () => {
    useChatStore.setState({ model: "llama3.2:latest" });
    await useChatStore.getState().send("  hi  ");
    const messages = useChatStore.getState().messages;
    expect(messages[0]?.content).toBe("hi");
    expect(messages[1]?.content).toBe("Hello from Hearth");
    expect(useChatStore.getState().busy).toBe(false);
  });

  it("ignores a blank prompt", async () => {
    useChatStore.setState({ model: "llama3.2:latest" });
    await useChatStore.getState().send("   ");
    expect(useChatStore.getState().messages).toEqual([]);
  });
});
