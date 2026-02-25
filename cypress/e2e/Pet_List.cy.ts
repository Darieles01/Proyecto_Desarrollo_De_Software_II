/// <reference types="cypress" />

describe("Pet List Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/Pets.json", {
      fixture: "pets.json",
    }).as("getPets");

    cy.visit("/pets");
    cy.wait("@getPets");
  });

  context("Carga inicial", () => {
    it("muestra el título y subtítulo", () => {
      cy.contains("MIS MASCOTAS").should("be.visible");
      cy.contains("Gestiona y consulta la información de todas tus mascotas")
        .should("be.visible");
    });

    it("renderiza las 3 mascotas del fixture", () => {
      cy.contains("Cerberus").should("be.visible");
      cy.contains("Gatorade").should("be.visible");
      cy.contains("Spirit").should("be.visible");
    });
  });

  context("Búsqueda por nombre", () => {
    it("filtra la lista cuando escribo en el input", () => {
      cy.get('input[placeholder="Buscar mascota por nombre..."]')
        .type("Cer");

      cy.contains("Cerberus").should("be.visible");
      cy.contains("Gatorade").should("not.exist");
      cy.contains("Spirit").should("not.exist");
    });

    it("muestra mensaje cuando no hay resultados", () => {
      cy.get('input[placeholder="Buscar mascota por nombre..."]')
        .type("NoExiste");

      cy.contains("No se encontraron mascotas con ese nombre")
        .should("be.visible");
    });
  });

  context("Navegación desde PetCard", () => {
    it("el botón 'VER MASCOTA' de Cerberus navega a /pet/1", () => {
      cy.contains("Cerberus")
        .closest("div") 
        .contains("VER MASCOTA")
        .click();

      cy.url().should("include", "/pet/1");
    });
  });
});
