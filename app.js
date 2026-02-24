const state = {
  resources: {},
  selections: null,
};

const storageKeys = {
  feedback: "pa-caregiver-feedback",
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
  clearSession: document.getElementById("clear-session"),
  concernInput: document.getElementById("concern"),
  concernOverride: document.getElementById("concern-override"),
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

const supportNeedTemplates = {
  email: (need, county) => `Hello,\n\nMy name is [Your Name], and I am a caregiver in ${county} County seeking ${need} support. I would like to learn more about eligibility, application steps, and any upcoming intake appointments.\n\nCould you please share the best next step and any documents I should prepare?\n\nThank you,\n[Your Name]\n[Phone Number]`,
  call: (need, county) => `Hi, my name is [Your Name]. I'm a caregiver in ${county} County and I'm calling to ask about ${need} services.\n\n1. Are there current openings or waitlists?\n2. What are the eligibility requirements?\n3. What documents should I have ready?\n4. Is there a best time to call back or a specific contact?\n\nThank you for your help.`
};

function showSection(section) {
  [elements.welcome, elements.intake, elements.plan].forEach((el) => {
    el.classList.toggle("hidden", el !== section);
  });
}

function normalizeNeeds(needs) {
  return needs.length ? needs : ["Food & Financial Assistance", "Healthcare"];
}

const concernKeywords = {
  Healthcare: ["doctor", "medical", "health", "clinic", "insurance", "medicaid", "coverage", "dentist"],
  "Childcare/ECE": ["childcare", "daycare", "pre-k", "preschool", "early learning", "ece", "head start"],
  "School Support": ["iep", "504", "special education", "school", "tutoring", "attendance", "bullying"],
  "Food & Financial Assistance": ["food", "snap", "wic", "tanf", "cash", "rent", "utility", "liheap", "benefits", "groceries"],
  "Mental Health": ["counseling", "therapy", "mental health", "behavioral", "stress", "crisis", "988", "anxiety", "depression"],
  "After-school": ["after school", "afterschool", "summer", "enrichment", "youth program", "out of school", "ost"],
  "Employment & Training": ["job", "work", "employment", "training", "career", "resume", "apprenticeship", "skill", "careerlink", "unemployment"],
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
  needs.forEach((need) => {
    const entries = countyData[need] || statewideData[need] || [];
    if (entries.length) {
      planItems.push({ need, ...entries[0] });
    }
  });

  // Ensure there are 4-6 items by adding backup needs if needed.
  const fallbackNeeds = [...new Set([...Object.keys(countyData), ...Object.keys(statewideData)])];
  for (const fallback of fallbackNeeds) {
    if (planItems.length >= 4) break;
    if (!planItems.find((item) => item.need === fallback)) {
      const entry = countyData[fallback]?.[0] || statewideData[fallback]?.[0];
      if (entry) planItems.push({ need: fallback, ...entry });
    }
  }

  return planItems.slice(0, 6);
}

function renderPlan(selections) {
  const { county, ageRange, caregiverStatus, needs } = selections;
  const planItems = pickPlanItems(county, normalizeNeeds(needs));

  elements.planList.innerHTML = "";

  planItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = "plan-item";
    card.innerHTML = `
      <h4>${item.title}</h4>
      <p><strong>Why this might apply:</strong> ${item.description}</p>
      <p class="next-steps"><strong>Next steps:</strong> ${item.nextSteps}</p>
      <p class="next-steps"><strong>Official link:</strong> <a href="${item.officialLink}" target="_blank" rel="noopener">${item.officialLink}</a></p>
    `;
    elements.planList.appendChild(card);
  });

  elements.planSummary.textContent = `County: ${county} · Age range: ${ageRange} · Caregiver status: ${caregiverStatus}`;
  showSection(elements.plan);
}

function openModal(type) {
  if (!state.selections) return;
  const { county, needs } = state.selections;
  const primaryNeed = normalizeNeeds(needs)[0];

  elements.modalContext.textContent = `Template based on ${primaryNeed} support in ${county} County.`;
  elements.modalText.value = supportNeedTemplates[type](primaryNeed, county);
  elements.modal.classList.remove("hidden");
  elements.modalText.focus();
}

function closeModal() {
  elements.modal.classList.add("hidden");
}

function copyModalText() {
  elements.modalText.select();
  document.execCommand("copy");
  elements.copyModal.textContent = "Copied";
  setTimeout(() => (elements.copyModal.textContent = "Copy text"), 1200);
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
  localStorage.clear();
  state.selections = null;
  elements.intakeForm.reset();
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
  const formData = new FormData(elements.intakeForm);
  const county = formData.get("county");
  const ageRange = formData.get("ageRange");
  const caregiverStatus = formData.get("caregiverStatus");
  const needs = formData.getAll("needs");
  const concernText = (formData.get("concern") || "").trim();
  const concernOverride = elements.concernOverride.checked;
  const matchedNeeds = matchConcernToNeeds(concernText);
  let finalNeeds = needs;

  if (matchedNeeds.length) {
    finalNeeds = concernOverride
      ? matchedNeeds
      : Array.from(new Set([...needs, ...matchedNeeds]));
  }

  if (!county || !ageRange || !caregiverStatus) {
    alert("Please complete all required fields.");
    return;
  }

  state.selections = {
    county,
    ageRange,
    caregiverStatus,
    needs: finalNeeds,
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

  elements.submitFeedback.addEventListener("click", () => {
    const text = elements.feedbackText.value.trim();
    if (!text) return;
    storeFeedback({ text, date: new Date().toLocaleDateString() });
    elements.feedbackText.value = "";
  });

  elements.clearFeedback.addEventListener("click", clearFeedback);

  renderFeedback();
}

loadResources().then(init).catch(() => {
  alert("Unable to load local resources. Please check resources.json.");
});
