import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/ollama/api/tags", async (route) => {
    await route.fulfill({
      json: { models: [{ name: "llama3.2:latest" }] },
    });
  });
  await page.route("**/ollama/api/chat", async (route) => {
    await route.fulfill({
      body: '{"message":{"content":"Hearth is local."}}\n{"done":true}\n',
      contentType: "application/x-ndjson",
    });
  });
});

test("streams a local reply and shows author contact", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Hearth" })).toBeVisible();
  await expect(page.getByTestId("author-credit")).toContainText("Alghisi Alessandro Paolo");
  await expect(page.getByTestId("select-model")).toHaveValue("llama3.2:latest");

  await page.getByTestId("input-prompt").fill("Who are you?");
  await page.getByTestId("button-send").click();

  await expect(page.getByText("Who are you?")).toBeVisible();
  await expect(page.getByText("Hearth is local.")).toBeVisible();
});
