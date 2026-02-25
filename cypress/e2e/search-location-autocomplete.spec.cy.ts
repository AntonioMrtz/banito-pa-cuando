describe("template spec", () => {
  it("passes", () => {
    const locationId = "340611"; // Murcia ID
    cy.visit("/");
    cy.get("input.flex").click();
    cy.get("input.flex").type("murcia");
    cy.get(`a[href="/locations/${locationId}"] span`).click();

    cy.url().should("include", `/locations/${locationId}`);
    cy.contains(`Location ID: ${locationId}`).should("be.visible");
  });
});
