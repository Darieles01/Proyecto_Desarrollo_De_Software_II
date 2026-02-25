/// <reference types="cypress" />

describe("Prueba de Integración: Flujo Detallado de Consulta de Mascota", () => {
  
  beforeEach(() => {
    cy.intercept("GET", "**/Customers.json", { fixture: "customers.json" }).as("getCustomer");
    cy.intercept("GET", "**/Pets.json", { fixture: "pets.json" }).as("getPets");

    cy.visit("/");
    cy.wait(["@getCustomer", "@getPets"]);
  });

// ─────────────────────────────────────────────
  // 1. Navegación Inicial y Lista
  // ─────────────────────────────────────────────
  context("Paso 1: Del Home a la Lista de Mascotas", () => {
    it("navegar a la lista al hacer click en 'Mis mascotas'", () => {
      cy.contains("Mis mascotas").should("be.visible").click();
      cy.url().should("include", "/pets");
      cy.contains("MIS MASCOTAS").should("be.visible");
    });

    it("encontrar a 'Cerberus' y navegar a su perfil", () => {
      cy.visit("/pets");
      
      cy.contains("h3", "Cerberus")
        .closest("div.relative")
        .find("a")
        .contains("VER MASCOTA")
        .click();

      cy.url().should("include", "/pet/1");
      cy.contains("Perfil de Mascota").should("be.visible");
    });
  });

  // ─────────────────────────────────────────────
  //2. Perfil y Consultas
  // ─────────────────────────────────────────────
  context("Paso 2: Del Perfil al Historial de Consultas", () => {
    beforeEach(() => {
      cy.visit("/pet/1");
    });

    it("navegar al historial al hacer click en 'Ver historial detallado'", () => {
      cy.contains("Ver historial detallado").should("be.visible").click();

      cy.url().should("include", "/pets_consultations/1");
      cy.get("h1").should("contain", "Historial de Consultas");
    });

    it("mostrar al menos una consulta en el historial", () => {
      cy.visit("/pets_consultations/1");
      cy.get(".grid.gap-6 > div").should("have.length.at.least", 1);
      cy.contains("Fecha de visita").should("be.visible");
    });
  });

  // ─────────────────────────────────────────────
  //3. Regreso y Cierre de Flujo
  // ─────────────────────────────────────────────
  context("Paso 3: Botones de Retorno", () => {
    it("regresar al perfil de la mascota desde el historial", () => {
      cy.visit("/pets_consultations/1");
      cy.contains("Volver al perfil de Cerberus").click();
      
      cy.url().should("include", "/pet/1");
      cy.contains("Cerberus").should("be.visible");
    });

    it("regresar al inicio (Home) desde el perfil", () => {
      cy.visit("/pet/1");
      cy.contains("Volver al inicio").click();

      cy.url().should("eq", Cypress.config().baseUrl + "/");
      cy.contains("Menú Principal").should("be.visible");
    });
  });

  // ─────────────────────────────────────────────
  // 4. Manejo de Errores
  // ─────────────────────────────────────────────
  context("Paso 4: Manejo de Errores", () => {
    it("mostrar mensaje de error con ID inexistente y permitir volver", () => {
      cy.visit("/pets_consultations/999");
      
      cy.contains("No se encontró la mascota.").should("be.visible");
      cy.contains("Volver al inicio").should("be.visible").click();
      
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });
  });
});