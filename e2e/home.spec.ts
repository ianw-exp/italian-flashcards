import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("displays welcome and main navigation", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Italian Flashcards" })).toBeVisible();
    await expect(page.getByText("Welcome! Choose how you want to practice.")).toBeVisible();
    await expect(page.getByRole("link", { name: "Study Mode" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Quiz Mode" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Stats Page" })).toBeVisible();
  });

  test("Study Mode link goes to category selection", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Study Mode" }).click();
    await expect(page).toHaveURL(/\/study\/category/);
    await expect(page.getByRole("heading", { name: "Study Mode" })).toBeVisible();
  });

  test("Quiz Mode link goes to quiz category selection", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Quiz Mode" }).click();
    await expect(page).toHaveURL(/\/quiz\/category/);
    await expect(page.getByRole("heading", { name: "Quiz Mode" })).toBeVisible();
  });

  test("Stats Page link goes to statistics page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Stats Page" }).click();
    await expect(page).toHaveURL("/stats");
    await expect(page.getByRole("heading", { name: "Statistics" })).toBeVisible();
  });
});
