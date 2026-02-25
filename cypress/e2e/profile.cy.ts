/// <reference types="cypress" />

describe("Customer Profile Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/Customers.json", {
      fixture: "customers.json",
    }).as("getCustomer");

    cy.intercept("GET", "**/Pets.json", {
      fixture: "pets.json",
    }).as("getPets");

    cy.visit("/profile");

    cy.wait(["@getCustomer", "@getPets"]);
  });

  // ─────────────────────────────────────────────
  // 1. Carga y estructura general
  // ─────────────────────────────────────────────
  context("Carga del perfil", () => {
    it("muestra el título 'Perfil del Cliente'", () => {
      cy.contains("Perfil del Cliente").should("be.visible");
    });

    it("muestra el nombre del cliente", () => {
      cy.contains("John Doe").should("be.visible");
    });

    it("muestra el email del cliente", () => {
      cy.contains("john.doe@example.com").should("be.visible");
    });

    it("muestra el teléfono del cliente", () => {
      cy.contains("+1 555 123 4567").should("be.visible");
    });

    it("muestra la dirección del cliente", () => {
      cy.contains("Calle 38 # 90-17").should("be.visible");
    });

    it("muestra la tarjeta de cliente", () => {
      cy.contains("33701").should("be.visible");
    });

    it("muestra la firma del cliente", () => {
      cy.contains("John Doe").should("be.visible");
    });

    it("muestra el avatar del cliente", () => {
      cy.get('img[alt="John Doe"]')
        .should("be.visible")
        .and("have.attr", "src")
        .and("include", "pravatar.cc");
    });
  });

  // ─────────────────────────────────────────────
  // 2. Stat Cards
  // ─────────────────────────────────────────────
  context("Stat Cards", () => {
    it("muestra el conteo correcto de mascotas (3)", () => {
      cy.contains("p", "Mascotas")
        .closest("div")
        .find("p")
        .first()
        .should("have.text", "3");
    });

    it("muestra el total de vacunas aplicadas (5)", () => {
      cy.contains("p", "Vacunas aplicadas")
        .closest("div")
        .find("p")
        .first()
        .should("have.text", "5");
    });

    it("muestra el total de consultas realizadas (20)", () => {
      cy.contains("p", "Consultas realizadas")
        .closest("div")
        .find("p")
        .first()
        .should("have.text", "20");
    });
  });

  // ─────────────────────────────────────────────
  // 3. Sección Mis Mascotas
  // ─────────────────────────────────────────────
  context("Sección Mis Mascotas", () => {
    it("muestra el encabezado 'Mis Mascotas'", () => {
      cy.contains("Mis Mascotas").should("be.visible");
    });

    it("renderiza las 3 mascotas", () => {
      cy.contains("Cerberus").should("be.visible");
      cy.contains("Gatorade").should("be.visible");
      cy.contains("Spirit").should("be.visible");
    });

    it("cada tarjeta muestra el conteo de vacunas", () => {
      cy.contains("Cerberus")
        .closest("a")
        .contains("2 vacunas")
        .should("be.visible");
    });

    it("cada tarjeta muestra la edad de la mascota", () => {
      cy.contains("Cerberus")
        .closest("a")
        .contains("3 años")
        .should("be.visible");
    });

    it("el link 'Ver todas →' navega a /pets", () => {
      cy.contains("Ver todas →").click();
      cy.url().should("include", "/pets");
    });

    it("al hacer clic en Cerberus navega a su perfil", () => {
      cy.contains("Cerberus").closest("a").click();
      cy.url().should("include", "/pet/1");
    });

    it("al hacer clic en Gatorade navega a su perfil", () => {
      cy.contains("Gatorade").closest("a").click();
      cy.url().should("include", "/pet/2");
    });
  });

  // ─────────────────────────────────────────────
  // 4. Toast "Por implementar"
  // ─────────────────────────────────────────────
  context("Toast de funcionalidades pendientes", () => {
    it("aparece el toast al hacer clic en 'Editar Perfil'", () => {
      cy.contains("Editar Perfil").first().click();
      cy.contains("Por implementar").should("be.visible");
    });

    it("el toast desaparece luego de ~2.5 segundos", () => {
      cy.contains("Editar Perfil").first().click();
      cy.contains("Por implementar").should("be.visible");
      cy.wait(3000);
      cy.contains("Por implementar").should("not.be.visible");
    });

    it("aparece el toast al hacer clic en 'Cambiar Foto'", () => {
      cy.contains("Cambiar Foto").click();
      cy.contains("Por implementar").should("be.visible");
    });
  });

  // ─────────────────────────────────────────────
  // 5. Estado de carga
  // ─────────────────────────────────────────────
  context("Estado de carga", () => {
    it("muestra 'Cargando perfil...' antes de recibir datos", () => {
      cy.intercept("GET", "**/Customers.json", (req) => {
        req.reply({ delay: 1000, fixture: "customers.json" });
      }).as("slowCustomer");

      cy.visit("/profile");
      cy.contains("Cargando perfil...").should("be.visible");
    });
  });
});