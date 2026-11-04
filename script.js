
document.addEventListener("DOMContentLoaded", () => {
  const languageButton = document.getElementById("languageButton");
  const yearElement = document.getElementById("year");

  let currentLanguage = "en";

  // Atualiza o ano automaticamente
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Alterna entre inglês e português
  function changeLanguage(language) {
    currentLanguage = language;

    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";

    document.querySelectorAll("[data-en][data-pt]").forEach((element) => {
      element.textContent = element.getAttribute(`data-${language}`);
    });

    if (languageButton) {
      languageButton.textContent = language === "en" ? "PT" : "EN";
      languageButton.setAttribute(
        "aria-label",
        language === "en" ? "Mudar para português" : "Switch to English"
      );
    }

    try {
      localStorage.setItem("alexdev-language", language);
    } catch (error) {
      console.warn("Não foi possível salvar o idioma neste navegador.");
    }
  }

  // Recupera o idioma salvo
  let savedLanguage = "en";

  try {
    const storedLanguage = localStorage.getItem("alexdev-language");
    if (storedLanguage === "pt" || storedLanguage === "en") {
      savedLanguage = storedLanguage;
    }
  } catch (error) {
    console.warn("Não foi possível recuperar o idioma salvo.");
  }

  changeLanguage(savedLanguage);

  // Evento do botão de idioma
  if (languageButton) {
    languageButton.addEventListener("click", () => {
      changeLanguage(currentLanguage === "en" ? "pt" : "en");
    });
  }
});
