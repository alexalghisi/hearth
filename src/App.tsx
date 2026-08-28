import { useEffect } from "react";
import { Toaster } from "sonner";
import { AuthorCredit } from "@/components/AuthorCredit";
import { Composer } from "@/components/Chat/Composer";
import { Transcript } from "@/components/Chat/Transcript";
import { WindowToolbar } from "@/components/Chat/WindowToolbar";
import { useChatStore } from "@/store/chatStore";

export default function App() {
  const refreshModels = useChatStore((state) => state.refreshModels);

  useEffect(() => {
    void refreshModels();
  }, [refreshModels]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-desktop p-4 md:p-10">
      <Toaster richColors position="bottom-right" />
      <div
        data-testid="finder-window"
        className="flex h-[min(780px,85vh)] w-full max-w-6xl flex-col overflow-hidden rounded-[12px] border border-black/10 bg-card shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_24px_80px_rgba(0,0,0,0.28)]"
      >
        <WindowToolbar />
        <Transcript />
        <Composer />
      </div>
      <AuthorCredit />
    </div>
  );
}
