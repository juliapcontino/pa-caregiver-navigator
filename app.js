const state = {
  resources: {},
  selections: null,
  language: "en",
};

const storageKeys = {
  feedback: "pa-caregiver-feedback",
  language: "pa-caregiver-language",
};

const elements = {
  welcome: document.getElementById("welcome"),
  intake: document.getElementById("intake"),
  plan: document.getElementById("plan"),
  startButton: document.getElementById("start-button"),
  intakeForm: document.getElementById("intake-form"),
  planList: document.getElementById("plan-list"),
  planSummary: document.getElementById("plan-summary"),
  printPlan: document.getElementById("print-plan"),
  emailTemplate: document.getElementById("email-template"),
  callTemplate: document.getElementById("call-template"),
  languageToggle: document.getElementById("language-toggle"),
  clearSession: document.getElementById("clear-session"),
  county: document.getElementById("county"),
  caregiverStatus: document.getElementById("caregiver-status"),
  concernInput: document.getElementById("concern"),
  situationInput: document.getElementById("situation"),
  formError: document.getElementById("form-error"),
  ageRangeFieldset: document.getElementById("age-range-fieldset"),
  feedbackText: document.getElementById("feedback-text"),
  submitFeedback: document.getElementById("submit-feedback"),
  clearFeedback: document.getElementById("clear-feedback"),
  feedbackList: document.getElementById("feedback-list"),
  modal: document.getElementById("modal"),
  modalText: document.getElementById("modal-text"),
  modalContext: document.getElementById("modal-context"),
  closeModal: document.getElementById("close-modal"),
  copyModal: document.getElementById("copy-modal"),
};

