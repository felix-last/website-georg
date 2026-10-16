// Replace explicitly marked placeholders only with verified, approved information.
export const profile = {
  name: "Georg Schmeistenbeißer",
  role: "Psychologe",
  location: "Freiburg im Breisgau",
  email: null as string | null,
};

export const services = [
  {
    id: "sportpsychologie",
    label: "Sportpsychologie",
    title: "Ganzheitlich trainieren.\nGrößer denken.",
    text: "Fokus finden. Mit Druck umgehen. Den eigenen Weg im Sport gestalten. Hier entsteht ein Angebot für Menschen, die ihre mentale Seite im Training und im Wettkampf bewusster kennenlernen möchten.",
    note: "Entwurf · Zielgruppen, Methoden und Umfang werden ergänzt.",
    keywords: ["Fokus", "Klarheit", "Entwicklung"],
  },
  {
    id: "beratung",
    label: "Psychologische Beratung",
    title: "Raum für\nneue Perspektiven.",
    text: "Manchmal beginnt Veränderung mit einem Gespräch. Dieser Bereich ist für ein mögliches Beratungsangebot vorgesehen: innehalten, Situationen einordnen und nächste Schritte gemeinsam betrachten.",
    note: "Platzhalter · Beratungsrahmen und Abgrenzung zur Psychotherapie sind zu klären.",
    keywords: ["Orientierung", "Reflexion", "Perspektive"],
  },
  {
    id: "notfallpsychologie",
    label: "Notfallpsychologie",
    title: "Halt in\nbesonderen Momenten.",
    text: "Ein vorgesehener Bereich für psychologische Unterstützung nach außergewöhnlichen Belastungen. Das konkrete Angebot, die fachlichen Voraussetzungen und die Erreichbarkeit werden vor Veröffentlichung geklärt.",
    note: "Platzhalter · Kein Notfalldienst. Bei unmittelbarer Gefahr: 112.",
    keywords: ["Halt", "Begleitung", "Stabilität"],
  },
  {
    id: "neuropsychologie",
    label: "Psychologische Begutachtung",
    title: "Sorgfältig\nhinschauen.",
    text: "Hier ist Raum für die Beschreibung eines neuropsychologischen Angebots. Fragestellungen, Verfahren und die erforderlichen Qualifikationen werden erst nach fachlicher Prüfung konkret benannt.",
    note: "Platzhalter · Keine Aussage über vorhandene Befugnisse oder Qualifikationen.",
    keywords: ["Sorgfalt", "Verstehen", "Einordnung"],
  },
  {
    id: "unternehmen",
    label: "Unternehmen",
    title: "Zusammen\nweiterdenken.",
    text: "Ein möglicher Rahmen für Workshops und Beratung im beruflichen Kontext. Im Mittelpunkt stehen Zusammenarbeit, ein bewusster Umgang mit Anforderungen und die Bedingungen guter Arbeit.",
    note: "Entwurf · Workshop-Themen, Formate und Konditionen folgen.",
    keywords: ["Zusammenarbeit", "Austausch", "Entwicklung"],
  },
];
