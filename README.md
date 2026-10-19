# Georg · Psychologie

Statische, deutschsprachige Website mit Astro und TypeScript. Die beigefügte Gestaltungsvorlage bestimmt Bildsprache, Typografie und Layout. Geist wird lokal ausgeliefert. Keine Datenbank, kein SSR, kein CMS, keine Analyse- oder Marketingdienste.

**Stand: Entwicklungsentwurf.** Name, berufliche Angaben, Leistungsbeschreibungen, E-Mail und Rechtstexte enthalten explizite Platzhalter. Das Kontaktformular sendet ohne Konfiguration nichts. Die Seite ist standardmäßig `noindex`; `robots.txt` sperrt Suchmaschinen. Das ist kein Zugangsschutz: Ein Pages-Deployment ist öffentlich erreichbar.

## Lokal entwickeln und ansehen

Node.js gemäß `.node-version` (24.19.0), npm:

```sh
npm ci
npm run dev
```

Die im Terminal ausgegebene Adresse **mit `/website-georg/`** öffnen. Für einen lokalen Entwurf im Webroot: `BASE_PATH=/ npm run dev`. `.env.example` bei Bedarf nach `.env` kopieren. Öffentliche Konfiguration wird beim Build eingebunden; nach Änderungen neu bauen.

```sh
npm run format        # Prettier einschließlich Astro
npm run format:check
npm run check         # Astro + TypeScript
npx playwright install chromium
npm test              # Desktop/Mobil, Tastatur, axe, Formularvertrag
npm run build
npm run preview       # tatsächlich gebaute statische Seite
```

Für vorhandenes System-Chromium: `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test`. In eingeschränkten Cloud-Umgebungen kann `npm --cache /tmp/website-georg-npm ci` verwendet werden. Die Formularprüfungen simulieren externe Antworten ausschließlich in Tests; sie bestätigen keinen funktionierenden Cloudflare-Dienst. Automatische axe-Prüfungen ersetzen keine manuelle WCAG-Prüfung.

## Struktur

```text
src/
  assets/             # lokale Stimmungsbilder; Astro erstellt responsive WebP
  components/         # Navigation, Leistungen, Kontakt, Footer
  content/site.ts     # Name, Kontakt und Leistungsentwürfe
  layouts/            # gemeinsame Metadaten, Fonts und CSS
  lib/paths.ts        # Links mit GitHub-Pages-Basispfad
  pages/              # Startseite, Rechtstexte, 404, robots.txt
  scripts/contact.ts  # Turnstile und klarer HTTP-Formularvertrag
  styles/             # Gestaltung ohne UI-Framework
tests/                # Browser- und Accessibility-Prüfungen
docs/                 # Kontaktarchitektur und Veröffentlichung
```

Die zwei Landschaftsbilder sind **KI-generierte Platzhalter**, keine authentischen Fotografien oder Aufnahmen des Anbieters. Vor Veröffentlichung eigene oder entsprechend lizenzierte Fotografien einsetzen und Quellen dokumentieren. Die Originalbilder liegen in `src/assets/`; `public/images/forest-og.jpg` ist die lokale Social-Vorschau. Geist: SIL Open Font License, siehe `public/licenses/geist-OFL.txt`.

## GitHub Pages

1. Änderungen mit Conventional Commits auf `main` pushen (z. B. `feat: initialize editorial psychology website`).
2. Unter **Settings → Pages → Build and deployment → Source** `GitHub Actions` wählen.
3. Actions müssen aktiviert sein. Die Umgebung `github-pages` darf Deployments aus `main` erlauben. Der Workflow besitzt nur die nötigen Rechte: `contents: read`, für Deployment `pages: write` und `id-token: write`.
4. Unter **Actions → Build and deploy Astro** Build und Deployment prüfen. Pull Requests werden geprüft, aber nicht veröffentlicht. Bei fehlender Pages-Freischaltung kann der Deploy-Job fehlschlagen; der Build bleibt unabhängig davon sichtbar. Danach den Workflow erneut ausführen.

Vorgesehene Projektadresse: `https://felix-last.github.io/website-georg/`. Dies ist die Konfigurationsadresse, keine Behauptung eines getesteten Deployments. Der Workflow prüft Formatierung, Typen, Browser-Verhalten und Build und veröffentlicht erst bei Erfolg.

Nicht geheime **Repository Variables** unter Settings → Secrets and variables → Actions:

| Variable                    | Standard / Zweck                                        |
| --------------------------- | ------------------------------------------------------- |
| `SITE_URL`                  | `https://felix-last.github.io` – HTTPS-Origin ohne Pfad |
| `BASE_PATH`                 | `/website-georg` – bei eigener Domain `/`               |
| `PUBLIC_LAUNCH_READY`       | `false` – erst nach Inhalts- und Rechtsprüfung `true`   |
| `PUBLIC_CONTACT_ENDPOINT`   | leer – vollständiger HTTPS-Worker-Endpunkt              |
| `PUBLIC_TURNSTILE_SITE_KEY` | leer – öffentlicher Turnstile-Sitekey                   |

**Keine privaten Schlüssel oder API-Tokens in diese Variablen oder das Frontend eintragen.** Der Sitekey ist öffentlich; der Turnstile-Secretkey gehört ausschließlich in den Worker.

### Eigene Domain später

In Pages eine eigene Domain setzen und ggf. eine `public/CNAME` mit genau diesem Hostnamen hinzufügen. `SITE_URL=https://<eigene-domain>` und `BASE_PATH=/` setzen, neu bauen. DNS in Cloudflare nach den aktuellen GitHub-Pages-Vorgaben setzen, Domain-Verifikation und HTTPS aktivieren. Zunächst DNS-only verwenden, bevor eine zusätzliche Proxy-Schicht bewusst geprüft wird. Danach Links, Assets, Canonical-URLs, Sitemap, Worker-CORS und Turnstile-Hostnamen kontrollieren.

Web-DNS und iCloud+-Mail-DNS getrennt konfigurieren. iCloud+-Einrichtung gemäß Apple-Vorgaben vornehmen; MX-, SPF-, DKIM- und DMARC-Einträge nicht ohne Prüfung ersetzen. Cloudflare-Absenderverifizierung für Email Sending ebenfalls separat einrichten. Noch keiner dieser externen Dienste wurde durch das Anlegen dieser Dateien eingerichtet.

## Kontakt und Veröffentlichung

[Kontaktarchitektur und Backend-Vertrag](docs/contact.md) sowie [Checkliste vor Veröffentlichung](docs/launch.md) beachten. Das Formular bleibt deaktiviert, bis beide öffentlichen Konfigurationswerte gesetzt sind; erfolgreicher Versand muss anschließend mit einem echten Backend und dem Zielpostfach getestet werden.

GitHub Pages, Cloudflare und iCloud+ sind die gewünschten Dienste, bieten hier aber keine garantierte ausschließliche EU-Datenverarbeitung. Eine streng auf EU-Server beschränkte Lösung würde einen Wechsel der Infrastruktur erfordern und wird nicht stillschweigend eingeführt. Deutsche Rechtskonformität setzt geprüfte Anbieterangaben, die tatsächliche berufliche Befugnis sowie geprüfte Datenschutz- und Dienstleisterkonfiguration voraus.

## Geplante Domain

**glpsych.de** ist die vorläufig bevorzugte Domain. Sie ist noch nicht als registriert oder verfügbar bestätigt und wird derzeit nicht in GitHub Pages oder DNS aktiviert. Nach Registrierung: GitHub Pages Custom Domain und DNS konfigurieren, anschließend HTTPS und Links prüfen.
