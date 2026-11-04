document.addEventListener("DOMContentLoaded", () => {
  const languageButton = document.getElementById("languageButton");
  const yearElement = document.getElementById("year");

  const supportedLanguages = ["en", "pt"];
  const storageKey = "alexdev-language";

  let currentLanguage = "en";

  // Atualiza o ano automaticamente.
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Atualiza os textos da página.
  function changeLanguage(language) {
    if (!supportedLanguages.includes(language)) {
      language = "en";
    }

    currentLanguage = language;

    document.documentElement.lang =
      language === "pt" ? "pt-BR" : "en";

    document.querySelectorAll("[data-en][data-pt]").forEach((element) => {
      const translatedText = element.getAttribute(`data-${language}`);

      if (translatedText !== null) {
        element.textContent = translatedText;
      }
    });

    // Atualiza o botão de idioma.
    if (languageButton) {
      languageButton.textContent = language === "en" ? "PT" : "EN";

      languageButton.setAttribute(
        "aria-label",
        language === "en"
          ? "Mudar para português"
          : "Switch to English"
      );

      languageButton.setAttribute("aria-pressed", String(language === "pt"));
    }

    // Atualiza o título da página.
    document.title =
      language === "pt"
        ? "Alex Dev | Desenvolvedor de Software"
        : "Alex Dev | Software Developer";

    // Salva a preferência.
    try {
      localStorage.setItem(storageKey, language);
    } catch (error) {
      console.warn("Não foi possível salvar o idioma.");
    }
  }

  // Recupera o idioma salvo.
  function getSavedLanguage() {
    try {
      const savedLanguage = localStorage.getItem(storageKey);

      if (supportedLanguages.includes(savedLanguage)) {
        return savedLanguage;
      }
    } catch (error) {
      console.warn("Não foi possível recuperar o idioma salvo.");
    }

    return "en";
  }

  // Inicializa o idioma.
  changeLanguage(getSavedLanguage());

  // Evento do botão.
  if (languageButton) {
    languageButton.addEventListener("click", () => {
      const nextLanguage =
        currentLanguage === "en" ? "pt" : "en";

      changeLanguage(nextLanguage);
    });
  }
});
