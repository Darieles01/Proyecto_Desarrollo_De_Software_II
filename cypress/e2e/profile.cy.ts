/// <reference types="cypress" />

/**
 * E2E Tests – Customer Profile (/profile)
 *
 * Cubre:
 *  - Renderizado del perfil del cliente
 *  - Stats cards (mascotas, vacunas, consultas)
 *  - Sección "Mis Mascotas" y navegación a cada mascota
 *  - Toast "Por implementar" en botones de edición
 */

describe("Customer Profile Page", () => {
  beforeEach(() => {
    // Interceptamos los JSON para que los tests no dependan de un servidor externo
    cy.intercept("GET", "**/Customers.json", {
      fixture: "customers.json",
    }).as("getCustomer");

    cy.intercept("GET", "**/Pets.json", {
      fixture: "pets.json",
    }).as("getPets");

    cy.visit("/profile");

    // Esperamos que carguen los datos
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
      // Estructura: <div><p>{value}</p><p>{label}</p></div>
      // Encontramos el label, subimos al div padre y buscamos el primer <p> (el número)
      cy.contains("p", "Mascotas")
        .closest("div")
        .find("p")
        .first()
        .should("have.text", "3");
    });

    it("muestra el total de vacunas aplicadas (5)", () => {
      // Cerberus:2, Gatorade:1, Spirit:2 = 5
      cy.contains("p", "Vacunas aplicadas")
        .closest("div")
        .find("p")
        .first()
        .should("have.text", "5");
    });

    it("muestra el total de consultas realizadas (20)", () => {
      // Cerberus:7, Gatorade:6, Spirit:7 = 20
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
      // Cada mascota es un <a> con el nombre
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
      // El toast tiene timeout de 2500ms, esperamos un poco más
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
      // Interceptamos con delay para capturar el estado de loading
      cy.intercept("GET", "**/Customers.json", (req) => {
        req.reply({ delay: 1000, fixture: "customers.json" });
      }).as("slowCustomer");

      cy.visit("/profile");
      cy.contains("Cargando perfil...").should("be.visible");
    });
  });
});