const translations = {
  en: {
    appName: "PA Caregiver Navigator",
    appSubtitle: "Find local supports tailored to your family.",
    skipLink: "Skip to main content",
    clearSession: "Clear session",
    welcomeTitle: "Welcome",
    welcomeBody:
      "This tool helps caregivers explore support options across Pennsylvania. Answer a few quick questions to get a personalized support plan.",
    startButton: "Start",
    intakeTitle: "Tell us a little about your situation",
    countyLabel: "County",
    countyPlaceholder: "Select your county",
    concernLabel: "Main concern (optional)",
    concernPlaceholder: "e.g., childcare, food help, IEP, counseling",
    concernHelp:
      "We'll match keywords to support categories (for example: food, childcare, IEP, therapy).",
    situationLabel: "Describe your situation (optional)",
    situationPlaceholder: "Share any details that might help us find the right supports.",
    situationHelp:
      "We'll consider this along with your checked boxes to match additional resources.",
    ageRangeLegend: "Child age range",
    ageRange0to2: "0–2",
    ageRange3to5: "3–5",
    ageRange6to12: "6–12",
    ageRange13to18: "13–18",
    needsLegend: "Support needs",
    needHealthcare: "Healthcare",
    needChildcare: "Childcare/ECE",
    needSchoolSupport: "School Support",
    needFoodAssistance: "Food & Financial Assistance",
    needMentalHealth: "Mental Health",
    needAfterSchool: "After-school",
    needEmployment: "Employment & Training",
    caregiverStatusLabel: "Caregiver status",
    caregiverStatusPlaceholder: "Select status",
    caregiverWorkingFull: "Working full-time",
    caregiverPartTime: "Part-time",
    caregiverSeeking: "Seeking",
    caregiverStudent: "Student",
    caregiverStayingHome: "Staying home",
    generatePlan: "Generate plan",
    planTitle: "Personalized Support Plan",
    downloadPdf: "Download PDF",
    generateEmail: "Generate email to agency",
    generateCall: "Generate phone call script",
    disclaimer: "This tool is informational only — confirm eligibility with official agencies.",
    feedbackTitle: "Optional feedback",
    feedbackLabel: "Share what could be improved (local only)",
    submitFeedback: "Submit feedback",
    clearFeedback: "Clear feedback",
    recentFeedback: "Recent feedback (stored on this device only):",
    modalTitle: "Draft message",
    closeModal: "Close",
    modalTextLabel: "Draft message",
    copyText: "Copy text",
    planWhy: "Why this might apply:",
    planNextSteps: "Next steps:",
    planOfficialLink: "Official link:",
    summaryCounty: "County",
    summaryAge: "Age range",
    summaryStatus: "Caregiver status",
    summaryNotes: "Situation details considered",
    modalContext: "Template based on {{need}} support in {{county}} County.",
    copySuccess: "Copied",
    formError: "Please complete all required fields.",
    toggleToSpanish: "Español",
    toggleToEnglish: "English",
    toggleToSpanishAria: "Switch language to Spanish",
    toggleToEnglishAria: "Cambiar el idioma a inglés"
  },
  es: {
    appName: "PA Caregiver Navigator",
    appSubtitle: "Encuentra apoyos locales para tu familia.",
    skipLink: "Saltar al contenido principal",
    clearSession: "Borrar sesión",
    welcomeTitle: "Bienvenida",
    welcomeBody:
      "Esta herramienta ayuda a los cuidadores a explorar opciones de apoyo en Pennsylvania. Responde unas preguntas para obtener un plan personalizado.",
    startButton: "Comenzar",
    intakeTitle: "Cuéntanos un poco sobre tu situación",
    countyLabel: "Condado",
    countyPlaceholder: "Selecciona tu condado",
    concernLabel: "Preocupación principal (opcional)",
    concernPlaceholder: "p. ej., cuidado infantil, comida, IEP, consejería",
    concernHelp:
      "Relacionaremos palabras clave con categorías de apoyo (por ejemplo: comida, cuidado infantil, IEP, terapia).",
    situationLabel: "Describe tu situación (opcional)",
    situationPlaceholder: "Comparte detalles que ayuden a encontrar apoyos.",
    situationHelp:
      "Lo consideraremos junto con las casillas seleccionadas para encontrar recursos adicionales.",
    ageRangeLegend: "Rango de edad del niño",
    ageRange0to2: "0–2",
    ageRange3to5: "3–5",
    ageRange6to12: "6–12",
    ageRange13to18: "13–18",
    needsLegend: "Necesidades de apoyo",
    needHealthcare: "Salud",
    needChildcare: "Cuidado infantil/Educación temprana",
    needSchoolSupport: "Apoyo escolar",
    needFoodAssistance: "Comida y ayuda financiera",
    needMentalHealth: "Salud mental",
    needAfterSchool: "Después de la escuela",
    needEmployment: "Empleo y capacitación",
    caregiverStatusLabel: "Situación del cuidador",
    caregiverStatusPlaceholder: "Selecciona una opción",
    caregiverWorkingFull: "Trabajo de tiempo completo",
    caregiverPartTime: "Medio tiempo",
    caregiverSeeking: "Buscando empleo",
    caregiverStudent: "Estudiante",
    caregiverStayingHome: "En casa",
    generatePlan: "Generar plan",
    planTitle: "Plan de apoyo personalizado",
    downloadPdf: "Descargar PDF",
    generateEmail: "Generar correo a la agencia",
    generateCall: "Generar guion de llamada",
    disclaimer: "Esta herramienta es solo informativa — confirma la elegibilidad con agencias oficiales.",
    feedbackTitle: "Comentarios opcionales",
    feedbackLabel: "Comparte qué se puede mejorar (solo local)",
    submitFeedback: "Enviar comentarios",
    clearFeedback: "Borrar comentarios",
    recentFeedback: "Comentarios recientes (solo en este dispositivo):",
    modalTitle: "Mensaje borrador",
    closeModal: "Cerrar",
    modalTextLabel: "Mensaje borrador",
    copyText: "Copiar texto",
    planWhy: "Por qué podría aplicar:",
    planNextSteps: "Próximos pasos:",
    planOfficialLink: "Enlace oficial:",
    summaryCounty: "Condado",
    summaryAge: "Rango de edad",
    summaryStatus: "Situación del cuidador",
    summaryNotes: "Se consideraron detalles de la situación",
    modalContext: "Plantilla basada en apoyo de {{need}} en el condado de {{county}}.",
    copySuccess: "Copiado",
    formError: "Completa todos los campos obligatorios.",
    toggleToSpanish: "Español",
    toggleToEnglish: "English",
    toggleToSpanishAria: "Cambiar el idioma a español",
    toggleToEnglishAria: "Switch language to English"
  }
};

const caregiverStatusLabels = {
  "Working full-time": { en: "Working full-time", es: "Trabajo de tiempo completo" },
  "Part-time": { en: "Part-time", es: "Medio tiempo" },
  "Seeking": { en: "Seeking", es: "Buscando empleo" },
  "Student": { en: "Student", es: "Estudiante" },
  "Staying home": { en: "Staying home", es: "En casa" }
};

