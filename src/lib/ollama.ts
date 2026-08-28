export const OLLAMA_PREFIX = "/ollama";

export interface ChatTurn {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OllamaModel {
  name: string;
}

interface TagsResponse {
  models: OllamaModel[];
}

interface ChatChunk {
  message?: { content?: string };
  done?: boolean;
  error?: string;
}

export function modelNames(payload: TagsResponse): string[] {
  return payload.models.map((model) => model.name);
}

export function chunkText(payload: ChatChunk): string {
  return payload.message?.content ?? "";
}

export async function listModels(fetcher: typeof fetch = fetch): Promise<string[]> {
  const response = await fetcher(`${OLLAMA_PREFIX}/api/tags`);
  if (!response.ok) throw new Error("Ollama is not reachable");
  const payload = (await response.json()) as TagsResponse;
  return modelNames(payload);
}

export async function streamChat(
  model: string,
  messages: ChatTurn[],
  onToken: (text: string) => void,
  fetcher: typeof fetch = fetch,
): Promise<void> {
  const response = await fetcher(`${OLLAMA_PREFIX}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages, stream: true }),
  });

  if (!response.ok || response.body === null) {
    throw new Error("Ollama is not reachable");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (line.trim() === "") continue;
      const payload = JSON.parse(line) as ChatChunk;
      if (payload.error !== undefined) throw new Error(payload.error);
      const text = chunkText(payload);
      if (text !== "") onToken(text);
    }
  }
}
