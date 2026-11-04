document.addEventListener("DOMContentLoaded", () => {
  const languageButton = document.getElementById("languageButton");
  const yearElement = document.getElementById("year");

  const storageKey = "alexdev-language";
  let currentLanguage = "pt";

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  function changeLanguage(language) {
    currentLanguage = language;

    document.documentElement.lang =
      language === "pt" ? "pt-BR" : "en";

    document.querySelectorAll("[data-en][data-pt]").forEach((element) => {
      element.textContent = element.getAttribute(`data-${language}`);
    });

    if (languageButton) {
      languageButton.textContent = language === "pt" ? "EN" : "PT";

      languageButton.setAttribute(
        "aria-label",
        language === "pt" ? "Switch to English" : "Mudar para português"
      );
    }

    try {
      localStorage.setItem(storageKey, language);
    } catch (error) {
      console.warn("Não foi possível salvar o idioma.");
    }
  }

  let savedLanguage = "pt";

  try {
    const storedLanguage = localStorage.getItem(storageKey);

    if (storedLanguage === "pt" || storedLanguage === "en") {
      savedLanguage = storedLanguage;
    }
  } catch (error) {
    console.warn("Não foi possível recuperar o idioma.");
  }

  changeLanguage(savedLanguage);

  if (languageButton) {
    languageButton.addEventListener("click", () => {
      changeLanguage(currentLanguage === "pt" ? "en" : "pt");
    });
  }
});