const needLabels = {
  Healthcare: { en: "Healthcare", es: "Salud" },
  "Childcare/ECE": { en: "Childcare/ECE", es: "Cuidado infantil/Educación temprana" },
  "School Support": { en: "School Support", es: "Apoyo escolar" },
  "Food & Financial Assistance": { en: "Food & Financial Assistance", es: "Comida y ayuda financiera" },
  "Mental Health": { en: "Mental Health", es: "Salud mental" },
  "After-school": { en: "After-school", es: "Después de la escuela" },
  "Employment & Training": { en: "Employment & Training", es: "Empleo y capacitación" }
};

const supportNeedTemplates = {
  en: {
    email: (need, county) =>
      `Hello,\n\nMy name is [Your Name], and I am a caregiver in ${county} County seeking ${need} support. I would like to learn more about eligibility, application steps, and any upcoming intake appointments.\n\nCould you please share the best next step and any documents I should prepare?\n\nThank you,\n[Your Name]\n[Phone Number]`,
    call: (need, county) =>
      `Hi, my name is [Your Name]. I'm a caregiver in ${county} County and I'm calling to ask about ${need} services.\n\n1. Are there current openings or waitlists?\n2. What are the eligibility requirements?\n3. What documents should I have ready?\n4. Is there a best time to call back or a specific contact?\n\nThank you for your help.`
  },
  es: {
    email: (need, county) =>
      `Hola,\n\nMi nombre es [Tu Nombre] y soy cuidador(a) en el condado de ${county}. Busco apoyo de ${need}. Me gustaría conocer requisitos, pasos de solicitud y próximas citas de admisión.\n\n¿Podrían compartir el siguiente paso y los documentos que debo preparar?\n\nGracias,\n[Tu Nombre]\n[Número de Teléfono]`,
    call: (need, county) =>
      `Hola, mi nombre es [Tu Nombre]. Soy cuidador(a) en el condado de ${county} y llamo para preguntar por servicios de ${need}.\n\n1. ¿Hay cupos o lista de espera?\n2. ¿Cuáles son los requisitos de elegibilidad?\n3. ¿Qué documentos debo tener listos?\n4. ¿Hay un mejor horario para volver a llamar o un contacto específico?\n\nGracias por su ayuda.`
  }
};

