import { test, expect } from "@playwright/test";

test.describe("Statistics Page (Phase 5)", () => {
  test("empty stats shows message to start studying", async ({ page }) => {
    await page.goto("/stats");
    await expect(page.getByRole("heading", { name: "Statistics" })).toBeVisible();
    await expect(
      page.getByText(/No cards studied yet. Start with Study Mode or Quiz Mode/)
    ).toBeVisible();
  });

  test("study session increments stats and shows on Stats page", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("italian-flashcards-stats"));
    await page.goto("/study/animals");
    await page.getByRole("button", { name: "Show English" }).click();
    await page.getByRole("button", { name: "I got it right" }).click();
    await page.getByRole("button", { name: "Show English" }).click();
    await page.getByRole("button", { name: "I got it wrong" }).click();
    for (let i = 0; i < 2; i++) {
      await page.getByRole("button", { name: "Show English" }).click();
      await page.getByRole("button", { name: "I got it right" }).click();
    }
    await page.goto("/stats");
    await expect(page.getByText(/Total cards studied: 4/)).toBeVisible();
    await expect(page.getByText(/Correct: 3/)).toBeVisible();
    await expect(page.getByText(/Incorrect: 1/)).toBeVisible();
    await expect(page.getByText(/Accuracy: 75%/)).toBeVisible();
    await expect(page.getByText(/Animals.*4 studied.*3 correct.*75%/)).toBeVisible();
  });

  test("stats persist after browser refresh (localStorage)", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("italian-flashcards-stats"));
    await page.goto("/quiz/animals/multiple-choice");
    await page.getByRole("option", { name: "the cat" }).click();
    await page.getByRole("button", { name: "Next question" }).click();
    await page.goto("/stats");
    await expect(page.getByText(/Total cards studied: 1/)).toBeVisible();
    await page.reload();
    await expect(page.getByText(/Total cards studied: 1/)).toBeVisible();
  });

  test("stats breakdown by category", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("italian-flashcards-stats"));
    await page.goto("/study/animals");
    await page.getByRole("button", { name: "Show English" }).click();
    await page.getByRole("button", { name: "I got it right" }).click();
    await page.goto("/study/food");
    await page.getByRole("button", { name: "Show English" }).click();
    await page.getByRole("button", { name: "I got it wrong" }).click();
    await page.goto("/stats");
    await expect(page.getByText(/Total cards studied: 2/)).toBeVisible();
    await expect(page.getByText(/Animals.*1 studied.*1 correct.*100%/)).toBeVisible();
    await expect(page.getByText(/Food.*1 studied.*0 correct.*0%/)).toBeVisible();
  });

  test("quiz answers are counted in stats", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("italian-flashcards-stats"));
    await page.goto("/quiz/verbs/multiple-choice");
    await page.getByRole("option", { name: "to eat" }).click();
    await page.getByRole("button", { name: "Next question" }).click();
    await page.getByRole("option", { name: "to drink" }).click();
    await page.getByRole("button", { name: "Next question" }).click();
    await page.getByRole("option", { name: "to wake" }).click();
    await page.getByRole("button", { name: "Next question" }).click();
    await page.goto("/stats");
    await expect(page.getByText(/Total cards studied: 3/)).toBeVisible();
    await expect(page.getByText(/Correct: 2/)).toBeVisible();
    await expect(page.getByText(/Incorrect: 1/)).toBeVisible();
    await expect(page.getByText(/Verbs.*3 studied.*2 correct/)).toBeVisible();
  });

  test("redo session answers are counted in stats", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("italian-flashcards-stats"));
    await page.goto("/study/animals");
    await page.getByRole("button", { name: "Show English" }).click();
    await page.getByRole("button", { name: "I got it wrong" }).click();
    for (let i = 0; i < 3; i++) {
      await page.getByRole("button", { name: "Show English" }).click();
      await page.getByRole("button", { name: "I got it right" }).click();
    }
    await page.getByRole("link", { name: "Redo wrong cards" }).click();
    await page.getByRole("button", { name: "Show English" }).click();
    await page.getByRole("button", { name: "I got it right" }).click();
    await page.goto("/stats");
    await expect(page.getByText(/Total cards studied: 5/)).toBeVisible();
    await expect(page.getByText(/Correct: 4/)).toBeVisible();
    await expect(page.getByText(/Incorrect: 1/)).toBeVisible();
  });
});
