import { test, expect } from "@playwright/test";

test.describe("Study session", () => {
  test("shows Italian on front and progress", async ({ page }) => {
    await page.goto("/study/animals");
    await expect(page.getByText("Card 1 of 4")).toBeVisible();
    await expect(page.getByText("Click to flip")).toBeVisible();
    // First card in animals is "il gatto"
    await expect(page.getByText("il gatto")).toBeVisible();
  });

  test("flip reveals English and Right/Wrong buttons", async ({ page }) => {
    await page.goto("/study/animals");
    await expect(page.getByText("il gatto")).toBeVisible();
    await expect(page.getByRole("button", { name: "Right" })).not.toBeVisible();

    await page.getByRole("button", { name: "Show English" }).click();

    await expect(page.getByText("the cat")).toBeVisible();
    await expect(page.getByRole("button", { name: "I got it right" })).toBeVisible();
    await expect(page.getByRole("button", { name: "I got it wrong" })).toBeVisible();
  });

  test("Right advances to next card", async ({ page }) => {
    await page.goto("/study/animals");
    await expect(page.getByText("Card 1 of 4")).toBeVisible();
    await page.getByRole("button", { name: "Show English" }).click();
    await page.getByRole("button", { name: "I got it right" }).click();

    await expect(page.getByText("Card 2 of 4")).toBeVisible();
    await expect(page.getByText("il cane")).toBeVisible();
  });

  test("Wrong advances to next card and tracks wrong count", async ({ page }) => {
    await page.goto("/study/animals");
    await page.getByRole("button", { name: "Show English" }).click();
    await page.getByRole("button", { name: "I got it wrong" }).click();

    await expect(page.getByText("Card 2 of 4")).toBeVisible();
    await page.getByRole("button", { name: "Show English" }).click();
    await page.getByRole("button", { name: "I got it wrong" }).click();

    await expect(page.getByText("Card 3 of 4")).toBeVisible();
  });

  test("completing all cards shows session complete", async ({ page }) => {
    await page.goto("/study/animals");
    const totalCards = 4;
    for (let i = 0; i < totalCards; i++) {
      await expect(page.getByText(`Card ${i + 1} of ${totalCards}`)).toBeVisible();
      await page.getByRole("button", { name: "Show English" }).click();
      await page.getByRole("button", { name: "I got it right" }).click();
    }
    await expect(page.getByRole("heading", { name: "Session complete" })).toBeVisible();
    await expect(page.getByText(/You reviewed 4 cards/)).toBeVisible();
    await expect(page.getByRole("link", { name: "Study another category" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to Home" })).toBeVisible();
  });

  test("session complete shows wrong count when some marked wrong", async ({ page }) => {
    await page.goto("/study/animals");
    await page.getByRole("button", { name: "Show English" }).click();
    await page.getByRole("button", { name: "I got it wrong" }).click();
    for (let i = 0; i < 3; i++) {
      await page.getByRole("button", { name: "Show English" }).click();
      await page.getByRole("button", { name: "I got it right" }).click();
    }
    await expect(page.getByRole("heading", { name: "Session complete" })).toBeVisible();
    await expect(page.getByText(/1 marked as wrong/)).toBeVisible();
  });

  test("invalid category shows message and link", async ({ page }) => {
    await page.goto("/study/invalid");
    await expect(page.getByText("Invalid category.")).toBeVisible();
    await expect(page.getByRole("link", { name: "Choose category" })).toBeVisible();
  });

  test("Back to categories link returns to category selection", async ({ page }) => {
    await page.goto("/study/animals");
    await page.getByRole("link", { name: /Back to categories/ }).click();
    await expect(page).toHaveURL("/study/category");
    await expect(page.getByRole("heading", { name: "Study Mode" })).toBeVisible();
  });
});
