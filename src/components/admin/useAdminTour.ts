"use client";

import { useCallback } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const TOUR_STEPS = [
  {
    element: '[data-tour="sidebar"]',
    popover: {
      title: "Menu Lateral",
      description:
        "Aqui encontra todas as secções do site. Clique numa para editar o seu conteúdo.",
      side: "right" as const,
      align: "start" as const,
    },
  },
  {
    element: '[data-tour="sidebar-nav"]',
    popover: {
      title: "Secções do Site",
      description:
        "Cada item corresponde a uma parte do site: Hero, Sobre Nós, Menu, Galeria, etc. A secção activa fica destacada em dourado.",
      side: "right" as const,
      align: "center" as const,
    },
  },
  {
    element: '[data-tour="dashboard-title"]',
    popover: {
      title: "Dashboard",
      description:
        "Esta é a página inicial do painel. Daqui pode aceder rapidamente a qualquer secção.",
      side: "bottom" as const,
      align: "start" as const,
    },
  },
  {
    element: '[data-tour="section-cards"]',
    popover: {
      title: "Cartões de Secção",
      description:
        "Clique num cartão para editar essa secção. Cada cartão mostra o nome e uma breve descrição do conteúdo que pode alterar.",
      side: "top" as const,
      align: "center" as const,
    },
  },
  {
    element: '[data-tour="section-card-first"]',
    popover: {
      title: "Editar uma Secção",
      description:
        "Por exemplo, clique em 'Hero' para alterar a imagem e texto principal da homepage. Dentro de cada secção encontra também opções de Hero e Fundo.",
      side: "bottom" as const,
      align: "start" as const,
    },
  },
  {
    element: '[data-tour="help-button"]',
    popover: {
      title: "Precisa de Ajuda?",
      description:
        "Clique aqui a qualquer momento para aceder ao Guia do Utilizador, contactar o Suporte via WhatsApp, ou repetir este tour.",
      side: "left" as const,
      align: "end" as const,
    },
  },
];

export function useAdminTour() {
  const startTour = useCallback(() => {
    const driverObj = driver({
      showProgress: true,
      progressText: "{{current}} de {{total}}",
      nextBtnText: "Seguinte",
      prevBtnText: "Anterior",
      doneBtnText: "Concluir",
      overlayColor: "#2C1810",
      overlayOpacity: 0.55,
      stagePadding: 8,
      stageRadius: 12,
      popoverClass: "uc-tour-popover",
      steps: TOUR_STEPS,
    });
    driverObj.drive();
  }, []);

  return { startTour };
}
