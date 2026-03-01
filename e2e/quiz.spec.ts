import { test, expect } from "@playwright/test";

test.describe("Quiz Mode (Phase 4)", () => {
  test("QuizSelectionPage shows quiz types and categories", async ({ page }) => {
    await page.goto("/quiz/category");
    await expect(page.getByRole("heading", { name: "Quiz Mode" })).toBeVisible();
    await expect(page.getByText("Multiple Choice")).toBeVisible();
    await expect(page.getByText("Fill in the Blank")).toBeVisible();
    await expect(page.getByRole("link", { name: "Animals" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Food" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Verbs" }).first()).toBeVisible();
  });

  test("Multiple Choice: Italian word shown, 4 options, immediate feedback", async ({
    page,
  }) => {
    await page.goto("/quiz/animals/multiple-choice");
    await expect(page.getByText("Question 1 of 4")).toBeVisible();
    await expect(page.getByText("il gatto")).toBeVisible();
    const options = page.getByRole("option");
    await expect(options).toHaveCount(4);
    await page.getByRole("option", { name: "the cat" }).click();
    await expect(page.getByText("Correct!")).toBeVisible();
    await expect(page.getByRole("button", { name: "Next question" })).toBeVisible();
  });

  test("Multiple Choice: wrong selection shows feedback and correct answer", async ({
    page,
  }) => {
    await page.goto("/quiz/animals/multiple-choice");
    await expect(page.getByText("il gatto")).toBeVisible();
    await page.getByRole("option", { name: "the dog" }).click();
    await expect(page.getByText(/Wrong — the answer was: the cat/)).toBeVisible();
    await expect(page.getByRole("button", { name: "Next question" })).toBeVisible();
  });

  test("Fill in the Blank: Italian prompt, input, case-insensitive correct", async ({
    page,
  }) => {
    await page.goto("/quiz/animals/fill-in-blank");
    await expect(page.getByText("Question 1 of 4")).toBeVisible();
    await expect(page.getByText("il gatto")).toBeVisible();
    await expect(page.getByPlaceholder("Type in English...")).toBeVisible();
    await page.getByPlaceholder("Type in English...").fill("THE CAT");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("Correct!")).toBeVisible();
  });

  test("Fill in the Blank: wrong answer shows feedback with correct answer", async ({
    page,
  }) => {
    await page.goto("/quiz/animals/fill-in-blank");
    await expect(page.getByText("il gatto")).toBeVisible();
    await page.getByPlaceholder("Type in English...").fill("the dog");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText(/Wrong — the answer was: the cat/)).toBeVisible();
  });

  test("Fill in the Blank: case-insensitive match accepts lowercase", async ({
    page,
  }) => {
    await page.goto("/quiz/food/fill-in-blank");
    await expect(page.getByText("la mela")).toBeVisible();
    await page.getByPlaceholder("Type in English...").fill("the apple");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("Correct!")).toBeVisible();
  });

  test("Quiz complete after all questions", async ({ page }) => {
    await page.goto("/quiz/verbs/multiple-choice");
    const total = 4;
    for (let i = 0; i < total; i++) {
      await expect(page.getByText(`Question ${i + 1} of ${total}`)).toBeVisible();
      await page.getByRole("option").first().click();
      await expect(page.getByRole("button", { name: "Next question" })).toBeVisible();
      await page.getByRole("button", { name: "Next question" }).click();
    }
    await expect(page.getByRole("heading", { name: "Quiz complete" })).toBeVisible();
    await expect(page.getByText(/You answered all 4 questions/)).toBeVisible();
  });
});
