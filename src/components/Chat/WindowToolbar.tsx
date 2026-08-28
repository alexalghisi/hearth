import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chatStore";

export function WindowToolbar() {
  const models = useChatStore((state) => state.models);
  const model = useChatStore((state) => state.model);
  const setModel = useChatStore((state) => state.setModel);
  const newChat = useChatStore((state) => state.newChat);
  const refreshModels = useChatStore((state) => state.refreshModels);
  const online = useChatStore((state) => state.online);

  return (
    <header className="flex shrink-0 items-center gap-3 border-b border-black/5 bg-titlebar px-3 py-2">
      <div className="flex items-center gap-1.5" aria-hidden>
        <span className="h-3 w-3 rounded-full bg-[#FF5F57] ring-1 ring-black/10" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E] ring-1 ring-black/10" />
        <span className="h-3 w-3 rounded-full bg-[#28C840] ring-1 ring-black/10" />
      </div>
      <h1 className="flex-1 text-center text-[13px] font-semibold tracking-tight text-foreground/80">
        Hearth
      </h1>
      <div className="flex items-center gap-1">
        <select
          aria-label="Model"
          data-testid="select-model"
          className="h-7 max-w-48 rounded-md border border-input bg-background px-2 text-[12px]"
          value={model}
          onChange={(event) => setModel(event.target.value)}
        >
          {models.length === 0 ? (
            <option value="">No local model</option>
          ) : (
            models.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))
          )}
        </select>
        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-md px-2 text-[12px]"
          onClick={() => void refreshModels()}
          data-testid="button-refresh"
        >
          {online ? "Refresh" : "Connect"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-md px-2 text-[12px]"
          onClick={newChat}
          data-testid="button-new-chat"
        >
          New chat
        </Button>
      </div>
    </header>
  );
}
