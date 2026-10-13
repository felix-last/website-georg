# Kontaktformular: Integrationsvertrag

Architektur: statische Astro-Seite → Cloudflare Worker → Cloudflare Email Sending → verifiziertes iCloud+-Zielpostfach. Keine Bestätigungs-E-Mail an Absender, keine Datenbank und keine dauerhafte Speicherung in der Anwendung. **Der Worker ist noch nicht implementiert oder bereitgestellt.** Cloudflare-Zugangsdaten sind für das Frontend nicht erforderlich.

## Frontend

`PUBLIC_CONTACT_ENDPOINT` muss eine vollständige HTTPS-URL sein, `PUBLIC_TURNSTILE_SITE_KEY` der öffentliche Sitekey. Ohne beide Werte ist Versand gesperrt. Turnstile lädt ausschließlich nach Betätigung von „Spam-Schutz aktivieren“; beim normalen Seitenaufruf wird keine Verbindung zu Cloudflare hergestellt. Vor Aktivierung Rechtsgrundlage und Informationen prüfen; ein Klick ist kein pauschaler Nachweis wirksamer datenschutzrechtlicher Einwilligung.

Nach validierter Eingabe sendet der Browser JSON mit `credentials: omit`, ohne Weiterleitung und mit 15 Sekunden Timeout:

```json
{
  "name": "Erika Beispiel",
  "email": "erika@example.test",
  "message": "",
  "turnstileToken": "<frischer Token>"
}
```

Der Worker darf Erfolg erst zurückgeben, wenn Email Sending die Nachricht angenommen hat:

```json
{ "ok": true }
```

HTTP 2xx **und** explizites `ok: true` sind Voraussetzung für eine Erfolgsmeldung. Das bedeutet Annahme zum Versand, keine garantierte Zustellung. Fehlerantworten mit passendem HTTP-Status, z. B. `400`, `403`, `413`, `429`, `502`, und `{ "ok": false }`. Keine Eingaben oder technischen Details zurückgeben. Das Frontend erhält bei Fehlern die Felder und zeigt eine allgemeine Meldung; nach einem Versuch wird der Token verworfen. Bei einem Timeout kann die E-Mail bereits angekommen sein; der Hinweis erklärt das und es erfolgt keine automatische Wiederholung.

## Worker-Anforderungen vor Freischaltung

- Nur `POST` und notwendiges `OPTIONS` akzeptieren. CORS-Origin exakt auf die konfigurierte Website-Origin begrenzen; Origin ist ohne Pfad (auch bei Projekt-Pages). Kein `*`, keine Credentials. `Vary: Origin`, nur benötigte Methoden und Header zulassen. CORS ist kein Ersatz für serverseitige Spam-Prüfung.
- `application/json` verlangen und eingelesene Body-Größe auf z. B. 16 KiB begrenzen, auch bei fehlendem oder falschem `Content-Length`. Ungültiges JSON ablehnen. Name: getrimmt 2–100 Zeichen. E-Mail: höchstens 254 Zeichen, validieren, CR/LF und Header-Injection ausschließen. Nachricht: optional, maximal 2.000 Zeichen. Token: nicht leer und mit sinnvoller Obergrenze. Unbekannte Felder verwerfen oder ablehnen; nur Klartext verwenden.
- Token serverseitig per HTTPS am offiziellen Turnstile-Siteverify-Endpunkt prüfen (`https://challenges.cloudflare.com/turnstile/v0/siteverify`). Nicht nur `success`, sondern auch erwarteten Hostnamen und `action: contact` validieren. Einmalnutzung, Ablauf und Dienstfehler beachten; bei fehlgeschlagener Prüfung keine E-Mail senden.
- Geheimnisse ausschließlich als Worker Secrets: Turnstile-Secret und gegebenenfalls serverseitige Email-Sending-Zugangsdaten. Öffentliche Worker-Konfiguration: erlaubte Origin, erwarteter Turnstile-Hostname, verifizierte Absenderadresse, fester Empfänger. Aktuelle offizielle Cloudflare-Email-Sending-API oder Bindings verwenden; nicht ungeprüft mit Email Routing gleichsetzen.
- Empfänger und Absender serverseitig festlegen. Niemals vom Formular frei wählbar machen. Die validierte Nutzeradresse nur als `Reply-To`, nicht als `From`, verwenden. Sicheren festen Betreff und Plaintext-Body verwenden.
- Keine automatische Bestätigung an die Nutzeradresse. Keine Anwendungslogs für Bodies, Namen, E-Mail-Adressen, Tokens oder Fehlermeldungen mit Inhalten; keine KV-/D1-/R2-Speicherung. Workers Observability, Traces und Anbieterprotokolle gesondert konfigurieren und datenschutzrechtlich prüfen. Infrastruktur kann technische Metadaten verarbeiten; „keine Datenbank“ bedeutet nicht „keine Anbieterprotokolle“.
- Transport, Verarbeitung, Missbrauchsschutz und Löschfristen prüfen. Wenn zusätzliche Rate Limits nötig sind, Plattformmechanismen und Datenverarbeitung bewusst auswählen; keine versteckte Speicherung einführen.
- Absenderdomain für Cloudflare Email Sending verifizieren, Mail-DNS einschließlich SPF/DKIM/DMARC abstimmen, iCloud+-Postfach sicher konfigurieren. Prüfen, ob Berechtigung oder kostenpflichtige Freischaltung nötig ist; erst nach ausdrücklicher Entscheidung kostenpflichtige Dienste aktivieren.

## Ende-zu-Ende-Abnahme

Erst nach Rechtsprüfung und Konfiguration: gültige Anfrage senden, tatsächlichen Eingang im Zielpostfach kontrollieren, `Reply-To` prüfen. Fehlenden/abgelaufenen/gefälschten Token, falschen Hostnamen, falsche Aktion, fremde Origin, übergroßen Body, ungültige E-Mail, Header-Injection und Email-Sending-Ausfall prüfen. Kein Erfolg bei Ablehnung. Mobile Tastatur, Screenreader, Turnstile-Ausfall und Ablauf prüfen. Sicherstellen, dass kein Bestätigungsmail-Versand und kein persistentes Anwendungsspeichern stattfinden. E-Mail-Löschfristen und Infrastrukturprotokolle dokumentieren.

Die Browser-Tests in diesem Repository prüfen lediglich das Frontend mit simulierten Dienstantworten. Sie ersetzen diese Abnahme nicht.
