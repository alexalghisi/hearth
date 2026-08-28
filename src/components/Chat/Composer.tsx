import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chatStore";

export function Composer() {
  const send = useChatStore((state) => state.send);
  const busy = useChatStore((state) => state.busy);
  const [draft, setDraft] = useState("");

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    const text = draft;
    setDraft("");
    void send(text);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <form
      className="flex shrink-0 items-end gap-2 border-t border-black/5 bg-titlebar px-3 py-2"
      onSubmit={submit}
    >
      <textarea
        data-testid="input-prompt"
        aria-label="Message"
        rows={2}
        value={draft}
        disabled={busy}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Message Hearth…"
        className="min-h-11 flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-[14px] outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
      <Button
        type="submit"
        className="h-11 rounded-md px-4"
        disabled={busy}
        data-testid="button-send"
      >
        Send
      </Button>
    </form>
  );
}
