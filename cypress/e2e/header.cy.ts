/// <reference types="cypress" />

describe("Header Component", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  // ─────────────────────────────────────────────
  // 1. Renderizado
  // ─────────────────────────────────────────────
  context("Renderizado", () => {

    it("muestra el logo 'Veterinaria'", () => {
      cy.contains("Veterinaria").should("be.visible");
    });

    it("muestra el link 'Mis Mascotas'", () => {
      cy.contains("Mis Mascotas").should("be.visible");
    });

    it("muestra el link 'Tu cuenta'", () => {
      cy.contains("Tu cuenta").should("be.visible");
    });

  });

  // ─────────────────────────────────────────────
  // 2. Navegación
  // ─────────────────────────────────────────────
  context("Navegación", () => {

    it("el logo navega a /", () => {
      cy.contains("Veterinaria").click();
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });

    it("el link 'Mis Mascotas' navega a /pets", () => {
      cy.contains("Mis Mascotas").click();
      cy.url().should("include", "/pets");
    });

    it("el link 'Tu cuenta' navega a /profile", () => {
      cy.contains("Tu cuenta").click();
      cy.url().should("include", "/profile");
    });

  });

});