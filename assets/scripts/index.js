(() => {
  const translations = new Map([
    ["Accueil", "Home"],
    ["Projets", "Projects"],
    ["Compétences", "Skills"],
    ["À propos", "About"],
    ["Contact", "Contact"],
    ["Navigation principale", "Main navigation"],
    ["Navigation rapide", "Quick navigation"],
    ["Lucachinou, accueil", "Lucachinou, home"],
    ["Choisir la langue", "Choose a language"],
    ["Salut, moi c’est", "Hi, I’m"],
    ["Des données a l'idée. De l'idée au code.", "From data to ideas. From ideas to code."],
    ["Voir mes projets", "View my projects"],
    ["Illustration graphique aux couleurs jaune et orange", "Graphic illustration in yellow and orange"],
    ["Faire défiler jusqu’aux projets", "Scroll to projects"],
    ["Faire défiler", "Scroll down"],
    ["Mes projets", "My projects"],
    ["Bêta", "Beta"],
    [
      "Un tableau de bord web pour gérer des serveurs Minecraft : démarrage, arrêt, redémarrage et consultation des logs en direct.",
      "A web dashboard for managing Minecraft servers: start, stop, restart and view live logs."
    ],
    ["Explorer sur GitHub", "Explore on GitHub"],
    [
      "Moi c’est Luca, un étudiant français qui apprend l’IA pour devenir ingénieur IA. Je crée des projets open source en machine learning avec PyTorch, TensorFlow et SpaCy, ainsi que des outils serveur et des bots — surtout en Python, Rust et Java. J’aime comprendre comment les choses fonctionnent et transformer mes expérimentations en projets concrets.",
      "I’m Luca, a French student learning AI to become an AI Engineer. I build open-source machine learning projects with PyTorch, TensorFlow and SpaCy, along with server tools and bots — mostly in Python, Rust and Java. I enjoy understanding how things work and turning experiments into real projects."
    ],
    ["Mes liens", "My links"],
    ["Mon GitHub", "My GitHub"],
    ["Mes compétences", "My skills"],
    ["Machine learning, Automatisation, AI", "Machine learning, automation, AI"],
    ["Plugins et mods pour Minecraft.", "Plugins and mods for Minecraft."],
    ["Bots Discord et interfaces web légères.", "Discord bots and lightweight web interfaces."],
    ["Outils système et performance.", "System tools and performance."],
  ]);

  translations.set("Photo de profil de Lucachinou", "Lucachinou’s profile picture");
  translations.set("Articles (bientôt)", "Articles (coming soon)");
  translations.set("Bientôt", "Soon");
  translations.set("Rejoindre mon serveur", "Join my server");

  const englishToFrench = new Map(
    [...translations].map(([french, english]) => [english, french])
  );

  // Keep the original English text nodes, including surrounding whitespace.
  const textBindings = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest("script, style, select")) continue;
    const key = node.textContent.trim();
    if (englishToFrench.has(key)) {
      textBindings.push({ node, original: node.textContent, key });
    }
  }

  const attributeBindings = [];
  document.querySelectorAll("[aria-label], [title], [alt]").forEach(element => {
    ["aria-label", "title", "alt"].forEach(attribute => {
      const original = element.getAttribute(attribute);
      if (englishToFrench.has(original)) {
        attributeBindings.push({ element, attribute, original });
      }
    });
  });

  const languageCurrent = document.getElementById("languageCurrent");
  const languageOptions = [...document.querySelectorAll("[data-lang]")];
  const description = document.querySelector('meta[name="description"]');
  const englishDescription = description?.content;
  const englishTitle = document.title;

  function setLanguage(language) {
    const lang = language === "fr" ? "fr" : "en";
    document.documentElement.lang = lang;
    languageCurrent.textContent = lang.toUpperCase();
    languageOptions.forEach(option =>
      option.setAttribute("aria-checked", String(option.dataset.lang === lang))
    );

    textBindings.forEach(({ node, original, key }) => {
      node.textContent = lang === "en"
        ? original
        : original.replace(key, () => englishToFrench.get(key));
    });

    attributeBindings.forEach(({ element, attribute, original }) => {
      element.setAttribute(
        attribute,
        lang === "en" ? original : englishToFrench.get(original)
      );
    });

    document.title = lang === "en"
      ? englishTitle
      : "Lucachinou — Étudiant en IA & Machine Learning";

    if (description) {
      description.content = lang === "en"
        ? englishDescription
        : "Lucachinou — J’étudie l’IA pour devenir ingénieur IA. Machine learning, projets open source et outils.";
    }

    try {
      localStorage.setItem("portfolio-language", lang);
    } catch {
      // Language switching still works when storage is unavailable.
    }
  }

  let savedLanguage = "en";
  try {
    savedLanguage = localStorage.getItem("portfolio-language") || "en";
  } catch {
    // Fall back to English.
  }

  setLanguage(savedLanguage);
  languageOptions.forEach(option =>
    option.addEventListener("click", () => setLanguage(option.dataset.lang))
  );

  // Dropdowns (Contact + langue)
  const dropdowns = [...document.querySelectorAll("[data-dropdown]")];

  function closeAll(except) {
    dropdowns.forEach(dropdown => {
      if (dropdown === except) return;
      dropdown.classList.remove("open");
      dropdown.querySelector(".dropdown-trigger").setAttribute("aria-expanded", "false");
    });
  }

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector(".dropdown-trigger");
    const items = [...dropdown.querySelectorAll(".dropdown-item")];

    trigger.addEventListener("click", () => {
      const open = !dropdown.classList.contains("open");
      closeAll(dropdown);
      dropdown.classList.toggle("open", open);
      trigger.setAttribute("aria-expanded", String(open));
      if (open) items[0]?.focus();
    });

    items.forEach(item => item.addEventListener("click", () => {
      closeAll();
      trigger.focus();
    }));

    dropdown.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeAll();
        trigger.focus();
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (!dropdown.classList.contains("open")) return trigger.click();
        const index = items.indexOf(document.activeElement);
        const step = event.key === "ArrowDown" ? 1 : items.length - 1;
        items[(index + step + items.length) % items.length].focus();
      }
    });
  });

  document.addEventListener("click", event => {
    if (!event.target.closest("[data-dropdown]")) closeAll();
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  const sideNav = document.getElementById("sideNav");
  const links = [...document.querySelectorAll('.nav a[href^="#"], .side-nav a[href^="#"]')];
  const sections = [...new Set(
    links.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean)
  )].sort((a, b) =>
    a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
  );

  if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("js-enabled");

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px 80px 0px" });

    document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

    const headerObserver = new IntersectionObserver(([entry]) => {
      sideNav.classList.toggle("show", !entry.isIntersecting);
    });
    headerObserver.observe(document.querySelector(".site-header"));

    function setActive(id) {
      links.forEach(link => {
        const active = link.getAttribute("href") === "#" + id;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }

    function updateActiveSection() {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = sections[0];
      if (atBottom) {
        current = sections[sections.length - 1];
      } else {
        const marker = window.innerHeight * 0.4;
        sections.forEach(section => {
          if (section.getBoundingClientRect().top <= marker) current = section;
        });
      }
      setActive(current.id);
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateActiveSection();
  } else {
    document.querySelectorAll(".reveal").forEach(element => element.classList.add("visible"));
    sideNav.classList.add("show");
  }
})();

(() => {
  // Passe à true quand le backend est prêt
  const AI_ENABLED = false;

  const launcher = document.getElementById("aiLauncher");
  const dialog = document.getElementById("aiDialog");
  const input = document.getElementById("aiInput");
  const feed = document.getElementById("aiFeed");
  const suggestions = document.getElementById("aiSuggestions");
  const soonBadge = document.getElementById("aiSoonBadge");
  const toast = document.getElementById("aiToast");

  const copy = {
    en: {
      open: "Ask a question",
      close: "Close",
      label: "Your question",
      placeholder: "Ask a question…",
      send: "Send",
      projects: "What are you working on?",
      stack: "What's your stack?",
      soon: "Soon",
      soonLabel: "Assistant (coming soon)",
      soonMessage: "The assistant is coming soon."
    },
    fr: {
      open: "Poser une question",
      close: "Fermer",
      label: "Ta question",
      placeholder: "Pose ta question…",
      send: "Envoyer",
      projects: "Tu bosses sur quoi ?",
      stack: "Tu codes avec quoi ?",
      soon: "Bientôt",
      soonLabel: "Assistant (bientôt)",
      soonMessage: "L’assistant arrive bientôt."
    }
  };

  const language = () => (document.documentElement.lang === "fr" ? "fr" : "en");

  if (!AI_ENABLED) {
    launcher.classList.add("is-soon");
    launcher.setAttribute("aria-disabled", "true");
    launcher.removeAttribute("aria-haspopup");
    soonBadge.hidden = false;
  }

  function refreshLanguage() {
    const text = copy[language()];
    const launcherLabel = AI_ENABLED ? text.open : text.soonLabel;
    launcher.setAttribute("aria-label", launcherLabel);
    launcher.title = launcherLabel;
    soonBadge.textContent = text.soon;
    if (toast.classList.contains("show")) toast.textContent = text.soonMessage;
    document.getElementById("aiClose").setAttribute("aria-label", text.close);
    document.getElementById("aiInputLabel").textContent = text.label;
    document.getElementById("aiSend").setAttribute("aria-label", text.send);
    input.placeholder = text.placeholder;
    suggestions.querySelectorAll("[data-ai-question]").forEach(button => {
      button.textContent = text[button.dataset.aiQuestion];
    });
  }

  refreshLanguage();
  new MutationObserver(refreshLanguage).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"]
  });

  let toastTimer;
  function showSoon() {
    toast.textContent = copy[language()].soonMessage;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  launcher.addEventListener("click", () => {
    if (!AI_ENABLED) {
      showSoon();
      return;
    }
    if (!dialog.open) dialog.showModal();
  });
  document.getElementById("aiClose").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => launcher.focus());

  // Close when clicking outside the panel
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) {
      dialog.close();
    }
  });

  function appendMessage(text, fromUser) {
    const message = document.createElement("p");
    message.className = "ai-message" + (fromUser ? " ai-message--user" : "");
    message.textContent = text;
    feed.append(message);
    feed.scrollTop = feed.scrollHeight;
    return message;
  }

  // TODO: connect to the API, then display the reply with appendMessage(reply, false)
  async function sendToAssistant(question) {}

  function submitQuestion(question) {
    const text = question.trim();
    if (!text) return;
    appendMessage(text, true);
    suggestions.hidden = true;
    suggestions.style.display = "none";
    input.value = "";
    input.focus();
    sendToAssistant(text);
  }

  document.getElementById("aiForm").addEventListener("submit", event => {
    event.preventDefault();
    submitQuestion(input.value);
  });

  suggestions.addEventListener("click", event => {
    const button = event.target.closest("[data-ai-question]");
    if (button) submitQuestion(button.textContent);
  });
})();