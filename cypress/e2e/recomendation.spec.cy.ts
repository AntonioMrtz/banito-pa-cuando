describe("Recommendation", () => {
  it("Should display the name of the place after searching", () => {
    const searchTerm = "Los Alcázares";
    cy.visit("/");

    cy.get("input.flex").click();
    cy.get("input.flex").type(searchTerm);

    cy.contains(searchTerm).should("be.visible");

    cy.get("a").contains(searchTerm).click();

    cy.contains(`${searchTerm}`).should("be.visible");
  });
});
