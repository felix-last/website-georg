export {};

interface Turnstile {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
}
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

const form = document.querySelector<HTMLFormElement>("#contact-form");
if (form) {
  const endpoint = form.dataset.endpoint;
  const siteKey = form.dataset.siteKey;
  const submit = form.querySelector<HTMLButtonElement>("#submit-contact")!;
  const status = form.querySelector<HTMLElement>("#form-status")!;
  const loadButton = form.querySelector<HTMLButtonElement>("#load-turnstile");
  let token = "";
  let widgetId: string | undefined;
  let pending = false;
  const announce = (message: string, focus = false) => {
    status.textContent = message;
    if (focus) status.focus();
  };
  const clearToken = () => {
    token = "";
    submit.disabled = true;
  };

  loadButton?.addEventListener("click", () => {
    if (!siteKey || pending) return;
    loadButton.disabled = true;
    announce("Spam-Schutz wird geladen …");
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onerror = () => {
      script.remove();
      loadButton.disabled = false;
      announce(
        "Der Spam-Schutz konnte nicht geladen werden. Bitte versuche es erneut.",
      );
    };
    script.onload = () => {
      if (!window.turnstile) {
        script.onerror?.(new Event("error"));
        return;
      }
      widgetId = window.turnstile.render(
        form.querySelector<HTMLElement>("#turnstile-widget")!,
        {
          sitekey: siteKey,
          action: "contact",
          language: "de",
          theme: "light",
          callback: (value: string) => {
            token = value;
            submit.disabled = pending;
            announce(
              "Spam-Schutz abgeschlossen. Du kannst deine Anfrage senden.",
            );
          },
          "expired-callback": () => {
            clearToken();
            announce(
              "Der Spam-Schutz ist abgelaufen. Bitte bestätige ihn erneut.",
            );
          },
          "error-callback": () => {
            clearToken();
            announce(
              "Der Spam-Schutz ist fehlgeschlagen. Bitte versuche es erneut.",
            );
          },
        },
      );
      loadButton.hidden = true;
    };
    document.head.append(script);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!endpoint || !siteKey) {
      announce(
        "Das Formular ist noch nicht angeschlossen. Es wurde nichts versendet.",
        true,
      );
      return;
    }
    if (pending) return;
    const name = form.querySelector<HTMLInputElement>("#name")!;
    const email = form.querySelector<HTMLInputElement>("#email")!;
    const message = form.querySelector<HTMLTextAreaElement>("#message")!;
    name.value = name.value.trim();
    email.value = email.value.trim();
    const fields = [name, email, message];
    let firstInvalid: HTMLInputElement | HTMLTextAreaElement | undefined;
    fields.forEach((field) => {
      const valid = field.checkValidity();
      field.setAttribute("aria-invalid", String(!valid));
      form.querySelector<HTMLElement>(`#${field.id}-error`)!.textContent = valid
        ? ""
        : field.id === "name"
          ? "Bitte gib einen Namen mit 2 bis 100 Zeichen ein."
          : field.id === "email"
            ? "Bitte gib eine gültige E-Mail-Adresse ein."
            : "Bitte begrenze deine Nachricht auf 2.000 Zeichen.";
      if (!valid && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      announce("Bitte prüfe die markierten Felder.");
      return;
    }
    if (!token) {
      announce("Bitte aktiviere und bestätige zuerst den Spam-Schutz.", true);
      return;
    }
    pending = true;
    submit.disabled = true;
    form.setAttribute("aria-busy", "true");
    announce("Deine Anfrage wird gesendet …");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "omit",
        redirect: "error",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          message: message.value.trim(),
          turnstileToken: token,
        }),
        signal: AbortSignal.timeout(15_000),
      });
      const result: unknown = await response.json();
      if (
        !response.ok ||
        typeof result !== "object" ||
        result === null ||
        !("ok" in result) ||
        result.ok !== true
      ) {
        throw new Error("Submission rejected");
      }
      form.reset();
      announce(
        "Vielen Dank. Deine Anfrage wurde übermittelt. Du erhältst keine automatische Bestätigungs-E-Mail.",
        true,
      );
    } catch {
      announce(
        "Deine Anfrage konnte nicht bestätigt werden. Bitte versuche es später erneut oder nutze den E-Mail-Kontakt. Bei einem Verbindungsabbruch kann die Anfrage bereits angekommen sein.",
        true,
      );
    } finally {
      pending = false;
      form.removeAttribute("aria-busy");
      clearToken();
      if (widgetId !== undefined) window.turnstile?.reset(widgetId);
    }
  });
}
