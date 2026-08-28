import { useChatStore } from "@/store/chatStore";

export function Transcript() {
  const messages = useChatStore((state) => state.messages);
  const online = useChatStore((state) => state.online);
  const busy = useChatStore((state) => state.busy);

  if (messages.length === 0) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2 px-8 text-center">
        <p className="text-[16px] font-medium">This Mac is the datacenter</p>
        <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
          {online
            ? "Ask anything. Tokens stay on this machine — no Claude, ChatGPT, or Gemini bill."
            : "Install Ollama, pull a model, then hit Connect. Example: ollama pull llama3.2"}
        </p>
      </div>
    );
  }

  return (
    <ol className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
      {messages.map((message) => (
        <li
          key={message.id}
          data-testid={`msg-${message.role}-${message.id}`}
          className={
            message.role === "user"
              ? "ml-12 rounded-2xl bg-primary px-4 py-2.5 text-[14px] text-primary-foreground"
              : "mr-12 rounded-2xl bg-secondary px-4 py-2.5 text-[14px]"
          }
        >
          {message.content === "" && busy && message.role === "assistant" ? "…" : message.content}
        </li>
      ))}
    </ol>
  );
}
