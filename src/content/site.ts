// Replace explicitly marked placeholders only with verified, approved information.
export const profile = {
  name: "Georg Schmeistenbeißer",
  role: "Psychologe",
  location: "Freiburg im Breisgau",
  email: null as string | null,
};

// Complete catalogue retained for future expansion; inactive sections are not rendered.
export const allServices = [
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
    text: "Wenn es draußen ganz still wird, wird es drinnen ganz laut. Notfallpsychologische Unterstützung kann nach außergewöhnlichen Belastungsereignissen dabei helfen, erste Orientierung und Stabilität zu finden.",
    note: "Kein Notfalldienst. Bei unmittelbarer Gefahr: 112.",
    keywords: ["Halt", "Begleitung", "Stabilität"],
  },
  {
    id: "neuropsychologie",
    label: "Psychologische Begutachtung",
    title: "(Neuro-)psychologische\nBegutachtung.",
    text: "In Freiburg im Breisgau biete ich (neuro-)psychologische Begutachtungen an. Im Rahmen von Zustands- und Zusammenhangsbegutachtungen beurteile ich insbesondere die kognitive Leistungsfähigkeit, arbeitsbezogene Einschränkungen und Befunde, die für die Einschätzung einer Minderung der Erwerbsfähigkeit (MdE) relevant sein können. Durch meine bisherige berufliche Tätigkeit verfüge ich über Erfahrung mit Post-COVID, Schädel-Hirn-Traumata und neurologischen Erkrankungen. Die Untersuchungen erfolgen mit standardisierten psychologischen und neuropsychologischen Verfahren. Dabei orientiere ich mich an den Leitlinien zur neuropsychologischen Begutachtung nach Neumann-Zielke et al. (2015).",
    note: "",
    keywords: ["Sorgfalt", "Verstehen", "Einordnung"],
  },
  {
    id: "unternehmen",
    label: "Unternehmen",
    title: "Zusammen\nweiterdenken.",
    text: "Psychologische Workshops und Seminare für Unternehmen und Organisationen. Wissenschaftliche Erkenntnisse aus Psychologie, Leistungssport und Notfallpsychologie werden mit praxisnahen Übungen verbunden. Die Inhalte können an die Anforderungen des jeweiligen Teams angepasst werden.",
    note: "",
    keywords: ["Zusammenarbeit", "Austausch", "Entwicklung"],
  },
];

// Initial launch: keep the offering focused on three established areas.
export const services = allServices.filter((service) =>
  ["sportpsychologie", "notfallpsychologie", "neuropsychologie"].includes(service.id),
);
