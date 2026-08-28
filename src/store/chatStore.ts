import { create } from "zustand";
import { toast } from "sonner";
import { listModels, streamChat, type ChatTurn } from "@/lib/ollama";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatState {
  models: string[];
  model: string;
  messages: ChatMessage[];
  busy: boolean;
  online: boolean;
  refreshModels: () => Promise<void>;
  setModel: (model: string) => void;
  newChat: () => void;
  send: (text: string) => Promise<void>;
}

let nextId = 0;
function id(): string {
  nextId += 1;
  return String(nextId);
}

export const SYSTEM: ChatTurn = {
  role: "system",
  content:
    "You are Hearth, a local assistant running on the user's machine. Be concise. You are not Claude, ChatGPT, or Gemini.",
};

export const useChatStore = create<ChatState>((set, get) => ({
  models: [],
  model: "",
  messages: [],
  busy: false,
  online: false,

  setModel: (model) => set({ model }),

  newChat: () => set({ messages: [] }),

  refreshModels: async () => {
    try {
      const models = await listModels();
      const current = get().model;
      set({
        models,
        model: models.includes(current) ? current : (models[0] ?? ""),
        online: models.length > 0,
      });
    } catch {
      set({ models: [], online: false });
    }
  },

  send: async (text) => {
    const trimmed = text.trim();
    const { model, messages, busy } = get();
    if (trimmed === "" || busy) return;
    if (model === "") {
      toast.error("Start Ollama and pull a model first");
      return;
    }

    const user: ChatMessage = { id: id(), role: "user", content: trimmed };
    const assistant: ChatMessage = { id: id(), role: "assistant", content: "" };
    const prior = messages;
    set({ messages: [...prior, user, assistant], busy: true });

    const turns: ChatTurn[] = [
      SYSTEM,
      ...prior.map((message) => ({ role: message.role, content: message.content })),
      { role: "user", content: trimmed },
    ];

    try {
      await streamChat(model, turns, (token) => {
        const latest = get().messages;
        const last = latest[latest.length - 1];
        if (last === undefined || last.role !== "assistant") return;
        set({
          messages: [...latest.slice(0, -1), { ...last, content: last.content + token }],
        });
      });
    } catch {
      toast.error("Ollama did not answer. Is it running on this Mac?");
    } finally {
      set({ busy: false });
    }
  },
}));
