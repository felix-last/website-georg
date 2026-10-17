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
    text: "Im Wettkampf zählt die Leistung. Hier zählt auch der Mensch dahinter. Sportpsychologische Begleitung bietet Raum, um offen über Druck, Zweifel und Herausforderungen zu sprechen und gemeinsam an mentalen Fähigkeiten für Training und Wettkampf zu arbeiten.",
    note: "",
    keywords: ["Fokus", "Klarheit", "Entwicklung"],
  },
  {
    id: "beratung",
    label: "Psychologische Beratung",
    title: "Raum für\nneue Perspektiven.",
    text: "Psychologische Beratung bietet Raum für Entlastung, Orientierung und emotionale Stabilisierung in belastenden Lebenssituationen. Sie kann insbesondere dazu dienen, die Wartezeit bis zum Beginn einer Psychotherapie unterstützend zu überbrücken.",
    note: "Psychologische Beratung ist keine Psychotherapie und ersetzt keine psychotherapeutische oder psychiatrische Behandlung.",
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
    title: "(Neuro-)psychologische\nBegutachtung.",
    text: "Psychologische und neuropsychologische Begutachtung in Freiburg im Breisgau. Die Untersuchungen erfolgen unter Verwendung standardisierter psychologischer und neuropsychologischer Verfahren. Dabei werden unter anderem fachliche Vorgaben und Empfehlungen der Gesellschaft für Neuropsychologie (GNP) berücksichtigt.",
    note: "Auftraggeber:innen: Sozial-, Arbeits- und Zivilgerichte; Berufsgenossenschaften und weitere Träger der gesetzlichen Unfallversicherung; private Unfall-, Berufsunfähigkeits-, Lebens-, Haftpflicht- und Krankenversicherungen; Versorgungsämter und weitere Behörden.",
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
