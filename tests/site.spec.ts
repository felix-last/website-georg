import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("editorial page is accessible, local and responsive", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const external: string[] = [];
  page.on("request", (request) => {
    if (!new URL(request.url()).hostname.match(/^(127\.0\.0\.1|localhost)$/))
      external.push(request.url());
  });
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Georg Schmeistenbeißer",
  );
  await expect(
    page.getByRole("heading", { name: /Wissenschaft\.\s*Praxis\.\s*Mensch\./ }),
  ).toBeVisible();
  await page.locator("#kontakt").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("button", { name: "Anfrage senden" }),
  ).toBeDisabled();
  await expect(page.locator("#form-state")).toContainText("Entwicklungsstand");
  await expect(page.locator("#form-status")).toBeEmpty();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBe(false);
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  expect(external).toEqual([]);
});

test("keyboard menu and legal links work under the project base path", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  const menu = page.locator(".menu summary");
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("navigation", { name: "Hauptnavigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("navigation", { name: "Hauptnavigation" }),
  ).toBeHidden();
  await expect(menu).toBeFocused();
  await page.getByRole("link", { name: "Impressum", exact: true }).click();
  await expect(page).toHaveURL(/\/website-georg\/impressum\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Impressum");
  await expect(page.locator(".legal-warning")).toContainText(
    "nicht zur Veröffentlichung freigegeben",
  );
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.getByRole("link", { name: "Datenschutz", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Datenschutz",
  );
});

test.describe("configured form, with mocked external services", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.route(
      "https://challenges.cloudflare.com/turnstile/v0/api.js*",
      (route) =>
        route.fulfill({
          contentType: "application/javascript",
          body: `window.turnstile = { render(element, options) { window.mockTurnstileOptions = options; options.callback('test-token'); return 'widget'; }, reset() {} };`,
        }),
    );
    await page.goto("http://127.0.0.1:4322/website-georg/");
  });

  test("validates inputs and confirms only an explicit backend success", async ({
    page,
  }) => {
    let requestCount = 0;
    await page.route("https://contact.example.test/contact", async (route) => {
      requestCount++;
      expect(route.request().postDataJSON()).toEqual({
        name: "Erika Beispiel",
        email: "erika@example.test",
        message: "",
        turnstileToken: "test-token",
      });
      await route.fulfill({
        json: { ok: true },
        headers: { "Access-Control-Allow-Origin": "http://127.0.0.1:4322" },
      });
    });
    await expect(
      page.getByRole("button", { name: "Anfrage senden" }),
    ).toBeDisabled();
    await page.getByRole("button", { name: "Spam-Schutz aktivieren" }).click();
    await page.getByRole("button", { name: "Anfrage senden" }).click();
    await expect(page.locator("#name-error")).toContainText(
      "Bitte gib einen Namen",
    );
    expect(requestCount).toBe(0);
    await page.getByLabel("Name (erforderlich)").fill("Erika Beispiel");
    await page
      .getByLabel("E-Mail-Adresse (erforderlich)")
      .fill("erika@example.test");
    await page.getByRole("button", { name: "Anfrage senden" }).click();
    await expect(page.getByRole("status")).toContainText(
      "Deine Anfrage wurde übermittelt",
    );
    await expect(page.locator("#name")).toHaveValue("");
    await expect(
      page.getByRole("button", { name: "Anfrage senden" }),
    ).toBeDisabled();
    expect(requestCount).toBe(1);
  });

  test("rejected or malformed responses never display success", async ({
    page,
  }) => {
    await page.route("https://contact.example.test/contact", (route) =>
      route.fulfill({
        status: 200,
        json: { ok: false },
        headers: { "Access-Control-Allow-Origin": "http://127.0.0.1:4322" },
      }),
    );
    await page.getByRole("button", { name: "Spam-Schutz aktivieren" }).click();
    await page.getByLabel("Name (erforderlich)").fill("Erika Beispiel");
    await page
      .getByLabel("E-Mail-Adresse (erforderlich)")
      .fill("erika@example.test");
    await page.getByRole("button", { name: "Anfrage senden" }).click();
    await expect(page.getByRole("status")).toContainText(
      "konnte nicht bestätigt werden",
    );
    await expect(page.locator("#name")).toHaveValue("Erika Beispiel");
    await expect(page.getByRole("status")).not.toContainText("Vielen Dank");
  });
});
