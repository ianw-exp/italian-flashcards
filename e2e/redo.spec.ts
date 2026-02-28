import { test, expect } from "@playwright/test";

test.describe("Redo mode (Phase 3)", () => {
  test("after study with wrong cards, Redo wrong cards button appears and starts redo session", async ({
    page,
  }) => {
    await page.goto("/study/animals");
    await page.getByRole("button", { name: "Show English" }).click();
    await page.getByRole("button", { name: "I got it wrong" }).click();
    for (let i = 0; i < 3; i++) {
      await page.getByRole("button", { name: "Show English" }).click();
      await page.getByRole("button", { name: "I got it right" }).click();
    }
    await expect(page.getByRole("heading", { name: "Session complete" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Redo wrong cards" })).toBeVisible();
    await page.getByRole("link", { name: "Redo wrong cards" }).click();
    await expect(page).toHaveURL("/study/redo");
    await expect(page.getByRole("heading", { name: "Redo wrong cards" })).toBeVisible();
    await expect(page.getByText("Card 1 of 1")).toBeVisible();
    await expect(page.getByText("il gatto")).toBeVisible();
  });

  test("redo session shows only previously failed cards and reuses Flashcard UI", async ({
    page,
  }) => {
    await page.goto("/study/animals");
    await page.getByRole("button", { name: "Show English" }).click();
    await page.getByRole("button", { name: "I got it wrong" }).click();
    await page.getByRole("button", { name: "Show English" }).click();
    await page.getByRole("button", { name: "I got it wrong" }).click();
    for (let i = 0; i < 2; i++) {
      await page.getByRole("button", { name: "Show English" }).click();
      await page.getByRole("button", { name: "I got it right" }).click();
    }
    await page.getByRole("link", { name: "Redo wrong cards" }).click();
    await expect(page.getByText("Card 1 of 2")).toBeVisible();
    await expect(page.getByText("il gatto")).toBeVisible();
    await page.getByRole("button", { name: "Show English" }).click();
    await expect(page.getByText("the cat")).toBeVisible();
    await expect(page.getByRole("button", { name: "I got it right" })).toBeVisible();
    await expect(page.getByRole("button", { name: "I got it wrong" })).toBeVisible();
  });

  test("Reset wrong list clears stored wrong cards", async ({ page }) => {
    await page.goto("/study/animals");
    await page.getByRole("button", { name: "Show English" }).click();
    await page.getByRole("button", { name: "I got it wrong" }).click();
    for (let i = 0; i < 3; i++) {
      await page.getByRole("button", { name: "Show English" }).click();
      await page.getByRole("button", { name: "I got it right" }).click();
    }
    await expect(page.getByRole("link", { name: "Redo wrong cards" })).toBeVisible();
    await page.getByRole("button", { name: "Reset wrong list" }).click();
    await page.getByRole("link", { name: "Back to Home" }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("link", { name: "Redo wrong cards" })).not.toBeVisible();
    await page.goto("/study/redo");
    await expect(page.getByText("No wrong cards to redo")).toBeVisible();
  });

  test("redo with no wrong cards shows empty message", async ({ page }) => {
    await page.goto("/study/redo");
    await expect(
      page.getByText("No wrong cards to redo. Complete a study session and mark some as wrong first.")
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Study a category" })).toBeVisible();
  });
});
