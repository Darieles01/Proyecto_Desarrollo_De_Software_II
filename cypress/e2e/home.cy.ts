/// <reference types="cypress" />

describe("Home Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/Customers.json", {
      fixture: "customers.json",
    }).as("getCustomer");

    cy.intercept("GET", "**/Pets.json", {
      fixture: "pets.json",
    }).as("getPets");

    cy.visit("/");

    cy.wait(["@getCustomer", "@getPets"]);
  });

  // ─────────────────────────────────────────────
  // 1. Carga general
  // ─────────────────────────────────────────────
  context("Carga del Home", () => {
    it("muestra el título 'Menú Principal'", () => {
      cy.contains("Menú Principal").should("be.visible");
    });

    it("muestra el nombre del cliente", () => {
      cy.contains("John Doe").should("be.visible");
    });
  });

  // ─────────────────────────────────────────────
  // 2. Estadísticas
  // ─────────────────────────────────────────────
  context("Resumen de estadísticas", () => {
    it("muestra el total de mascotas (3)", () => {
      cy.contains("Total de mascotas registradas")
        .parent() // sube al div contenedor
        .find("p")
        .eq(1) // el segundo <p> es el número
        .should("have.text", "3");
    });

    it("muestra el total de consultas registradas (20)", () => {
      cy.contains("Total de consultas registradas")
        .parent()
        .find("p")
        .eq(1)
        .should("have.text", "20");
    });
  });

  // ─────────────────────────────────────────────
  // 3. Navegación
  // ─────────────────────────────────────────────
  context("Botones de navegación", () => {
    it("el botón 'Mis mascotas' navega a /pets", () => {
      cy.contains("Mis mascotas").click();
      cy.url().should("include", "/pets");
    });

    it("el botón 'Tu cuenta' navega a /profile", () => {
      cy.visit("/");
      cy.contains("Tu cuenta").click();
      cy.url().should("include", "/profile");
    });
  });
});