let lastFocusedElement = null;
const focusableSelectors =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function getFocusableElements() {
  return Array.from(elements.modal.querySelectorAll(focusableSelectors)).filter(
    (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
  );
}

function handleModalKeydown(event) {
  if (event.key === "Escape") {
    closeModal();
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = getFocusableElements();
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function showSection(section) {
  [elements.welcome, elements.intake, elements.plan].forEach((el) => {
    el.classList.toggle("hidden", el !== section);
  });
}

function t(key) {
  const table = translations[state.language] || translations.en;
  return table[key] || key;
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = t(key);
    if (value) el.textContent = value;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const value = t(key);
    if (value) el.setAttribute("placeholder", value);
  });

  if (state.language === "en") {
    elements.languageToggle.textContent = t("toggleToSpanish");
    elements.languageToggle.setAttribute("aria-label", t("toggleToSpanishAria"));
    elements.languageToggle.setAttribute("aria-pressed", "false");
  } else {
    elements.languageToggle.textContent = t("toggleToEnglish");
    elements.languageToggle.setAttribute("aria-label", t("toggleToEnglishAria"));
    elements.languageToggle.setAttribute("aria-pressed", "true");
  }

  elements.closeModal.setAttribute("aria-label", t("closeModal"));
}

function setLanguage(nextLanguage) {
  state.language = nextLanguage;
  localStorage.setItem(storageKeys.language, nextLanguage);
  applyTranslations();
  if (state.selections) renderPlan(state.selections);
}

function normalizeNeeds(needs) {
  return needs.length ? needs : ["Food & Financial Assistance", "Healthcare"];
}

const concernKeywords = {
  Healthcare: [
    "doctor", "medical", "health", "clinic", "insurance", "medicaid", "coverage", "dentist",
    "médico", "salud", "clínica", "seguro", "medicaid", "cobertura", "dentista"
  ],
  "Childcare/ECE": [
    "childcare", "daycare", "pre-k", "preschool", "early learning", "ece", "head start",
    "cuidado infantil", "guardería", "preescolar", "educación temprana"
  ],
  "School Support": [
    "iep", "504", "special education", "school", "tutoring", "attendance", "bullying",
    "educación especial", "escuela", "tutoría", "asistencia", "acoso"
  ],
  "Food & Financial Assistance": [
    "food", "snap", "wic", "tanf", "cash", "rent", "utility", "liheap", "benefits", "groceries",
    "comida", "ayuda", "renta", "servicios", "beneficios", "alimentos"
  ],
  "Mental Health": [
    "counseling", "therapy", "mental health", "behavioral", "stress", "crisis", "988", "anxiety", "depression",
    "consejería", "terapia", "salud mental", "estrés", "crisis", "ansiedad", "depresión"
  ],
  "After-school": [
    "after school", "afterschool", "summer", "enrichment", "youth program", "out of school", "ost",
    "después de la escuela", "verano", "enriquecimiento", "programa juvenil"
  ],
  "Employment & Training": [
    "job", "work", "employment", "training", "career", "resume", "apprenticeship", "skill", "careerlink", "unemployment",
    "trabajo", "empleo", "capacitación", "carrera", "currículum", "aprendizaje", "desempleo"
  ],
};

function matchConcernToNeeds(text) {
  if (!text) return [];
  const lower = text.toLowerCase();
  const matches = [];
  Object.entries(concernKeywords).forEach(([category, keywords]) => {
    if (keywords.some((keyword) => lower.includes(keyword))) {
      matches.push(category);
    }
  });
  return matches;
}

function pickPlanItems(county, needs) {
  const countyData = state.resources[county] || {};
  const statewideData = state.resources.statewide || {};
  const planItems = [];
  const maxPerNeed = 2;
  const seenLinks = new Set();

  needs.forEach((need) => {
    const entries = [...(countyData[need] || []), ...(statewideData[need] || [])];
    entries.slice(0, maxPerNeed).forEach((entry) => {
      if (!entry?.officialLink || seenLinks.has(entry.officialLink)) return;
      seenLinks.add(entry.officialLink);
      planItems.push({ need, ...entry });
    });
  });

  // Ensure there are at least 4 items by adding backup needs if needed.
  const fallbackNeeds = [...new Set([...Object.keys(countyData), ...Object.keys(statewideData)])];
  for (const fallback of fallbackNeeds) {
    if (planItems.length >= 4) break;
    const entry = countyData[fallback]?.[0] || statewideData[fallback]?.[0];
    if (entry && !seenLinks.has(entry.officialLink)) {
      seenLinks.add(entry.officialLink);
      planItems.push({ need: fallback, ...entry });
    }
  }

  return planItems.slice(0, 10);
}

function renderPlan(selections) {
  const { county, ageRange, caregiverStatus, needs, concernText, situationText } = selections;
  const planItems = pickPlanItems(county, normalizeNeeds(needs));

  elements.planList.innerHTML = "";

  const planWhy = t("planWhy");
  const planNextSteps = t("planNextSteps");
  const planOfficialLink = t("planOfficialLink");

  planItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = "plan-item";
    card.innerHTML = `
      <h4>${item.title}</h4>
      <p><strong>${planWhy}</strong> ${item.description}</p>
      <p class="next-steps"><strong>${planNextSteps}</strong> ${item.nextSteps}</p>
      <p class="next-steps"><strong>${planOfficialLink}</strong> <a href="${item.officialLink}" target="_blank" rel="noopener">${item.officialLink}</a></p>
    `;
    elements.planList.appendChild(card);
  });

  const statusLabel = caregiverStatusLabels[caregiverStatus]?.[state.language] || caregiverStatus;
  const summaryParts = [
    `${t("summaryCounty")}: ${county}`,
    `${t("summaryAge")}: ${ageRange}`,
    `${t("summaryStatus")}: ${statusLabel}`,
  ];
  if (concernText || situationText) {
    summaryParts.push(t("summaryNotes"));
  }
  elements.planSummary.textContent = summaryParts.join(" · ");
  showSection(elements.plan);
}

function openModal(type) {
  if (!state.selections) return;
  const { county, needs } = state.selections;
  const primaryNeed = normalizeNeeds(needs)[0];
  const needLabel = needLabels[primaryNeed]?.[state.language] || primaryNeed;
  const context = t("modalContext")
    .replace("{{need}}", needLabel)
    .replace("{{county}}", county);

  elements.modalContext.textContent = context;
  elements.modalText.value = supportNeedTemplates[state.language][type](needLabel, county);
  lastFocusedElement = document.activeElement;
  elements.modal.classList.remove("hidden");
  elements.modalText.focus();
  document.addEventListener("keydown", handleModalKeydown);
}

function closeModal() {
  elements.modal.classList.add("hidden");
  document.removeEventListener("keydown", handleModalKeydown);
  if (lastFocusedElement) lastFocusedElement.focus();
}

function copyModalText() {
  const text = elements.modalText.value;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  } else {
    elements.modalText.select();
    document.execCommand("copy");
  }
  elements.copyModal.textContent = t("copySuccess");
  setTimeout(() => (elements.copyModal.textContent = t("copyText")), 1200);
}

