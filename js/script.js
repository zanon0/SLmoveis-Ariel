/* =========================================================
   SL Móveis — Scripts principais
   ========================================================= */

(function () {
  "use strict";

  /* -------------------------------------------------------
     1. WHATSAPP
     Troque o número abaixo pelo seu.
     Formato: 55 (Brasil) + DDD + número (só dígitos).
  ------------------------------------------------------- */
  const NUMERO_WHATSAPP = "5511999999999";

  function montarLinkWhatsApp(mensagem) {
    const texto = encodeURIComponent(
      mensagem || "Olá! Vim pelo site da SL Móveis."
    );
    return "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + texto;
  }

  document.querySelectorAll("[data-wa]").forEach(function (el) {
    const mensagem = el.getAttribute("data-wa");
    el.setAttribute("href", montarLinkWhatsApp(mensagem));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  /* -------------------------------------------------------
     2. LOADING PAGE — esconder RÁPIDO
     Usa DOMContentLoaded (não espera imagens/fontes)
     e tem um fallback de 1,2s no máximo.
  ------------------------------------------------------- */
  const loader = document.getElementById("loader");
  let loaderEscondido = false;

  function esconderLoader() {
    if (loaderEscondido) return;
    loaderEscondido = true;

    document.body.classList.remove("is-loading");
    document.body.classList.add("is-loaded");

    if (loader && loader.parentNode) {
      window.setTimeout(function () {
        if (loader && loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 300);
    }
  }

  // Esconde assim que o HTML estiver parseado (bem mais rápido)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", esconderLoader);
  } else {
    esconderLoader();
  }

  // Segurança: no máximo 1,2s
  window.setTimeout(esconderLoader, 1200);

  /* -------------------------------------------------------
     3. ANO ATUAL NO RODAPÉ
  ------------------------------------------------------- */
  const anoEl = document.getElementById("ano");
  if (anoEl) {
    anoEl.textContent = new Date().getFullYear();
  }

  /* -------------------------------------------------------
     4. REVELAÇÃO AO ROLAR
  ------------------------------------------------------- */
  const elementosReveal = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && elementosReveal.length > 0) {
    const observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("is-visible");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elementosReveal.forEach(function (el) {
      observador.observe(el);
    });
  } else {
    elementosReveal.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();