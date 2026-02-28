import { test, expect } from "@playwright/test";

test.describe("Category selection", () => {
  test("Study mode shows all three categories", async ({ page }) => {
    await page.goto("/study/category");
    await expect(page.getByRole("heading", { name: "Study Mode" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Animals" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Food" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Verbs" })).toBeVisible();
  });

  test("clicking Animals starts study session for animals", async ({ page }) => {
    await page.goto("/study/category");
    await page.getByRole("link", { name: "Animals" }).click();
    await expect(page).toHaveURL("/study/animals");
    await expect(page.getByText(/Card 1 of \d+/)).toBeVisible();
  });

  test("clicking Food starts study session for food", async ({ page }) => {
    await page.goto("/study/category");
    await page.getByRole("link", { name: "Food" }).click();
    await expect(page).toHaveURL("/study/food");
    await expect(page.getByText(/Card 1 of \d+/)).toBeVisible();
  });

  test("clicking Verbs starts study session for verbs", async ({ page }) => {
    await page.goto("/study/category");
    await page.getByRole("link", { name: "Verbs" }).click();
    await expect(page).toHaveURL("/study/verbs");
    await expect(page.getByText(/Card 1 of \d+/)).toBeVisible();
  });

  test("Back to Home link returns to home", async ({ page }) => {
    await page.goto("/study/category");
    await page.getByRole("link", { name: /Back to Home/ }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: "Italian Flashcards" })).toBeVisible();
  });
});