function storeFeedback(entry) {
  const existing = JSON.parse(localStorage.getItem(storageKeys.feedback) || "[]");
  existing.unshift(entry);
  localStorage.setItem(storageKeys.feedback, JSON.stringify(existing.slice(0, 5)));
  renderFeedback();
}

function renderFeedback() {
  const entries = JSON.parse(localStorage.getItem(storageKeys.feedback) || "[]");
  elements.feedbackList.innerHTML = "";
  entries.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.date}: ${entry.text}`;
    elements.feedbackList.appendChild(li);
  });
}

function clearFeedback() {
  localStorage.removeItem(storageKeys.feedback);
  renderFeedback();
}

function clearSession() {
  const savedLanguage = localStorage.getItem(storageKeys.language);
  localStorage.clear();
  if (savedLanguage) localStorage.setItem(storageKeys.language, savedLanguage);
  state.selections = null;
  elements.intakeForm.reset();
  elements.formError.classList.remove("active");
  elements.formError.textContent = "";
  showSection(elements.welcome);
  renderFeedback();
}

async function loadResources() {
  // Replace resources.json with an official data source when available.
  // If the State deploys a backend, fetch from a secure API endpoint instead of local JSON.
  const response = await fetch("resources.json");
  state.resources = await response.json();
}

function handleSubmit(event) {
  event.preventDefault();
  elements.formError.classList.remove("active");
  elements.formError.textContent = "";
  [elements.intakeForm, elements.ageRangeFieldset].forEach((el) =>
    el?.removeAttribute("aria-invalid")
  );
  elements.county?.removeAttribute("aria-invalid");
  elements.caregiverStatus?.removeAttribute("aria-invalid");

  const formData = new FormData(elements.intakeForm);
  const county = formData.get("county");
  const ageRange = formData.get("ageRange");
  const caregiverStatus = formData.get("caregiverStatus");
  const needs = formData.getAll("needs");
  const concernText = (formData.get("concern") || "").trim();
  const situationText = (formData.get("situation") || "").trim();
  const combinedText = `${concernText} ${situationText}`.trim();
  const matchedNeeds = matchConcernToNeeds(combinedText);
  const finalNeeds = Array.from(new Set([...needs, ...matchedNeeds]));

  if (!county || !ageRange || !caregiverStatus) {
    elements.formError.textContent = t("formError");
    elements.formError.classList.add("active");
    if (!county) elements.county?.setAttribute("aria-invalid", "true");
    if (!ageRange) elements.ageRangeFieldset?.setAttribute("aria-invalid", "true");
    if (!caregiverStatus) elements.caregiverStatus?.setAttribute("aria-invalid", "true");
    const focusTarget = !county
      ? elements.county
      : !ageRange
        ? elements.ageRangeFieldset?.querySelector("input")
        : elements.caregiverStatus;
    if (focusTarget) focusTarget.focus();
    return;
  }

  state.selections = {
    county,
    ageRange,
    caregiverStatus,
    needs: finalNeeds,
    concernText,
    situationText,
  };
  renderPlan(state.selections);
}

function init() {
  elements.startButton.addEventListener("click", () => showSection(elements.intake));
  elements.intakeForm.addEventListener("submit", handleSubmit);
  elements.printPlan.addEventListener("click", () => window.print());
  elements.emailTemplate.addEventListener("click", () => openModal("email"));
  elements.callTemplate.addEventListener("click", () => openModal("call"));
  elements.closeModal.addEventListener("click", closeModal);
  elements.modal.addEventListener("click", (event) => {
    if (event.target === elements.modal) closeModal();
  });
  elements.copyModal.addEventListener("click", copyModalText);
  elements.clearSession.addEventListener("click", clearSession);
  elements.languageToggle.addEventListener("click", () =>
    setLanguage(state.language === "en" ? "es" : "en")
  );

  elements.submitFeedback.addEventListener("click", () => {
    const text = elements.feedbackText.value.trim();
    if (!text) return;
    storeFeedback({ text, date: new Date().toLocaleDateString() });
    elements.feedbackText.value = "";
  });

  elements.clearFeedback.addEventListener("click", clearFeedback);

  renderFeedback();
  applyTranslations();
}

const savedLanguage = localStorage.getItem(storageKeys.language);
if (savedLanguage) state.language = savedLanguage;

loadResources().then(init).catch(() => {
  alert("Unable to load local resources. Please check resources.json.");
});
